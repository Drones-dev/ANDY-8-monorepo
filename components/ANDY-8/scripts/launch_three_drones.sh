#!/usr/bin/env bash
PX4_DIR=~/PX4-Autopilot   # adjust to your path
cd "$PX4_DIR" || exit 1

mkdir -p logs
trap 'echo "Stopping..."; pkill -f bin/px4; pkill -f "gz sim"; exit' INT TERM

# Build once (skips quickly if already built)
make px4_sitl_default || exit 1

# Drone 1: starts Gazebo with the Baylands world
PX4_GZ_WORLD=baylands PX4_SYS_AUTOSTART=4001 PX4_SIM_MODEL=gz_x500 \
PX4_GZ_MODEL_POSE="0,0" \
./build/px4_sitl_default/bin/px4 -i 0 -d > logs/drone1.log 2>&1 &
sleep 20   # let Gazebo and drone 1 finish starting

# Drone 2: joins the existing world
PX4_GZ_WORLD=baylands PX4_GZ_STANDALONE=1 PX4_SYS_AUTOSTART=4001 PX4_SIM_MODEL=gz_x500 \
PX4_GZ_MODEL_POSE="0,3" \
./build/px4_sitl_default/bin/px4 -i 1 -d > logs/drone2.log 2>&1 &
sleep 8

# Drone 3
PX4_GZ_WORLD=baylands PX4_GZ_STANDALONE=1 PX4_SYS_AUTOSTART=4001 PX4_SIM_MODEL=gz_x500 \
PX4_GZ_MODEL_POSE="3,0" \
./build/px4_sitl_default/bin/px4 -i 2 -d > logs/drone3.log 2>&1 &

echo "All three launched. Press Ctrl+C here to stop everything."
wait
