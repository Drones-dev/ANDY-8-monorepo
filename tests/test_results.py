import unittest

from andy8_test_lab.results import TestResult, Trial


class ResultTests(unittest.TestCase):
    def test_trial_passes_only_when_all_checks_pass(self):
        trial = Trial("drone-2-failure")
        trial.record(TestResult("reroute", True))
        trial.record(TestResult("delivery", True))
        self.assertTrue(trial.passed)

    def test_empty_trial_is_not_passed(self):
        self.assertFalse(Trial("empty").passed)


if __name__ == "__main__":
    unittest.main()
