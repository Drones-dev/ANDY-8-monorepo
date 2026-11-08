# ANDY-8 Command Center

Fleet command and mission-control service for authorized operators.

## What this repository does

It sends commands to one drone or the full fleet, including mission actions, configuration changes, route diagnostics, reboot requests, and emergency actions. It tracks command IDs, acknowledgements, authorization, and delivery status.

## Integration contract

- Commands are never sent directly to PX4 without validation and authorization.
- Uses `ANDY-8-protocol` for command envelopes and `ANDY-8-mavlink-bridge` for transport.
- Emergency actions require explicit operator confirmation and audit records.

## Planned layout

`src/commands/` command definitions · `src/policy/` authorization · `tests/` safety and acknowledgement tests.

Status: initial repository scaffold.
