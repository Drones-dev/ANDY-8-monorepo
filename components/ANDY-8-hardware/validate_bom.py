"""Validate the minimum hardware manifest without requiring CAD tooling."""

REQUIRED = {"flight_controller", "mesh_node", "radio", "ground_station_node", "power"}


def validate_bom(manifest: dict[str, str]) -> list[str]:
    return sorted(REQUIRED - manifest.keys())


if __name__ == "__main__":
    sample = {"flight_controller": "MicroAir743v2-AIO-45", "mesh_node": "ESP32-S3", "radio": "SX1262", "ground_station_node": "ESP32-S3", "power": "CNHL LiPo"}
    missing = validate_bom(sample)
    raise SystemExit(f"missing BOM fields: {missing}" if missing else 0)
