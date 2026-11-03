# ANDY-8 Simulation

Deterministic simulator for mesh behavior before physical hardware testing.

## What this repository does

It simulates multiple drones, radio links, packet loss, latency, changing topology, node movement, relay failures, route recovery, and telemetry generation. It supports repeatable scenarios for validating routing and performance objectives.

## Integration contract

- Emits the same packet structures used by real nodes.
- Can connect to routing code through a UDP or in-process adapter.
- Produces timestamps and scenario metadata for `ANDY-8-data-analysis`.

## Planned layout

`src/scenarios/` scenario definitions · `src/radio/` link model · `src/vehicles/` drone model · `tests/` deterministic scenario tests.

Status: initial repository scaffold.
