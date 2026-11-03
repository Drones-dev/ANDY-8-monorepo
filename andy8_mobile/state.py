from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(slots=True)
class MobileState:
    connected: bool = False
    selected_node: str | None = None
    notifications: list[str] = field(default_factory=list)

    def select_node(self, node_id: str) -> None:
        if not node_id:
            raise ValueError("node_id is required")
        self.selected_node = node_id

    def receive_alert(self, message: str) -> None:
        self.notifications.append(message)
        self.notifications = self.notifications[-20:]
