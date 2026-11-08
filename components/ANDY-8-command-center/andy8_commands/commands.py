from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any
from uuid import uuid4


class CommandError(ValueError):
    pass


@dataclass(frozen=True, slots=True)
class CommandRequest:
    command_id: str
    operator: str
    targets: tuple[str, ...]
    action: str
    parameters: dict[str, Any]
    created_at: str


class CommandCenter:
    SAFE_ACTIONS = {"arm", "disarm", "return_home", "hold", "set_mission", "set_config"}

    def __init__(self):
        self._pending: dict[str, CommandRequest] = {}

    def create(self, operator: str, targets: list[str], action: str, parameters: dict[str, Any] | None = None) -> CommandRequest:
        if not operator or not targets or action not in self.SAFE_ACTIONS:
            raise CommandError("operator, targets, and a supported action are required")
        request = CommandRequest(
            command_id=str(uuid4()), operator=operator, targets=tuple(targets), action=action,
            parameters=dict(parameters or {}), created_at=datetime.now(timezone.utc).isoformat(),
        )
        self._pending[request.command_id] = request
        return request

    def acknowledge(self, command_id: str) -> CommandRequest:
        try:
            return self._pending.pop(command_id)
        except KeyError as exc:
            raise CommandError("unknown command") from exc
