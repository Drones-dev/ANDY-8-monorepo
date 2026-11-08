# Architecture

The protocol repository owns the stable wire contract. Packets are canonical JSON records during development and test; the same fields can later be packed into a compact binary frame for LoRa.

`Packet` contains version, type, source, destination, sequence, message ID, TTL, payload, and CRC. Producers create and sign the canonical body with CRC32. Consumers decode, validate version and required fields, verify CRC, reject expired packets, and only then hand the payload to routing or application code.

The compatibility rule is additive fields within a protocol version. A breaking field or semantic change increments the version and requires new fixtures and a migration note.
