# ANDY-8 Hardware

Hardware design records for the ANDY-8 drones and ground station.

## What this repository does

It stores schematics, wiring diagrams, PCB files, enclosure and mount designs, pinouts, connector maps, assembly notes, and bills of materials for the MicroAir743v2-AIO-45, ESP32-S3, SX1262 LoRa, power system, and ground-station node.

## Integration contract

- Pin assignments must match firmware configuration.
- BOM changes require compatibility review with `ANDY-8-device-tools` and `ANDY-8-mesh-firmware`.
- Safety-critical power and flight-control wiring is documented separately from telemetry wiring.

## Planned layout

`schematics/` · `pcb/` · `mechanical/` · `pinouts/` · `bom/` · `assembly/`.

Status: initial repository scaffold.
