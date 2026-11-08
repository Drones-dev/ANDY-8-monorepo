from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True, slots=True)
class SitlVehicle:
    vehicle_id: str
    mavlink_endpoint: str
    start_command: tuple[str, ...]


def parse_telemetry_line(line: str) -> dict[str, Any]:
    """Parse a JSON telemetry adapter line emitted by a SITL harness."""
    value = json.loads(line)
    if not isinstance(value, dict) or "vehicle_id" not in value:
        raise ValueError("SITL telemetry must be an object with vehicle_id")
    return value
