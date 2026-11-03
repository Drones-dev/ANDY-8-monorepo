from __future__ import annotations

import random
from dataclasses import dataclass


@dataclass(slots=True)
class Link:
    source: str
    destination: str
    loss_rate: float = 0.0
    latency_ms: int = 20
    active: bool = True


@dataclass(frozen=True, slots=True)
class SimulationResult:
    delivered: int
    lost: int
    average_latency_ms: float


class Simulation:
    def __init__(self, seed: int = 8):
        self.random = random.Random(seed)
        self.links: dict[tuple[str, str], Link] = {}

    def add_link(self, link: Link) -> None:
        if not 0 <= link.loss_rate <= 1:
            raise ValueError("loss_rate must be between 0 and 1")
        self.links[(link.source, link.destination)] = link

    def transmit(self, source: str, destination: str, packets: int) -> SimulationResult:
        link = self.links[(source, destination)]
        delivered = 0
        latencies: list[int] = []
        for _ in range(packets):
            if link.active and self.random.random() >= link.loss_rate:
                delivered += 1
                latencies.append(link.latency_ms)
        return SimulationResult(delivered, packets - delivered, sum(latencies) / len(latencies) if latencies else 0)
