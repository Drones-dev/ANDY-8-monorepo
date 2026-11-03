"""Small, deterministic telemetry store used by the dashboard and tests."""

from __future__ import annotations

from collections import defaultdict, deque
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any


@dataclass(frozen=True, slots=True)
class TelemetryRecord:
    node_id: str
    sequence: int
    received_at: str
    values: dict[str, Any]


class TelemetryStore:
    def __init__(self, max_records_per_node: int = 1000):
        self._records: dict[str, deque[TelemetryRecord]] = defaultdict(
            lambda: deque(maxlen=max_records_per_node)
        )

    def ingest(self, node_id: str, sequence: int, values: dict[str, Any]) -> TelemetryRecord:
        if not node_id or sequence < 0:
            raise ValueError("node_id and a non-negative sequence are required")
        record = TelemetryRecord(node_id, sequence, datetime.now(timezone.utc).isoformat(), dict(values))
        self._records[node_id].append(record)
        return record

    def latest(self, node_id: str) -> TelemetryRecord | None:
        records = self._records.get(node_id)
        return records[-1] if records else None

    def history(self, node_id: str) -> list[TelemetryRecord]:
        return list(self._records.get(node_id, ()))

    def snapshot(self) -> dict[str, TelemetryRecord | None]:
        return {node_id: records[-1] for node_id, records in self._records.items()}
