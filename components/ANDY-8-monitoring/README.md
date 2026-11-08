# ANDY-8 Monitoring

Operational logs, metrics, alerts, and diagnostics for the ANDY-8 system.

## What this repository does

It collects packet delivery and latency metrics, tracks node and relay failures, records route changes, correlates firmware and server logs, and raises actionable alerts when the mesh degrades.

## Integration contract

- Consumes events from the telemetry server, ground station, firmware, and deployment systems.
- Uses stable metric names for packet delivery, RSSI, SNR, route stability, battery, and recovery time.
- Never treats a dashboard display value as a measured result without provenance.

## Planned layout

`collectors/` · `rules/` alert definitions · `dashboards/` · `runbooks/` · `tests/`.

Status: initial repository scaffold.
