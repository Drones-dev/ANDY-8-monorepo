import unittest

from andy8_ground_station.view_model import GroundStationState


class GroundStationTests(unittest.TestCase):
    def test_telemetry_updates_node(self):
        state = GroundStationState()
        state.apply_telemetry("drone-1", {"lat": 33.9, "battery": 87})
        self.assertTrue(state.nodes["drone-1"]["connected"])
        self.assertEqual(state.nodes["drone-1"]["battery"], 87)

    def test_failure_is_visible(self):
        state = GroundStationState()
        state.mark_unreachable("drone-2")
        self.assertFalse(state.nodes["drone-2"]["connected"])
        self.assertIn("drone-2 unreachable", state.alerts)


if __name__ == "__main__":
    unittest.main()
