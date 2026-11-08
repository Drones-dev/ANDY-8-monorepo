# Architecture

Deployment validates version and artifact metadata in CI before a release is promoted. Build jobs remain repository-specific; this repository owns the release envelope, promotion gates, artifact naming, staging/production separation, and rollback documentation.
