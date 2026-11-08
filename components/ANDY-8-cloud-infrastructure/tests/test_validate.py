import unittest

from validate import validate


class InfrastructureTests(unittest.TestCase):
    def test_configuration_has_environment_contract(self):
        validate()


if __name__ == "__main__":
    unittest.main()
