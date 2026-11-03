# ANDY-8 Ground Station

Operator interface for monitoring the drone fleet and mesh network.

## What this repository does

It presents live and historical telemetry including drone positions, GPS tracks, heading, altitude, velocity, battery, flight mode, connection status, link quality, routes, packet delivery, latency, failures, and recovery events.

## Integration contract

- Receives validated updates from `ANDY-8-telemetry-server` or a direct ground-station bridge.
- Displays network state but does not make flight-control decisions.
- Uses `ANDY-8-command-center` for authorized operator actions.

## Planned layout

`src/` dashboard UI · `public/` map assets · `tests/` rendering and data-state tests.

Status: initial repository scaffold.
