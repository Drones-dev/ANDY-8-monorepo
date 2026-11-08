# ANDY-8 Protocol

Shared wire-contract definitions for the ANDY-8 distributed mesh.

## What this repository does

This repository defines the packet formats and compatibility rules shared by the firmware, routing layer, MAVLink bridge, ground station, telemetry server, simulator, and test tools. It is the single source of truth for message types, serialization, validation, protocol versions, sequence numbers, TTL, CRC, duplicate detection, and capability negotiation.

## Integration contract

- Mesh nodes use the packet schema for discovery, health, telemetry, acknowledgements, and routing messages.
- Receivers reject unsupported versions, malformed lengths, invalid CRCs, expired TTLs, and duplicate message IDs.
- Changes require a versioned compatibility note and fixture updates.

## Planned layout

`schema/` packet definitions · `src/` serializers and validators · `fixtures/` golden packets · `docs/` compatibility policy.

Status: initial repository scaffold.
