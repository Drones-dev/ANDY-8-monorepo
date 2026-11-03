import unittest

from andy8_security.identity import sign, verify


class IdentityTests(unittest.TestCase):
    def test_signature_verifies(self):
        signature = sign(b"packet", b"test-key")
        self.assertTrue(verify(b"packet", signature, b"test-key"))
        self.assertFalse(verify(b"tampered", signature, b"test-key"))


if __name__ == "__main__":
    unittest.main()
