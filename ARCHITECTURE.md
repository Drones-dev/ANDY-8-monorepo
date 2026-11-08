# Monorepo Architecture

The monorepo is an integration view over the existing ANDY-8 repositories. Each component remains independently buildable and retains its original files and commit ancestry. The root provides shared validation and documents the dependency direction.

```text
PX4 / MAVLink
      |
ANDY-8-mavlink-bridge ---- ANDY-8-protocol ---- ANDY-8-mesh-firmware
      |                             |
ANDY-8-sitl-integration       ANDY-8-mesh-routing
      |                             |
ANDY-8-simulation -------- ANDY-8-test-lab
                                      |
                             ANDY-8-telemetry-server
                               /              \\
                    ground-station       monitoring
                         |                   |
              mobile-ground-station   data-analysis

command-center -> bridge/protocol -> mesh nodes
hardware -> firmware/device-tools
security -> protocol/device-tools/command-center/deployment
cloud-infrastructure -> telemetry-server/monitoring/deployment
documentation -> all components
```

## Boundaries

- `ANDY-8-protocol` owns packet schema, versions, validation, and compatibility.
- `ANDY-8-mesh-routing` owns route discovery, forwarding, duplicate prevention, relay failure detection, and rerouting.
- `ANDY-8-mesh-firmware` owns ESP32-S3/SX1262 hardware integration.
- `ANDY-8-mavlink-bridge` transports selected PX4 telemetry and does not control flight behavior.
- `ANDY-8-telemetry-server` stores and distributes telemetry; `ANDY-8-command-center` owns commands.
- Ground-station applications render state and request actions through service boundaries.
- Hardware and cloud components are declarative/documentation-first until their provider and board toolchains are selected.

## Migration policy

The source repositories remain authoritative for their individual histories and are not rewritten by this monorepo. New shared tooling belongs at the root; component-specific changes should be made in the component repository first and then imported as a new subtree update.
