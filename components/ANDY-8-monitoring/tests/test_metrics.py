import unittest

from andy8_monitoring.metrics import Metrics


class MetricsTests(unittest.TestCase):
    def test_alert_below_delivery_target(self):
        metrics = Metrics()
        metrics.observe("packet_delivery_ratio", 0.90)
        self.assertEqual(len(metrics.evaluate()), 1)

    def test_counter(self):
        metrics = Metrics()
        metrics.count("packets")
        metrics.count("packets", 2)
        self.assertEqual(metrics.counters["packets"], 3)


if __name__ == "__main__":
    unittest.main()
