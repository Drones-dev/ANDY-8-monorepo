# ANDY-8 Cloud Infrastructure

Infrastructure definitions for hosted ANDY-8 services.

## What this repository does

It defines cloud databases, message brokers, object storage, networking, secrets integration, service environments, observability resources, backups, and access boundaries used by telemetry, monitoring, and dashboards.

## Integration contract

- Infrastructure changes are reviewed and applied through `ANDY-8-deployment`.
- Data retention and access policies follow `ANDY-8-security`.
- Development and production resources are isolated.

## Planned layout

`terraform/` or `pulumi/` resources · `environments/` · `modules/` · `docs/` runbooks.

Status: initial repository scaffold. Do not commit cloud credentials.
