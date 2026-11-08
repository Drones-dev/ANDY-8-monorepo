import unittest

from andy8_protocol.packet import Packet, PacketType, ProtocolError, decode_packet, encode_packet


class PacketTests(unittest.TestCase):
    def packet(self):
        return Packet("drone-3", "ground", PacketType.TELEMETRY, 4, "m-4", {"battery": 91})

    def test_round_trip_and_crc(self):
        decoded = decode_packet(encode_packet(self.packet()))
        self.assertEqual(decoded.payload["battery"], 91)
        self.assertEqual(decoded.packet_type, PacketType.TELEMETRY)

    def test_tampering_is_rejected(self):
        encoded = encode_packet(self.packet()).replace(b"91", b"90")
        with self.assertRaises(ProtocolError):
            decode_packet(encoded)

    def test_unsupported_version_is_rejected(self):
        packet = self.packet()
        packet.version = 2
        with self.assertRaises(ProtocolError):
            encode_packet(packet)


if __name__ == "__main__":
    unittest.main()
