import { useState } from "react";

const DRONE_A = "https://images.unsplash.com/photo-1621506683092-a4a47fc01dbd?w=260&h=160&fit=crop&auto=format&q=80";
const DRONE_B = "https://images.unsplash.com/photo-1679136578198-539e835445be?w=260&h=160&fit=crop&auto=format&q=80";
const DRONE_C = "https://images.unsplash.com/photo-1761893425281-09ad46325079?w=260&h=160&fit=crop&auto=format&q=80";

const tabs = ["Network Topology", "Hardware Stack", "Message Flow", "Failure Recovery", "Security"];

const techCards = [
  { name: "MicroAir743v2", role: "PX4 flight controller", icon: "△", color: "#2491FF" },
  { name: "ESP32-S3", role: "Custom mesh-node processor", icon: "⬡", color: "#F59E0B" },
  { name: "SX1262 LoRa", role: "915 MHz multi-hop radio", icon: "⌁", color: "#EF4444" },
  { name: "MAVLink over UART4", role: "Flight-controller telemetry link", icon: "⇄", color: "#70B7FF" },
  { name: "Ground Station", role: "USB-connected laptop receiver", icon: "▣", color: "#22C55E" },
  { name: "React Dashboard", role: "Operator monitoring interface", icon: "◎", color: "#A855F7" },
  { name: "RadioLib", role: "SX1262 radio control library", icon: "◌", color: "#38BDF8" },
  { name: "Arduino C++", role: "ESP32-S3 firmware environment", icon: "◻", color: "#2491FF" },
];

const messageFlow = [
  { step: 1, text: "Each node sends periodic PING messages and records PONG responses.", type: "normal" },
  {
    step: 2,
    text: "Neighbor tables track node ID, last reply, signal quality, noise, hop count, and missed replies.",
    type: "normal",
  },
  {
    step: 3,
    text: "Drone 3 selects the best path to the ground station using hop count and link quality.",
    type: "normal",
  },
  {
    step: 4,
    text: "Drone 2 stops responding and reaches the three-missed-heartbeat failure threshold.",
    type: "failure",
  },
  {
    step: 5,
    text: "Routes using Drone 2 are invalidated; packets are validated for CRC, TTL, and duplicates.",
    type: "failure",
  },
  { step: 6, text: "The network selects the remaining viable Drone 3 → Drone 1 path.", type: "recovery" },
  {
    step: 7,
    text: "Telemetry resumes through the alternate route without operator reconfiguration.",
    type: "recovery",
  },
  {
    step: 8,
    text: "The ground station records packet delivery, latency, route changes, and recovery time.",
    type: "normal",
  },
];

const droneSpecs = [["MicroAir743v2", "PX4", "ESP32-S3", "SX1262 LoRa"]];

type DroneConfig = {
  src: string;
  label: string;
  sublabel: string;
  online: boolean;
  specs?: string[];
};

const normalDrones: DroneConfig[] = [
  { src: DRONE_C, label: "Drone 3", sublabel: "Remote Node", online: true, specs: droneSpecs[0] },
  { src: DRONE_B, label: "Drone 2", sublabel: "Relay", online: true, specs: droneSpecs[0] },
  { src: DRONE_A, label: "Drone 1", sublabel: "Gateway", online: true, specs: droneSpecs[0] },
];

const failureDrones: DroneConfig[] = [
  { src: DRONE_C, label: "Drone 3", sublabel: "Remote Node", online: true, specs: droneSpecs[0] },
  { src: DRONE_B, label: "Drone 2", sublabel: "Relay", online: false, specs: droneSpecs[0] },
  { src: DRONE_A, label: "Drone 1", sublabel: "Gateway", online: true, specs: droneSpecs[0] },
];

