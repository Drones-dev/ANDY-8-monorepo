import unittest

from andy8_analysis.summary import summarize


class SummaryTests(unittest.TestCase):
    def test_summary(self):
        result = summarize([{"delivered": 1, "latency_ms": 20, "rssi_dbm": -80}, {"delivered": 0, "latency_ms": 40, "rssi_dbm": -90}])
        self.assertEqual(result["delivery_ratio"], 0.5)
        self.assertEqual(result["mean_latency_ms"], 30)


if __name__ == "__main__":
    unittest.main()
