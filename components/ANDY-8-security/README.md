# ANDY-8 Security

Security policy and implementation support for devices, packets, software, and operators.

## What this repository does

It defines authentication, encryption, device identity, secure pairing, signed firmware, key rotation, operator access control, audit requirements, and threat-model assumptions for the ANDY-8 system.

## Integration contract

- Packet integrity and identity rules integrate with `ANDY-8-protocol`.
- Provisioning and identity enrollment integrate with `ANDY-8-device-tools`.
- Releases and firmware verification integrate with `ANDY-8-deployment`.
- Security controls must preserve flight-control and telemetry separation.

## Planned layout

`threat-model/` · `policies/` · `keys/` templates only, never secrets · `src/` security helpers · `tests/` security tests.

Status: initial repository scaffold. Never commit credentials or private keys.
