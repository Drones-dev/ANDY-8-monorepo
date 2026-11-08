import unittest

from andy8_bridge.bridge import MavlinkBridge


class BridgeTests(unittest.TestCase):
    def test_selects_flight_telemetry_and_increments_sequence(self):
        bridge = MavlinkBridge("drone-1")
        packet = bridge.telemetry_packet({"lat": 33.9, "lon": -84.5, "battery": 88, "secret": "drop"})
        self.assertEqual(packet.sequence, 1)
        self.assertNotIn("secret", packet.payload)
        self.assertEqual(packet.payload["battery"], 88)

    def test_stream_is_ordered(self):
        packets = list(MavlinkBridge("drone-2").telemetry_stream([{"altitude": 2}, {"altitude": 3}]))
        self.assertEqual([p.sequence for p in packets], [1, 2])


if __name__ == "__main__":
    unittest.main()
