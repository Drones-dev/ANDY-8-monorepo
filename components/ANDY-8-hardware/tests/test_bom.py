import unittest

from validate_bom import validate_bom


class BomTests(unittest.TestCase):
    def test_required_parts(self):
        self.assertEqual(validate_bom({"flight_controller": "x"}), ["ground_station_node", "mesh_node", "power", "radio"])


if __name__ == "__main__":
    unittest.main()
