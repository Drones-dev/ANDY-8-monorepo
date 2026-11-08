#!/usr/bin/env bash
set -euo pipefail

python_only="false"
if [[ "${1:-}" == "--python-only" ]]; then
  python_only="true"
fi

failures=0
for component in components/*; do
  if [[ -d "$component/tests" ]]; then
    echo "==> $component"
    if ! (cd "$component" && python3 -m unittest discover -s tests -v); then
      failures=$((failures + 1))
    fi
  fi
done

if [[ "$python_only" == "false" && -f components/ANDY-8/package.json ]]; then
  echo "==> components/ANDY-8"
  if ! (cd components/ANDY-8 && pnpm format:check && pnpm typecheck && pnpm lint && pnpm test -- --run && pnpm build --base=/ANDY-8/); then
    failures=$((failures + 1))
  fi
fi

if (( failures > 0 )); then
  echo "Validation failures: $failures" >&2
  exit 1
fi
echo "All available monorepo checks passed."
