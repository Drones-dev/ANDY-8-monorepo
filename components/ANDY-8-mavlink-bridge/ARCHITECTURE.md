# Architecture

The bridge has three isolated boundaries: a MAVLink decoder, a telemetry normalizer, and a transport adapter. PX4 remains the flight-control authority. The bridge only selects safe telemetry fields, attaches the node identity and sequence number, and hands a transport-neutral packet to LoRa or UDP.

The initial implementation uses dictionaries and JSON so simulation and unit tests have no hardware dependency. A UART4/RadioLib implementation can be added behind the same `telemetry_packet` interface.
