from pathlib import Path


REQUIRED_SECTIONS = ("Architecture", "Setup", "Operations", "Troubleshooting")


def missing_sections(text: str) -> list[str]:
    return [section for section in REQUIRED_SECTIONS if f"# {section}" not in text]


if __name__ == "__main__":
    index = Path("README.md").read_text()
    missing = missing_sections(index)
    raise SystemExit(f"missing sections: {missing}" if missing else 0)
