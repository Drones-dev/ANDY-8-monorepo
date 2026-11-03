"""Versioned JSON packet contract used by ANDY-8 services and test tools."""

from __future__ import annotations

import json
import zlib
from dataclasses import dataclass, field
from enum import StrEnum
from typing import Any


class ProtocolError(ValueError):
    """Raised when a packet cannot be trusted or understood."""


class PacketType(StrEnum):
    HEALTH = "health"
    TELEMETRY = "telemetry"
    COMMAND = "command"
    ACK = "ack"
    ROUTE = "route"


@dataclass(slots=True)
class Packet:
    source: str
    destination: str
    packet_type: PacketType
    sequence: int
    message_id: str
    payload: dict[str, Any] = field(default_factory=dict)
    ttl: int = 8
    version: int = 1
    crc: str = ""

    def canonical_body(self) -> bytes:
        body = {
            "version": self.version,
            "type": self.packet_type.value,
            "source": self.source,
            "destination": self.destination,
            "sequence": self.sequence,
            "message_id": self.message_id,
            "ttl": self.ttl,
            "payload": self.payload,
        }
        return json.dumps(body, sort_keys=True, separators=(",", ":")).encode()

    def with_crc(self) -> "Packet":
        self.crc = f"{zlib.crc32(self.canonical_body()):08x}"
        return self

    def validate(self, supported_versions: set[int] | None = None) -> None:
        if supported_versions is not None and self.version not in supported_versions:
            raise ProtocolError(f"unsupported protocol version: {self.version}")
        if not self.source or not self.destination or not self.message_id:
            raise ProtocolError("source, destination, and message_id are required")
        if self.sequence < 0 or self.ttl < 0:
            raise ProtocolError("sequence and ttl must be non-negative")
        expected = f"{zlib.crc32(self.canonical_body()):08x}"
        if self.crc != expected:
            raise ProtocolError("CRC mismatch")


def encode_packet(packet: Packet) -> bytes:
    packet.with_crc()
    packet.validate({1})
    return (json.dumps({
        "version": packet.version,
        "type": packet.packet_type.value,
        "source": packet.source,
        "destination": packet.destination,
        "sequence": packet.sequence,
        "message_id": packet.message_id,
        "ttl": packet.ttl,
        "payload": packet.payload,
        "crc": packet.crc,
    }, sort_keys=True, separators=(",", ":")) + "\n").encode()


def decode_packet(data: bytes) -> Packet:
    try:
        raw = json.loads(data)
        packet = Packet(
            source=raw["source"], destination=raw["destination"],
            packet_type=PacketType(raw["type"]), sequence=int(raw["sequence"]),
            message_id=raw["message_id"], payload=dict(raw.get("payload", {})),
            ttl=int(raw.get("ttl", 0)), version=int(raw.get("version", 0)),
            crc=raw["crc"],
        )
        packet.validate({1})
        return packet
    except (KeyError, TypeError, ValueError, json.JSONDecodeError) as exc:
        raise ProtocolError(f"invalid packet: {exc}") from exc
