from __future__ import annotations

import re


SEMVER = re.compile(r"^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$")


def validate_release(version: str, commit: str, artifacts: list[str]) -> dict[str, object]:
    if not SEMVER.fullmatch(version):
        raise ValueError("version must use vMAJOR.MINOR.PATCH")
    if len(commit) < 7 or not re.fullmatch(r"[0-9a-f]+", commit):
        raise ValueError("commit must be a hexadecimal revision")
    if not artifacts:
        raise ValueError("at least one artifact is required")
    return {"version": version, "commit": commit, "artifacts": sorted(artifacts)}
