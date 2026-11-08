from __future__ import annotations

from statistics import mean
from typing import Iterable


def summarize(records: Iterable[dict[str, float]]) -> dict[str, float]:
    rows = list(records)
    if not rows:
        return {"samples": 0, "mean_latency_ms": 0.0, "mean_rssi_dbm": 0.0, "delivery_ratio": 0.0}
    delivered = sum(1 for row in rows if row.get("delivered", 0))
    return {
        "samples": float(len(rows)),
        "mean_latency_ms": mean(row.get("latency_ms", 0.0) for row in rows),
        "mean_rssi_dbm": mean(row.get("rssi_dbm", 0.0) for row in rows),
        "delivery_ratio": delivered / len(rows),
    }
