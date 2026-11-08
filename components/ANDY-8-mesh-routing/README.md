# ANDY-8 Mesh Routing

Routing layer for the ANDY-8 drone mesh network.

This repository implements multi-hop communication between ANDY-8 LoRa nodes:

- Neighbor-aware route discovery and route selection
- Packet forwarding across relay nodes
- Duplicate-packet prevention
- Relay health and failure detection
- Automatic rerouting after topology changes

The companion repository [ANDY-8-mesh-firmware](https://github.com/Drones-dev/ANDY-8-mesh-firmware) owns ESP32/LoRa hardware integration, node profiles, MAVLink wiring, and radio transport. This repository owns routing decisions and forwarding state above that transport.

## Initial design

Each node maintains a bounded neighbor table, a route table, a recently-seen packet cache, and relay health counters. The routing layer is transport-agnostic so it can be tested on a host and connected to firmware through an adapter.

## Local layout

```text
include/andy8/routing.hpp   Public routing API and bounded state types
src/routing.cpp             Route learning, forwarding, duplicate cache, and failure handling
tests/routing_tests.cpp     Host tests for topology, TTL, duplicates, expiry, and rerouting
docs/ARCHITECTURE.md        Design and integration notes
```

## Build and test

```sh
cmake -S . -B build
cmake --build build
ctest --test-dir build --output-on-failure
```

## Planned milestones

- [ ] Define routing and forwarding interfaces
- [ ] Add route-table and duplicate-cache implementations
- [ ] Add route discovery and route scoring
- [ ] Add forwarding TTL and loop prevention
- [ ] Add relay timeout and failure tracking
- [ ] Add reroute behavior and recovery tests
- [ ] Integrate with ANDY-8 mesh firmware
- [ ] Validate four-node and PX4 simulation topologies

## Non-goals

This repository does not own motor control, PX4 flight behavior, raw RadioLib setup, or the ground-station UI.
