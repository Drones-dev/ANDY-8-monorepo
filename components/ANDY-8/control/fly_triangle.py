import asyncio
from mavsdk import System
from mavsdk.offboard import PositionNedYaw

# One entry per drone: MAVLink port, takeoff altitude (m), and target
# offset from that drone's own start point (north, east) in meters.
# Altitudes differ so the drones don't collide on the way.
DRONES = [
    {"name": "Drone 1", "port": 14540, "alt": 8,  "north": 8,  "east": 0},
    {"name": "Drone 2", "port": 14541, "alt": 10, "north": -7, "east": -7},
    {"name": "Drone 3", "port": 14542, "alt": 12, "north": -4, "east": 4},
]


async def fly(i, cfg):
    name = cfg["name"]
    drone = System(port=50040 + i)  # each drone needs its own local MAVSDK server port
    await drone.connect(system_address=f"udpin://0.0.0.0:{cfg['port']}")

    async for state in drone.core.connection_state():
        if state.is_connected:
            print(f"{name}: connected")
            break

    async for health in drone.telemetry.health():
        if health.is_global_position_ok and health.is_home_position_ok:
            break

    await drone.action.arm()
    print(f"{name}: armed")

    # Climb straight up first
    await drone.offboard.set_position_ned(PositionNedYaw(0, 0, -cfg["alt"], 0))
    await drone.offboard.start()
    await asyncio.sleep(10)

    # Fly to this drone's triangle corner
    await drone.offboard.set_position_ned(
        PositionNedYaw(cfg["north"], cfg["east"], -cfg["alt"], 0)
    )
    print(f"{name}: moving to triangle position")
    await asyncio.sleep(20)

    await drone.offboard.stop()
    print(f"{name}: holding position")
    return drone


async def main():
    drones = await asyncio.gather(*(fly(i, c) for i, c in enumerate(DRONES)))
    await asyncio.sleep(60)
    print("Landing all drones")
    await asyncio.gather(*(d.action.land() for d in drones))
    await asyncio.sleep(15)
    print("Done")


asyncio.run(main())
