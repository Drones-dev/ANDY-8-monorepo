# Architecture

The ground station is a presentation boundary. A transport adapter feeds validated telemetry and network events into `GroundStationState`; a web or desktop UI renders the snapshot. The state model owns no flight-control logic and exposes explicit connection and alert state for the operator.
