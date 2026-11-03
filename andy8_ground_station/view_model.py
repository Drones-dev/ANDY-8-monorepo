from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(slots=True)
class GroundStationState:
    nodes: dict[str, dict[str, Any]] = field(default_factory=dict)
    alerts: list[str] = field(default_factory=list)

    def apply_telemetry(self, node_id: str, telemetry: dict[str, Any]) -> None:
        current = dict(self.nodes.get(node_id, {}))
        current.update(telemetry)
        current["connected"] = True
        self.nodes[node_id] = current

    def mark_unreachable(self, node_id: str) -> None:
        current = dict(self.nodes.get(node_id, {}))
        current["connected"] = False
        self.nodes[node_id] = current
        self.alerts.append(f"{node_id} unreachable")

    def snapshot(self) -> dict[str, Any]:
        return {"nodes": self.nodes, "alerts": self.alerts[-20:]}
