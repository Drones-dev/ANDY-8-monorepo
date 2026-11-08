# Architecture

Device tools produce profiles consumed by firmware flashing and diagnostics. Provisioning assigns a stable node ID and the common 915 MHz LoRa defaults from the project design. Hardware I/O is an adapter boundary so these validation rules can run in CI without a board attached.
