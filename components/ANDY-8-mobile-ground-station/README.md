# ANDY-8 Mobile Ground Station

Mobile field-operator interface for ANDY-8 monitoring and control.

## What this repository does

It provides a mobile view of drone positions, telemetry, battery, connection status, mesh health, alerts, and authorized fleet commands for field operations where a laptop is inconvenient.

## Integration contract

- Uses the same APIs and event schemas as `ANDY-8-ground-station`.
- Uses `ANDY-8-command-center` for commands and follows `ANDY-8-security` authorization rules.
- Provides degraded/offline indicators when connectivity is unavailable.

## Planned layout

`src/` mobile application · `screens/` operator views · `services/` API clients · `tests/` device and UI tests.

Status: initial repository scaffold.
