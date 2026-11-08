# Contributing

Use the component repository that owns the behavior for component-specific changes. Keep the same relative paths when synchronizing changes into this monorepo.

## Local validation

Run `./scripts/test-all.sh` from the repository root. It runs Python unit tests for every component with a `tests/` directory and, when dependencies are installed, the website formatting, typecheck, lint, tests, and build checks.

Do not commit secrets, generated Python caches, build output, firmware binaries, or cloud state. Hardware changes must include an updated BOM or pinout note. Protocol changes must include compatibility and fixture updates.
