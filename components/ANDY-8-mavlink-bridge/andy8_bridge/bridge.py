"""Dependency-light MAVLink adapter boundary.

The production adapter can replace ``decode_mavlink`` with pymavlink or a
serial decoder without changing the mesh-facing contract.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any, Iterable


@dataclass(frozen=True, slots=True)
class MeshPacket:
    source: str
    sequence: int
    message_type: str
    payload: dict[str, Any]

    def to_bytes(self) -> bytes:
        return (json.dumps({
            "source": self.source,
            "sequence": self.sequence,
            "type": self.message_type,
            "payload": self.payload,
        }, sort_keys=True, separators=(",", ":")) + "\n").encode()


class MavlinkBridge:
    """Converts selected PX4 telemetry into transport-neutral mesh packets."""

    ALLOWED_FIELDS = {"lat", "lon", "altitude", "heading", "velocity", "battery", "flight_mode", "armed"}

    def __init__(self, node_id: str):
        if not node_id:
            raise ValueError("node_id is required")
        self.node_id = node_id
        self.sequence = 0

    def decode_mavlink(self, message: dict[str, Any]) -> dict[str, Any]:
        """Normalize a decoded MAVLink message without controlling PX4."""
        return {key: value for key, value in message.items() if key in self.ALLOWED_FIELDS}

    def telemetry_packet(self, message: dict[str, Any]) -> MeshPacket:
        payload = self.decode_mavlink(message)
        self.sequence += 1
        return MeshPacket(self.node_id, self.sequence, "telemetry", payload)

    def telemetry_stream(self, messages: Iterable[dict[str, Any]]) -> Iterable[MeshPacket]:
        for message in messages:
            yield self.telemetry_packet(message)
