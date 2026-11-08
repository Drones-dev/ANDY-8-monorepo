# Architecture

The command center is a policy boundary, not a flight controller. An operator request is validated, assigned a command ID, recorded as pending, and handed to the protocol/bridge transport. Acknowledgements close the request and provide an audit point.

Emergency actions must remain explicit and auditable. The initial implementation only models safe command creation and acknowledgement; transport and authentication adapters are separate integration points.
