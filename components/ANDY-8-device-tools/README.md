# ANDY-8 Device Tools

Provisioning, flashing, diagnostics, and factory-test utilities for mesh nodes.

## What this repository does

It flashes firmware, assigns node identities, applies radio configuration, checks hardware health, runs radio diagnostics, captures serial logs, and supports repeatable factory acceptance tests.

## Integration contract

- Device identity and configuration formats are compatible with `ANDY-8-security` and `ANDY-8-protocol`.
- Hardware checks follow pinouts and expected parts in `ANDY-8-hardware`.
- Tools must report destructive actions clearly before execution.

## Planned layout

`src/cli/` command-line tools · `profiles/` node configurations · `diagnostics/` tests · `tests/` device-tool tests.

Status: initial repository scaffold.
