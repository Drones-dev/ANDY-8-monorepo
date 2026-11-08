import unittest

from andy8_device_tools.provision import provision


class ProvisionTests(unittest.TestCase):
    def test_default_radio_profile(self):
        self.assertEqual(provision("drone-1").frequency_mhz, 915)

    def test_empty_identity_is_rejected(self):
        with self.assertRaises(ValueError):
            provision("")


if __name__ == "__main__":
    unittest.main()
