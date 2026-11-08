import { Link } from "react-router-dom";

const HERO_BG = "https://images.unsplash.com/photo-1533983272060-edb6f56af634?w=1920&h=1080&fit=crop&auto=format&q=80";
const DRONE_A = "https://images.unsplash.com/photo-1621506683092-a4a47fc01dbd?w=320&h=200&fit=crop&auto=format&q=80";
const DRONE_B = "https://images.unsplash.com/photo-1679136578198-539e835445be?w=320&h=200&fit=crop&auto=format&q=80";
const DRONE_C = "https://images.unsplash.com/photo-1761893425281-09ad46325079?w=320&h=200&fit=crop&auto=format&q=80";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="3" fill="#2491FF" />
        <circle cx="5" cy="8" r="2" fill="#70B7FF" />
        <circle cx="23" cy="8" r="2" fill="#70B7FF" />
        <circle cx="5" cy="20" r="2" fill="#70B7FF" />
        <circle cx="23" cy="20" r="2" fill="#70B7FF" />
        <line x1="7" y1="9" x2="12" y2="13" stroke="#2491FF" strokeWidth="1.2" />
        <line x1="21" y1="9" x2="16" y2="13" stroke="#2491FF" strokeWidth="1.2" />
        <line x1="7" y1="19" x2="12" y2="15" stroke="#2491FF" strokeWidth="1.2" />
        <line x1="21" y1="19" x2="16" y2="15" stroke="#2491FF" strokeWidth="1.2" />
      </svg>
    ),
    title: "Mesh Networking",
    desc: "Dynamic multi-hop communication",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M6 14 Q14 6 22 14 Q14 22 6 14Z" stroke="#2491FF" strokeWidth="1.4" fill="none" />
        <circle cx="14" cy="14" r="3" fill="#2491FF" />
      </svg>
    ),
    title: "Automatic Hand-off",
    desc: "Maintains connection during node changes",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="18" width="3" height="6" rx="1" fill="#2491FF" />
        <rect x="9" y="14" width="3" height="10" rx="1" fill="#70B7FF" />
        <rect x="14" y="10" width="3" height="14" rx="1" fill="#2491FF" />
        <rect x="19" y="6" width="3" height="18" rx="1" fill="#70B7FF" />
        <path d="M5.5 18 L10.5 14 L15.5 10 L20.5 6" stroke="#22C55E" strokeWidth="1.4" />
      </svg>
    ),
    title: "Real-time Telemetry",
    desc: "Low-latency, reliable data exchange",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M6 18 L10 12 L14 15 L18 8 L22 10" stroke="#2491FF" strokeWidth="1.4" fill="none" />
        <circle cx="10" cy="12" r="2" fill="#22C55E" />
        <circle cx="18" cy="8" r="2" fill="#22C55E" />
        <polyline points="19,14 22,14 22,10" stroke="#70B7FF" strokeWidth="1.4" fill="none" />
      </svg>
    ),
    title: "Simulation First",
    desc: "Validate failure recovery before flight testing",
  },
];

const statusItems = [
  { label: "Current Phase", value: "Requirements & Design" },
  { label: "Team Size", value: "5 Engineers" },
  { label: "Planned Effort", value: "592 Hours" },
  { label: "Packet Delivery Target", value: "≥ 95%" },
  { label: "Route Recovery Target", value: "≤ 3 Seconds" },
  { label: "Failure Detection Target", value: "≤ 5 Seconds" },
  { label: "Semester", value: "Fall 2026" },
  { label: "Project Status", value: "In Development" },
];

