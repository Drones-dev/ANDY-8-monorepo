from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class Alert:
    severity: str
    message: str


class Metrics:
    def __init__(self):
        self.counters: dict[str, int] = {}
        self.values: dict[str, float] = {}

    def count(self, name: str, amount: int = 1) -> None:
        self.counters[name] = self.counters.get(name, 0) + amount

    def observe(self, name: str, value: float) -> None:
        self.values[name] = float(value)

    def evaluate(self, delivery_target: float = 0.95) -> list[Alert]:
        delivery = self.values.get("packet_delivery_ratio")
        return [Alert("warning", f"packet delivery below {delivery_target:.0%}")] if delivery is not None and delivery < delivery_target else []
