import unittest

from release import validate_release


class ReleaseTests(unittest.TestCase):
    def test_release_metadata(self):
        result = validate_release("v0.1.0", "abcdef1", ["firmware.bin"])
        self.assertEqual(result["version"], "v0.1.0")

    def test_invalid_release_is_rejected(self):
        with self.assertRaises(ValueError):
            validate_release("latest", "abcdef1", ["firmware.bin"])


if __name__ == "__main__":
    unittest.main()
