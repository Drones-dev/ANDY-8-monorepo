import unittest

from andy8_sitl.adapter import parse_telemetry_line


class SitlTests(unittest.TestCase):
    def test_parse_telemetry(self):
        value = parse_telemetry_line('{"vehicle_id":"drone-1","battery":95}')
        self.assertEqual(value["vehicle_id"], "drone-1")

    def test_invalid_line_is_rejected(self):
        with self.assertRaises(ValueError):
            parse_telemetry_line("[]")


if __name__ == "__main__":
    unittest.main()
