import unittest

from andy8_mobile.state import MobileState


class MobileStateTests(unittest.TestCase):
    def test_select_and_alert(self):
        state = MobileState()
        state.select_node("drone-3")
        state.receive_alert("relay unavailable")
        self.assertEqual(state.selected_node, "drone-3")
        self.assertEqual(state.notifications, ["relay unavailable"])


if __name__ == "__main__":
    unittest.main()
