from pathlib import Path


def validate() -> None:
    text = Path("terraform/main.tf").read_text()
    required = ("variable \"environment\"", "output \"environment\"")
    missing = [item for item in required if item not in text]
    if missing:
        raise SystemExit(f"missing infrastructure declarations: {missing}")


if __name__ == "__main__":
    validate()
