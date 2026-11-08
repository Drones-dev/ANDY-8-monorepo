# ANDY-8 Monorepo

Unified source tree for the ANDY-8 distributed drone mesh platform.

## Repository layout

All original projects live under `components/` with their source history preserved through subtree merges.

- `components/ANDY-8` - project website
- `components/ANDY-8-mesh-firmware` - ESP32-S3 and SX1262 mesh firmware
- `components/ANDY-8-mesh-routing` - multi-hop route discovery, forwarding, failure detection, and rerouting
- `components/ANDY-8-protocol` - shared packet contract
- `components/ANDY-8-mavlink-bridge` - PX4/MAVLink transport adapter
- `components/ANDY-8-ground-station` - operator telemetry state and UI boundary
- `components/ANDY-8-telemetry-server` - telemetry ingestion and history
- `components/ANDY-8-command-center` - authorized fleet commands
- `components/ANDY-8-simulation` - deterministic network simulation
- `components/ANDY-8-sitl-integration` - PX4 SITL adapter
- `components/ANDY-8-hardware` - electrical and mechanical source documents
- `components/ANDY-8-device-tools` - provisioning and diagnostics
- `components/ANDY-8-test-lab` - integration and HIL test models
- `components/ANDY-8-monitoring` - metrics and alerts
- `components/ANDY-8-data-analysis` - performance analysis
- `components/ANDY-8-documentation` - canonical project documentation
- `components/ANDY-8-deployment` - release and CI/CD definitions
- `components/ANDY-8-security` - identity and security helpers
- `components/ANDY-8-mobile-ground-station` - mobile operator state model
- `components/ANDY-8-cloud-infrastructure` - infrastructure definitions

## History policy

The root history contains monorepo integration commits. Each component was imported without `--squash`, so its original commit history remains available through the subtree merge ancestry.

## Current validation

The repository-level CI runs Python unit tests for every component that exposes a `tests/` directory and performs the website checks when the website dependencies are available. Hardware and provider-specific integrations are validated structurally until their external toolchains are configured.
