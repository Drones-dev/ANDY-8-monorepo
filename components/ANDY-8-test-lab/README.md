# ANDY-8 Test Lab

Cross-repository validation for the complete ANDY-8 system.

## What this repository does

It contains integration tests, hardware-in-the-loop tests, radio range tests, stress tests, packet-loss tests, route-failure tests, and automated fixtures for verifying the mesh, telemetry, commands, and dashboard.

## Integration contract

- Reuses protocol fixtures and simulation scenarios instead of duplicating packet definitions.
- Records measured delivery, latency, failure-detection, and recovery results.
- Separates simulated, bench, HIL, and flight-test profiles.

## Planned layout

`tests/integration/` · `tests/hil/` · `tests/radio/` · `fixtures/` · `reports/`.

Status: initial repository scaffold.