export default function Architecture({ navOffset }: { navOffset: string }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`min-h-screen ${navOffset}`} style={{ backgroundColor: "#061426" }}>
      {/* Page header */}
      <div className="border-b bg-grid" style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.10)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#70B7FF" }}>
            System Architecture
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "#F8FAFC" }}>
            System Architecture
          </h1>
          <p className="text-base mb-6" style={{ color: "#A9B8CA" }}>
            Three-node mesh network with dynamic hand-off
          </p>

          {/* Tabs */}
          <div className="flex gap-0 overflow-x-auto" role="tablist" aria-label="Architecture sections">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`tab-panel-${i}`}
                id={`tab-${i}`}
                onClick={() => setActiveTab(i)}
                className="px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all"
                style={{
                  borderColor: activeTab === i ? "#2491FF" : "transparent",
                  color: activeTab === i ? "#F8FAFC" : "#A9B8CA",
                  backgroundColor: "transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── TAB 0: Network Topology ── */}
        {activeTab === 0 && (
          <div id="tab-panel-0" role="tabpanel" aria-labelledby="tab-0">
            {/* Normal Route */}
            <div
              className="rounded-2xl border overflow-hidden mb-6"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "rgba(148,163,184,0.10)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#22C55E" }} />
                  <h2 className="font-semibold text-sm" style={{ color: "#F8FAFC" }}>
                    Normal Route <span style={{ color: "#22C55E" }}>(All Nodes Online)</span>
                  </h2>
                </div>
                <p className="text-xs font-mono hidden sm:block" style={{ color: "#A9B8CA" }}>
                  Drone 3 → Drone 2 → Drone 1 → Ground Station
                </p>
              </div>
              <div className="p-6">
                <DroneRow drones={normalDrones} failure={false} />
              </div>
            </div>

            {/* Relay Failure */}
            <div
              className="rounded-2xl border overflow-hidden mb-10"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(239,68,68,0.2)" }}
            >
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "rgba(148,163,184,0.10)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                  <h2 className="font-semibold text-sm" style={{ color: "#F8FAFC" }}>
                    Relay Failure <span style={{ color: "#EF4444" }}>(Automatic Route Recovery)</span>
                  </h2>
                </div>
                <p className="text-xs font-mono hidden sm:block" style={{ color: "#F59E0B" }}>
                  Drone 3 → Drone 1 (Direct) → Ground Station
                </p>
              </div>
              <div className="p-6">
                <DroneRow drones={failureDrones} failure={true} />
              </div>
            </div>

            {/* Key Technologies */}
            <div>
              <h3 className="text-base font-semibold mb-4" style={{ color: "#F8FAFC" }}>
                Key Technologies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {techCards.slice(0, 4).map(({ name, role, color }) => (
                  <TechCard key={name} name={name} role={role} color={color} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 1: Hardware Stack ── */}
        {activeTab === 1 && (
          <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
              Hardware Stack
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "MicroAir743v2-AIO-45A",
                  type: "Flight Controller",
                  specs: [
                    "PX4 flight-control firmware",
                    "MAVLink telemetry output",
                    "UART4 mesh-node interface",
                    "GPS and flight-state source",
                    "5V regulated accessory power",
                  ],
                  color: "#2491FF",
                },
                {
                  name: "ESP32-S3 + SX1262",
                  type: "Mesh Node",
                  specs: [
                    "Custom C++ mesh firmware",
                    "915 MHz LoRa radio",
                    "SPI radio connection",
                    "Node identity and discovery",
                    "Routing and telemetry forwarding",
                  ],
                  color: "#F59E0B",
                },
                {
                  name: "PX4 + MAVLink",
                  type: "Telemetry Source",
                  specs: [
                    "Global position",
                    "Altitude and velocity",
                    "Battery status",
                    "Flight mode and vehicle status",
                    "Flight control remains separate",
                  ],
                  color: "#2491FF",
                },
                {
                  name: "3D-Printed Frame",
                  type: "Mechanical Integration",
                  specs: [
                    "Three drone platforms",
                    "Payload and radio mounting",
                    "Compatible wiring and voltage",
                    "Bench-to-flight integration",
                    "Controlled test geometry",
                  ],
                  color: "#22C55E",
                },
                {
                  name: "LiPo Battery System",
                  type: "Power & Monitoring",
                  specs: [
                    "CNHL LiPo source",
                    "Flight controller power system",
                    "5V regulated mesh-node supply",
                    "Battery status from PX4",
                    "Battery safety procedures",
                  ],
                  color: "#A855F7",
                },
                {
                  name: "Laptop Ground Station",
                  type: "Command Interface",
                  specs: [
                    "Laptop-connected ESP32-S3 node",
                    "USB serial packet input",
                    "Packet validation and decoding",
                    "In-memory telemetry records",
                    "React operator dashboard",
                  ],
                  color: "#70B7FF",
                },
              ].map(({ name, type, specs, color }) => (
                <div
                  key={name}
                  className="rounded-xl border p-5"
                  style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-1 rounded-full mt-1 self-stretch shrink-0"
                      style={{ backgroundColor: color, minHeight: 36 }}
                    />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#F8FAFC" }}>
                        {name}
                      </p>
                      <p className="text-xs font-mono mt-0.5" style={{ color }}>
                        {type}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {specs.map((s) => (
                      <li key={s} className="text-xs flex items-center gap-2" style={{ color: "#A9B8CA" }}>
                        <span style={{ color }}>·</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 2: Message Flow ── */}
        {activeTab === 2 && (
          <div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
              Message Flow Timeline
            </h2>
            <div className="max-w-2xl">
              <div className="relative pl-10">
                <div
                  className="absolute left-4 top-0 bottom-0 w-px"
                  style={{ backgroundColor: "rgba(36,145,255,0.15)" }}
                />
                {messageFlow.map(({ step, text, type }) => {
                  const color = type === "failure" ? "#EF4444" : type === "recovery" ? "#22C55E" : "#2491FF";
                  return (
                    <div key={step} className="relative mb-5">
                      <div
                        className="absolute -left-6 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2"
                        style={{ backgroundColor: "#0B1B30", borderColor: color, color }}
                      >
                        {step}
                      </div>
                      <div
                        className="rounded-xl border p-4"
                        style={{
                          backgroundColor:
                            type === "failure"
                              ? "rgba(239,68,68,0.05)"
                              : type === "recovery"
                                ? "rgba(34,197,94,0.05)"
                                : "#0B1B30",
                          borderColor:
                            type === "failure"
                              ? "rgba(239,68,68,0.2)"
                              : type === "recovery"
                                ? "rgba(34,197,94,0.2)"
                                : "rgba(148,163,184,0.10)",
                        }}
                      >
                        <p className="text-sm leading-relaxed" style={{ color: "#F8FAFC" }}>
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: Failure Recovery ── */}
        {activeTab === 3 && (
          <div id="tab-panel-3" role="tabpanel" aria-labelledby="tab-3">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
              Failure Recovery Protocol
            </h2>
            <div className="grid lg:grid-cols-2 gap-5">
              {[
                {
                  phase: "Detection",
                  color: "#F59E0B",
                  items: [
                    "Three consecutive PING replies missed",
                    "Neighbor table entry invalidated",
                    "Route marked unavailable",
                    "Alert flagged for ground station",
                  ],
                },
                {
                  phase: "Re-Routing",
                  color: "#2491FF",
                  items: [
                    "Active neighbors re-evaluated",
                    "Alternate path D3→D1 selected",
                    "Hop count and link quality compared",
                    "New route used without manual setup",
                  ],
                },
                {
                  phase: "Restoration",
                  color: "#22C55E",
                  items: [
                    "Telemetry stream redirected",
                    "Packet delivery resumes",
                    "Ground station receives alert",
                    "Recovery time recorded",
                  ],
                },
                {
                  phase: "Stabilization",
                  color: "#70B7FF",
                  items: [
                    "New route quality monitored",
                    "Link quality metrics logged",
                    "Trial data saved to evidence",
                    "System ready for next failure",
                  ],
                },
              ].map(({ phase, color, items }) => (
                <div
                  key={phase}
                  className="rounded-xl border p-5"
                  style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <p className="text-sm font-semibold font-mono uppercase tracking-wider" style={{ color }}>
                      {phase}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#A9B8CA" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: Security ── */}
        {activeTab === 4 && (
          <div id="tab-panel-4" role="tabpanel" aria-labelledby="tab-4">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
              Security Model
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
              {[
                {
                  title: "Packet Integrity",
                  desc: "Incoming frames are checked for valid length, protocol fields, CRC, TTL, and destination before forwarding.",
                },
                {
                  title: "Node Identity",
                  desc: "Every mesh node has a unique ID used for discovery, neighbor tracking, routing, and telemetry attribution.",
                },
                {
                  title: "Duplicate Prevention",
                  desc: "Source IDs and message sequence numbers allow nodes to reject packets they have already processed.",
                },
                {
                  title: "Flight-Control Separation",
                  desc: "PX4 remains responsible for flight behavior while the mesh node transports telemetry and route state.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border p-5"
                  style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22C55E" }} />
                    <p className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                      {title}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#A9B8CA" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── DRONE ROW COMPONENT ── */
function DroneRow({ drones, failure }: { drones: DroneConfig[]; failure: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-0">
      {drones.map((drone, i) => (
        <div key={drone.label} className="flex flex-col sm:flex-row items-center flex-1 w-full">
          {/* Drone card */}
          <div className="flex flex-col items-center w-full sm:max-w-[200px] shrink-0">
            {/* Image */}
            <div
              className="relative w-full rounded-xl overflow-hidden border mb-3"
              style={{
                height: 120,
                borderColor: !drone.online ? "rgba(239,68,68,0.4)" : "rgba(36,145,255,0.2)",
                backgroundColor: "#102640",
              }}
            >
              <img
                src={drone.src}
                alt={`${drone.label} — ${drone.sublabel}`}
                className="w-full h-full object-cover"
                style={{
                  opacity: drone.online ? 0.85 : 0.3,
                  filter: drone.online ? "none" : "grayscale(80%)",
                }}
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(6,20,38,0.5) 100%)" }}
                aria-hidden="true"
              />
              {/* Offline badge */}
              {!drone.online && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="px-2 py-1 rounded text-xs font-mono font-bold"
                    style={{ backgroundColor: "#EF4444", color: "#fff" }}
                    aria-label="Node offline"
                  >
                    Offline
                  </span>
                </div>
              )}
              {/* Status dot */}
              <div
                className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  backgroundColor: drone.online ? "#22C55E" : "#EF4444",
                  borderColor: "#102640",
                }}
              />
            </div>

            {/* Label */}
            <p className="text-xs font-mono font-bold mb-0.5" style={{ color: "#F8FAFC" }}>
              {drone.label}
            </p>
            <p className="text-[10px] font-mono mb-3" style={{ color: drone.online ? "#70B7FF" : "#EF4444" }}>
              {drone.sublabel}
            </p>

            {/* Specs list */}
            <div
              className="w-full rounded-lg border p-3"
              style={{ backgroundColor: "rgba(6,20,38,0.6)", borderColor: "rgba(148,163,184,0.08)" }}
            >
              {(drone.specs ?? []).map((s) => (
                <p
                  key={s}
                  className="text-[10px] font-mono mb-1"
                  style={{ color: drone.online ? "#A9B8CA" : "rgba(169,184,202,0.35)" }}
                >
                  {s}
                </p>
              ))}
            </div>
          </div>

          {/* Connection arrow between nodes */}
          {i < drones.length - 1 && (
            <ConnectionArrow
              failed={
                (failure && drones[i].label === "Drone 3" && drones[i + 1].label === "Drone 2") ||
                (drones[i].label === "Drone 2" && drones[i + 1].label === "Drone 1")
              }
              active={
                !(
                  (failure && drones[i].label === "Drone 3" && drones[i + 1].label === "Drone 2") ||
                  (failure && drones[i].label === "Drone 2" && drones[i + 1].label === "Drone 1")
                )
              }
            />
          )}

          {/* Arrow to Ground Station after last drone */}
          {i === drones.length - 1 && (
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
              {/* Arrow */}
              <div className="flex items-center">
                <div className="h-px w-6 sm:w-10" style={{ backgroundColor: "#2491FF", opacity: 0.7 }} />
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "8px solid rgba(36,145,255,0.7)",
                  }}
                />
              </div>
              {/* Ground Station */}
              <div
                className="rounded-xl border p-3 flex flex-col items-center gap-2 sm:ml-2"
                style={{ backgroundColor: "#102640", borderColor: "rgba(34,197,94,0.3)", minWidth: 110 }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="2" y="14" width="20" height="8" rx="2" />
                  <line x1="12" y1="14" x2="12" y2="8" />
                  <circle cx="12" cy="6" r="3" />
                  <line x1="8" y1="4" x2="5" y2="2" />
                  <line x1="16" y1="4" x2="19" y2="2" />
                </svg>
                <p className="text-[10px] font-mono font-bold text-center" style={{ color: "#22C55E" }}>
                  Ground Station
                </p>
                <p className="text-[9px] font-mono text-center" style={{ color: "#A9B8CA" }}>
                  Command &amp; Telemetry
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ConnectionArrow({ failed, active }: { failed: boolean; active: boolean }) {
  const color = failed ? "#EF4444" : "#2491FF";
  return (
    <div className="flex items-center shrink-0 mx-1 sm:mx-2 my-2 sm:my-0">
      <div
        className="h-px"
        style={{
          width: 36,
          backgroundColor: color,
          opacity: active ? 0.9 : 0.45,
          borderTop: failed ? "none" : "none",
          backgroundImage: failed
            ? `repeating-linear-gradient(to right, ${color} 0, ${color} 4px, transparent 4px, transparent 8px)`
            : "none",
          height: 1.5,
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: `8px solid ${color}`,
          opacity: 0.7,
        }}
      />
    </div>
  );
}

function TechCard({ name, role, color }: { name: string; role: string; color: string }) {
  return (
    <div
      className="rounded-xl border p-5 transition-all"
      style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
        (e.currentTarget as HTMLElement).style.backgroundColor = "#102640";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.12)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "#0B1B30";
      }}
    >
      <div className="w-1 h-4 rounded-full mb-3" style={{ backgroundColor: color }} />
      <p className="text-sm font-semibold mb-1" style={{ color: "#F8FAFC" }}>
        {name}
      </p>
      <p className="text-xs" style={{ color: "#A9B8CA" }}>
        {role}
      </p>
    </div>
  );
}
