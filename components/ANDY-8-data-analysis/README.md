# ANDY-8 Data Analysis

Offline analysis of flight records and mesh performance.

## What this repository does

It analyzes recorded telemetry and network events for latency, RSSI, SNR, packet loss, route stability, recovery time, battery behavior, and topology changes. It produces reproducible tables and plots for project reports.

## Integration contract

- Reads versioned exports from `ANDY-8-telemetry-server` and `ANDY-8-test-lab`.
- Preserves units, timestamps, node IDs, scenario IDs, and measurement provenance.
- Separates raw data from derived results.

## Planned layout

`src/` analysis pipelines · `notebooks/` explorations · `reports/` generated summaries · `schemas/` input formats.

Status: initial repository scaffold.
