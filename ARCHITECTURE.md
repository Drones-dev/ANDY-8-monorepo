# Architecture

SITL integration owns process profiles and adapters around PX4 simulation. It does not implement routing or flight control. Each vehicle gets a stable ID and MAVLink endpoint; telemetry is normalized into the same bridge input used by hardware nodes. Failure injection is supplied by the simulation repository.
