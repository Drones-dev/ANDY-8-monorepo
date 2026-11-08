# Architecture

The simulator uses deterministic random seeds so packet-loss and latency scenarios are reproducible. A `Link` models reachability, loss, and latency; `Simulation.transmit` returns measured delivery and latency results. Multi-hop scenarios can compose links and route decisions from `ANDY-8-mesh-routing`.

The simulator is intentionally hardware-free and is the first validation layer before PX4 SITL, bench testing, and physical flights.
