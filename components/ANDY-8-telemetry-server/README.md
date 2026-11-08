# ANDY-8 Telemetry Server

Backend service for receiving, storing, querying, and distributing ANDY-8 telemetry.

## What this repository does

It accepts validated telemetry from the ground station, stores historical flight and mesh records, exposes APIs for dashboards and analysis, and distributes live updates to connected operators.

## Integration contract

- Validates packets against `ANDY-8-protocol` before persistence.
- Publishes normalized drone, link, route, and alert events.
- Keeps command handling separate from telemetry ingestion.

## Planned layout

`src/ingest/` receivers · `src/api/` REST/WebSocket APIs · `migrations/` schema · `tests/` API and persistence tests.

Status: initial repository scaffold.
