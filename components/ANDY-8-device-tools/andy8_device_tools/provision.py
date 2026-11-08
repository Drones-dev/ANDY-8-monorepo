from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class DeviceProfile:
    node_id: str
    frequency_mhz: int = 915
    spreading_factor: int = 9
    coding_rate: str = "4/7"


def provision(node_id: str) -> DeviceProfile:
    if not node_id or len(node_id) > 32:
        raise ValueError("node_id must be 1-32 characters")
    return DeviceProfile(node_id)
