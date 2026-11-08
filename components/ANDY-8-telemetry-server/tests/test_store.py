import unittest

from andy8_telemetry.store import TelemetryStore


class StoreTests(unittest.TestCase):
    def test_ingest_latest_and_history(self):
        store = TelemetryStore()
        store.ingest("drone-1", 1, {"battery": 90})
        store.ingest("drone-1", 2, {"battery": 89})
        self.assertEqual(store.latest("drone-1").sequence, 2)
        self.assertEqual(len(store.history("drone-1")), 2)

    def test_records_are_copied(self):
        values = {"battery": 90}
        store = TelemetryStore()
        store.ingest("drone-1", 1, values)
        values["battery"] = 1
        self.assertEqual(store.latest("drone-1").values["battery"], 90)


if __name__ == "__main__":
    unittest.main()
