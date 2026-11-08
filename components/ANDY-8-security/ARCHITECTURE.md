# Architecture

Security is layered: device identity is provisioned before operation, packet integrity is checked at the protocol boundary, operator authorization is enforced by command center, and release artifacts are verified by deployment. The HMAC helper is a development primitive; production key storage and rotation must use a hardware-backed or managed secret system.
