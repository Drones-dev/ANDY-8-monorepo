# ANDY-8 MAVLink Bridge

Transport adapter between PX4 flight controllers, ESP32 mesh nodes, LoRa, UDP test links, and ground-station systems.

## What this repository does

It reads selected MAVLink telemetry from PX4 over UART4, converts it into the shared ANDY-8 protocol, transports it through an ESP32-S3/SX1262 LoRa node or UDP test adapter, and converts received telemetry back into application events.

## Integration contract

- Flight control remains owned by PX4; this bridge transports telemetry only.
- MAVLink parsing is separated from LoRa framing and UDP transport.
- The bridge uses `ANDY-8-protocol` for packet creation and validation.

## Planned layout

`src/mavlink/` parsers · `src/transports/` UART, LoRa, and UDP adapters · `tests/` synthetic telemetry fixtures.

Status: initial repository scaffold.
