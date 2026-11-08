# ANDY-8 SITL Integration

Integration layer between ANDY-8 networking and PX4 Software-in-the-Loop vehicles.

## What this repository does

It launches and configures multiple PX4 SITL vehicles, connects their MAVLink streams to the bridge, maps simulated vehicle telemetry into mesh packets, and injects communication interruptions for recovery testing.

## Integration contract

- PX4 controls simulated flight behavior.
- `ANDY-8-mavlink-bridge` owns telemetry adaptation.
- `ANDY-8-simulation` supplies network conditions and failure scenarios.

## Planned layout

`launch/` SITL launch profiles · `src/` adapters · `scenarios/` multi-vehicle tests · `tests/` end-to-end checks.

Status: initial repository scaffold.
