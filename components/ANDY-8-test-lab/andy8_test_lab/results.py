from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True, slots=True)
class TestResult:
    name: str
    passed: bool
    details: str = ""


@dataclass(slots=True)
class Trial:
    scenario: str
    results: list[TestResult] = field(default_factory=list)

    @property
    def passed(self) -> bool:
        return bool(self.results) and all(result.passed for result in self.results)

    def record(self, result: TestResult) -> None:
        self.results.append(result)
