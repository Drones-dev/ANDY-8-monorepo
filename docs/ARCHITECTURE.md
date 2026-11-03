# ANDY-8 Mesh Routing Architecture

## Scope

This repository owns the routing layer above the LoRa transport. The companion
`ANDY-8-mesh-firmware` repository owns RadioLib, packet serialization, HELLO
beacons, MAVLink, and hardware integration. The adapter between the two layers
should translate firmware neighbor observations and packet metadata into the
types in `include/andy8/routing.hpp`.

## State held by each node

- **Neighbor table:** active direct relays, link cost, last-seen time, and
  consecutive forwarding failures.
- **Route table:** destination, next hop, metric, sequence number, learned time,
  and expiry time.
- **Duplicate cache:** bounded `(source, sequence)` identities with expiry.
- **Counters:** delivered, forwarded, duplicate, no-route, TTL, and relay
  failure totals for diagnostics.

All tables are fixed-size arrays. There is no heap allocation, thread, or
Arduino dependency in the routing core.

## Route learning

The initial strategy is a compact distance-vector design. A neighbor advertises
a destination, metric, and freshness sequence. The receiver adds its direct
link cost and stores the neighbor as the next hop. Candidates are compared in
this order:

1. Higher freshness sequence number.
2. Lower total metric.
3. Lower next-hop ID as a deterministic tie-breaker.

Routes expire unless refreshed. A route learned through an inactive neighbor is
not eligible for forwarding.

## Forwarding lifecycle

```text
receive packet
  -> validate packet identity and TTL
  -> reject recently-seen identity
  -> deliver if destination is local
  -> select valid route
  -> decrement TTL and forward to next hop
  -> record success or failure
```

The core does not transmit bytes. It returns a `ForwardDecision` so the firmware
adapter can enqueue the packet on the radio and report the result later.

## Failure detection and rerouting

Forwarding failures are counted per relay. Once the configured threshold is
reached, all routes using that relay are invalidated. The next forwarding
decision automatically selects another valid route if one exists. HELLO timeout
also deactivates a neighbor and invalidates its routes.

## Embedded constraints

- Bounded arrays instead of dynamic containers.
- Explicit time values supplied by the caller.
- No logging or transport assumptions in the core.
- Packet identity cache prevents loops and duplicate delivery.
- Configuration controls neighbor timeout, route lifetime, and failure threshold.

## Future extensions

- Route advertisements encoded into the firmware packet protocol.
- Link-quality-aware metrics using RSSI and SNR.
- Explicit route-request/route-reply messages for larger networks.
- Optional acknowledgements and per-packet retry budgets.
- Persistent route diagnostics for the ground station.