export default function Home({ navOffset }: { navOffset: string }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#061426" }}>
      {/* ── HERO ── */}
      <section className={`relative overflow-hidden ${navOffset}`} style={{ minHeight: "100vh" }} aria-label="Hero">
        {/* Background */}
        <img
          src={HERO_BG}
          alt="Mountain silhouette at dusk — mission terrain backdrop"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.35 }}
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,20,38,0.65) 0%, rgba(6,20,38,0.25) 40%, rgba(6,20,38,0.8) 85%, #061426 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(6,20,38,0.9) 0%, rgba(6,20,38,0.1) 55%, rgba(6,20,38,0.2) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="bg-grid absolute inset-0 opacity-25" aria-hidden="true" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-[calc(100vh-88px)] items-center py-16 lg:py-0">
            {/* Copy */}
            <div className="z-10">
              <p
                className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-5"
                style={{ color: "#70B7FF" }}
              >
                University Senior Project
              </p>
              <h1
                className="text-8xl sm:text-9xl font-black tracking-tight leading-none mb-4"
                style={{ color: "#F8FAFC" }}
              >
                ANDY 8
              </h1>
              <p className="text-xl sm:text-2xl font-semibold mb-5" style={{ color: "#70B7FF" }}>
                Distributed Mesh Telemetry &amp; Node Hand-off
              </p>
              <p className="text-base leading-relaxed max-w-md mb-10" style={{ color: "#A9B8CA" }}>
                A resilient three-drone network that maintains telemetry through dynamic node hand-off, ensuring
                continuous communication in changing conditions.
              </p>

              <div className="flex flex-wrap gap-3 mb-14">
                <Link
                  to="/architecture"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all"
                  style={{ backgroundColor: "#2491FF", color: "#061426" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#70B7FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2491FF")}
                >
                  View Architecture <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://github.com/drones-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all border"
                  style={{
                    borderColor: "rgba(248,250,252,0.25)",
                    color: "#F8FAFC",
                    backgroundColor: "rgba(248,250,252,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,145,255,0.5)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(36,145,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,250,252,0.25)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(248,250,252,0.06)";
                  }}
                >
                  <GithubIcon /> View GitHub
                </a>
              </div>

              <div style={{ borderLeft: "2px solid rgba(36,145,255,0.4)", paddingLeft: 16 }}>
                <p className="text-sm font-medium leading-loose" style={{ color: "#A9B8CA" }}>
                  Multiple Nodes. Continuous Connection.
                  <br />
                  <span style={{ color: "#F8FAFC", fontWeight: 600 }}>A More Resilient Tomorrow.</span>
                </p>
              </div>
            </div>

            {/* Drone formation */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <DroneFormation />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        className="border-t"
        style={{ backgroundColor: "#061426", borderColor: "rgba(148,163,184,0.08)" }}
        aria-label="Key features"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className="flex flex-col items-start gap-3 px-6 py-8 transition-colors"
                style={{ borderLeft: i > 0 ? "1px solid rgba(148,163,184,0.08)" : "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(36,145,255,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div>{icon}</div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#F8FAFC" }}>
                    {title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#A9B8CA" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATUS STRIP ── */}
      <div
        className="border-t border-b"
        style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.08)" }}
        aria-label="Project status"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap">
            {statusItems.map(({ label, value }, i) => (
              <div
                key={label}
                className="flex-1 min-w-[140px] px-6 py-5"
                style={{ borderLeft: i > 0 ? "1px solid rgba(148,163,184,0.08)" : "none" }}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "#A9B8CA" }}>
                  {label}
                </p>
                <p className="text-sm font-bold" style={{ color: "#F8FAFC" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MISSION SCENARIO ── */}
      <section className="py-20 lg:py-28" aria-label="Mission scenario">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "#70B7FF" }}>
                Mission Scenario
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
                How the Network Operates
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#A9B8CA" }}>
                Three drones form a distributed telemetry mesh with a fourth ESP32-S3/SX1262 node connected to the
                ground-station laptop. When the primary relay goes offline, the network detects the failure, invalidates
                the route, and restores telemetry through a viable alternate path without manual reconfiguration.
              </p>
            </div>
            <div className="space-y-3">
              {[
                {
                  node: "D1",
                  label: "Drone 1 — Gateway",
                  text: "Remains near the ground station, bridging the mesh to the command interface.",
                  color: "#22C55E",
                },
                {
                  node: "D2",
                  label: "Drone 2 — Primary Relay",
                  text: "Relays messages between Drone 1 and Drone 3 under normal operating conditions.",
                  color: "#2491FF",
                },
                {
                  node: "D3",
                  label: "Drone 3 — Remote Node",
                  text: "Operates behind a controlled obstruction; cannot reach the ground station directly.",
                  color: "#70B7FF",
                },
                {
                  node: "↺",
                  label: "Automatic Recovery",
                  text: "When Drone 2 fails, the mesh detects the lost route and selects an alternate viable path within seconds.",
                  color: "#F59E0B",
                },
              ].map(({ node, label, text, color }) => (
                <div
                  key={label}
                  className="flex gap-4 p-4 rounded-xl border"
                  style={{ borderColor: "rgba(148,163,184,0.08)", backgroundColor: "#0B1B30" }}
                >
                  <div
                    className="w-9 h-9 rounded flex items-center justify-center text-xs font-mono font-bold shrink-0"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {node}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#F8FAFC" }}>
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#A9B8CA" }}>
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DroneFormation() {
  return (
    <div
      className="relative w-full max-w-xl"
      style={{ height: 460 }}
      aria-label="Drone network formation: Drone 3 (Remote Node), Drone 2 (Relay), and Drone 1 (Gateway) connected by telemetry links to Ground Station"
      role="img"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 460 460"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <marker id="arrowH" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#2491FF" />
          </marker>
          <filter id="glow1">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Glow */}
        <path
          d="M75,105 Q190,255 300,205"
          stroke="#2491FF"
          strokeWidth="5"
          fill="none"
          opacity="0.08"
          filter="url(#glow1)"
        />
        <path
          d="M175,178 Q260,255 300,205"
          stroke="#2491FF"
          strokeWidth="5"
          fill="none"
          opacity="0.08"
          filter="url(#glow1)"
        />
        <path
          d="M300,205 Q375,320 390,380"
          stroke="#2491FF"
          strokeWidth="5"
          fill="none"
          opacity="0.08"
          filter="url(#glow1)"
        />

        {/* D3 → D2 */}
        <path
          d="M75,105 Q190,255 300,205"
          stroke="#2491FF"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 5"
          opacity="0.9"
          markerEnd="url(#arrowH)"
        >
          <animate attributeName="stroke-dashoffset" from="13" to="0" dur="1.4s" repeatCount="indefinite" />
        </path>
        {/* D2 → D1 */}
        <path
          d="M175,178 Q260,255 300,205"
          stroke="#2491FF"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 5"
          opacity="0.9"
          markerEnd="url(#arrowH)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="13"
            to="0"
            dur="1.4s"
            repeatCount="indefinite"
            begin="0.45s"
          />
        </path>
        {/* D1 → GS */}
        <path
          d="M300,205 Q375,320 390,380"
          stroke="#2491FF"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 5"
          opacity="0.9"
          markerEnd="url(#arrowH)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="13"
            to="0"
            dur="1.4s"
            repeatCount="indefinite"
            begin="0.9s"
          />
        </path>

        <text x="148" y="174" fill="#70B7FF" fontSize="9" fontFamily="JetBrains Mono" opacity="0.8">
          92% LQ
        </text>
        <text x="228" y="224" fill="#70B7FF" fontSize="9" fontFamily="JetBrains Mono" opacity="0.8">
          88% LQ
        </text>
      </svg>

      <DroneNode
        src={DRONE_C}
        alt="Drone 3 — Remote Node"
        label="Drone 3"
        sublabel="Remote Node"
        style={{ top: 50, left: 10 }}
        dotColor="#22C55E"
        imgSize={110}
      />
      <DroneNode
        src={DRONE_B}
        alt="Drone 2 — Primary Relay"
        label="Drone 2"
        sublabel="Relay"
        style={{ top: 128, left: 138 }}
        dotColor="#22C55E"
        imgSize={100}
      />
      <DroneNode
        src={DRONE_A}
        alt="Drone 1 — Gateway"
        label="Drone 1"
        sublabel="Gateway"
        style={{ top: 158, left: 265 }}
        dotColor="#22C55E"
        imgSize={110}
      />

      <div className="absolute flex flex-col items-center" style={{ bottom: 30, right: 20 }}>
        <div
          className="rounded-xl border px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor: "rgba(11,27,48,0.95)", borderColor: "rgba(34,197,94,0.35)" }}
        >
          <GroundStationIcon />
          <div>
            <p className="text-[10px] font-mono font-bold" style={{ color: "#22C55E" }}>
              Ground Station
            </p>
            <p className="text-[9px] font-mono" style={{ color: "#A9B8CA" }}>
              Command &amp; Telemetry
            </p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ backgroundColor: "#22C55E" }} />
        </div>
      </div>
    </div>
  );
}

function DroneNode({
  src,
  alt,
  label,
  sublabel,
  style,
  dotColor,
  imgSize,
}: {
  src: string;
  alt: string;
  label: string;
  sublabel: string;
  style: React.CSSProperties;
  dotColor: string;
  imgSize: number;
}) {
  return (
    <div className="absolute flex flex-col items-center gap-1" style={style}>
      <div
        className="relative rounded-xl overflow-hidden border"
        style={{
          width: imgSize,
          height: Math.round(imgSize * 0.62),
          borderColor: "rgba(36,145,255,0.22)",
          backgroundColor: "rgba(6,20,38,0.7)",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.82 }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(6,20,38,0.6) 100%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-label="Node online"
        />
      </div>
      <p className="text-[10px] font-mono font-bold" style={{ color: "#F8FAFC" }}>
        {label}
      </p>
      <p className="text-[9px] font-mono" style={{ color: "#A9B8CA" }}>
        {sublabel}
      </p>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function GroundStationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="12" y1="14" x2="12" y2="8" />
      <circle cx="12" cy="6" r="3" />
      <line x1="8" y1="4" x2="5" y2="2" />
      <line x1="16" y1="4" x2="19" y2="2" />
    </svg>
  );
}
