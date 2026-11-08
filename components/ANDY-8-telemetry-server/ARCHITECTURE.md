# Architecture

Telemetry enters through an adapter that validates the shared packet contract, normalizes the node ID and sequence, and calls `TelemetryStore.ingest`. The store keeps bounded in-memory history for the current development scope. A production adapter can replace the store with a database without changing the ingestion API.

The dashboard consumes `latest`, `history`, and event-stream adapters. Commands are deliberately outside this service and belong to `ANDY-8-command-center`.
