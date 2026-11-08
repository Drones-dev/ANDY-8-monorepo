.PHONY: test test-python test-website

test: test-python test-website

test-python:
	./scripts/test-all.sh --python-only

test-website:
	cd components/ANDY-8 && pnpm format:check && pnpm typecheck && pnpm lint && pnpm test -- --run && pnpm build --base=/ANDY-8/
