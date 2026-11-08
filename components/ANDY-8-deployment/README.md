# ANDY-8 Deployment

Build, release, versioning, staging, and production-deployment automation.

## What this repository does

It defines CI/CD workflows, firmware and software release conventions, reproducible build jobs, artifact retention, staging environments, promotion gates, and rollback procedures.

## Integration contract

- Builds firmware, protocol libraries, services, dashboards, and test artifacts from pinned revisions.
- Runs required checks before publishing releases.
- Signs and records release artifacts when `ANDY-8-security` policy requires it.

## Planned layout

`.github/workflows/` · `release/` manifests · `scripts/` build tooling · `environments/` staging and production configuration.

Status: initial repository scaffold.
