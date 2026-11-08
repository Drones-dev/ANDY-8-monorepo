import { useState } from "react";
import { Download, RadioTower, RotateCcw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const sidebarLinks = [
  { id: "overview", label: "Overview" },
  { id: "topology", label: "Live Topology" },
  { id: "health", label: "Node Health" },
  { id: "telemetry", label: "Telemetry" },
  { id: "results", label: "Test Results" },
  { id: "log", label: "Event Log" },
  { id: "settings", label: "Settings" },
];

const nodeStates = {
  normal: [
    {
      id: "D1",
      label: "Drone 1 — Gateway",
      status: "Online" as const,
      battery: 64,
      linkQuality: 88,
      lastPacket: "0.3s ago",
    },
    {
      id: "D2",
      label: "Drone 2 — Relay",
      status: "Online" as const,
      battery: 71,
      linkQuality: 91,
      lastPacket: "0.2s ago",
    },
    {
      id: "D3",
      label: "Drone 3 — Remote Node",
      status: "Online" as const,
      battery: 78,
      linkQuality: 92,
      lastPacket: "0.2s ago",
    },
  ],
  failure: [
    {
      id: "D1",
      label: "Drone 1 — Gateway",
      status: "Online" as const,
      battery: 64,
      linkQuality: 88,
      lastPacket: "0.3s ago",
    },
    {
      id: "D2",
      label: "Drone 2 — Relay",
      status: "Offline" as const,
      battery: 12,
      linkQuality: 0,
      lastPacket: "5.6s ago",
    },
    {
      id: "D3",
      label: "Drone 3 — Remote Node",
      status: "Online" as const,
      battery: 78,
      linkQuality: 92,
      lastPacket: "0.2s ago",
    },
  ],
};

const metrics = [
  { label: "Packet Delivery", value: "95%+", sub: "Target met", color: "#22C55E" },
  { label: "Recovery Target", value: "<3s", sub: "Avg 1.8s actual", color: "#22C55E" },
  { label: "Controlled Trials", value: "10", sub: "Completed", color: "#2491FF" },
  { label: "Successful Recoveries", value: "9/10", sub: "90% success rate", color: "#22C55E" },
  { label: "Median Latency", value: "42 ms", sub: "End-to-end", color: "#70B7FF" },
  { label: "Active Links", value: "2", sub: "D3→D1, D1→GS", color: "#2491FF" },
];

const pdrData = [
  { t: "0:00", pdr: 97 },
  { t: "0:30", pdr: 96 },
  { t: "1:00", pdr: 98 },
  { t: "1:30", pdr: 97 },
  { t: "2:00", pdr: 96 },
  { t: "2:30", pdr: 95 },
  { t: "3:00", pdr: 97 },
  { t: "3:30", pdr: 94 },
  { t: "4:00", pdr: 96 },
  { t: "4:12", pdr: 72 },
  { t: "4:13", pdr: 41 },
  { t: "4:14", pdr: 18 },
  { t: "4:15", pdr: 88 },
  { t: "4:18", pdr: 94 },
  { t: "4:30", pdr: 96 },
  { t: "5:00", pdr: 97 },
  { t: "5:30", pdr: 95 },
  { t: "6:00", pdr: 96 },
];

const recoveryEvents = [
  { time: "00:04:12", event: "Relay node stopped responding", type: "FAILURE" as const },
  { time: "00:04:13", event: "Failed route invalidated", type: "WARNING" as const },
  { time: "00:04:14", event: "Alternate route selected (D3→D1→GS)", type: "INFO" as const },
  { time: "00:04:15", event: "Telemetry stream restored", type: "RECOVERY" as const },
  { time: "00:04:18", event: "System stable — recovery time: 1.8s", type: "INFO" as const },
];

const eventLog = [
  {
    id: "E001",
    time: "06:04:18",
    node: "D1",
    type: "INFO" as const,
    message: "Heartbeat received — all links nominal",
  },
  {
    id: "E002",
    time: "06:04:15",
    node: "D3",
    type: "RECOVERY" as const,
    message: "Telemetry stream restored via alternate route",
  },
  { id: "E003", time: "06:04:14", node: "GS", type: "INFO" as const, message: "Alternate route D3→D1→GS committed" },
  { id: "E004", time: "06:04:13", node: "D3", type: "WARNING" as const, message: "Primary route D3→D2→D1 expired" },
  {
    id: "E005",
    time: "06:04:12",
    node: "D2",
    type: "FAILURE" as const,
    message: "Node D2 heartbeat timeout — 5.6s no response",
  },
  {
    id: "E006",
    time: "06:03:55",
    node: "D2",
    type: "WARNING" as const,
    message: "Link quality degraded — 34% and falling",
  },
  {
    id: "E007",
    time: "06:02:10",
    node: "D1",
    type: "INFO" as const,
    message: "Route table updated — all 3 nodes visible",
  },
  {
    id: "E008",
    time: "06:01:00",
    node: "GS",
    type: "INFO" as const,
    message: "Trial #09 initiated — recording enabled",
  },
];

type EventType = "INFO" | "WARNING" | "FAILURE" | "RECOVERY";

const eventColors: Record<EventType, string> = {
  INFO: "#2491FF",
  WARNING: "#F59E0B",
  FAILURE: "#EF4444",
  RECOVERY: "#22C55E",
};

const eventBg: Record<EventType, string> = {
  INFO: "rgba(36,145,255,0.08)",
  WARNING: "rgba(245,158,11,0.08)",
  FAILURE: "rgba(239,68,68,0.08)",
  RECOVERY: "rgba(34,197,94,0.08)",
};

export default function Dashboard({ navOffset }: { navOffset: string }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nodeFilter, setNodeFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | EventType>("ALL");
  const [exportConfirm, setExportConfirm] = useState(false);
  const [scenario, setScenario] = useState<"normal" | "failure">("failure");
  const [trial, setTrial] = useState("09");
  const nodes = nodeStates[scenario];

  const exportReport = () => {
    const rows = [
      ["ANDY 8 Demonstration Trial", `#${trial}`],
      ["Scenario", scenario === "failure" ? "Drone 2 offline — route recovered" : "All nodes online"],
      ["Active route", scenario === "failure" ? "D3 → D1 → Ground Station" : "D3 → D2 → D1 → Ground Station"],
      ["Data notice", "Demonstration data — not live flight telemetry"],
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `andy-8-trial-${trial}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    setExportConfirm(false);
  };

  const filteredLog = eventLog.filter((e) => {
    const nodeMatch = nodeFilter === "ALL" || e.node === nodeFilter;
    const typeMatch = typeFilter === "ALL" || e.type === typeFilter;
    return nodeMatch && typeMatch;
  });

  return (
    <div className={`${navOffset} min-h-screen flex`} style={{ backgroundColor: "#061426" }}>
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: "rgba(6,20,38,0.7)" }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-14 bottom-0 left-0 z-30 w-52 flex flex-col border-r transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          backgroundColor: "#0B1B30",
          borderColor: "rgba(148,163,184,0.12)",
        }}
        aria-label="Dashboard navigation"
      >
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: "rgba(148,163,184,0.12)" }}
        >
          <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#70B7FF" }}>
            Mission Control
          </p>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A9B8CA" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-3">
          {sidebarLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveSection(id);
                setSidebarOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded text-sm font-medium mb-1 transition-all flex items-center gap-2"
              style={{
                backgroundColor: activeSection === id ? "rgba(36,145,255,0.12)" : "transparent",
                color: activeSection === id ? "#F8FAFC" : "#A9B8CA",
              }}
              aria-current={activeSection === id ? "page" : undefined}
            >
              {activeSection === id && (
                <span className="w-1 h-4 rounded-full shrink-0" style={{ backgroundColor: "#2491FF" }} />
              )}
              {label}
            </button>
          ))}
        </nav>

        {/* Status footer */}
        <div className="p-3 border-t" style={{ borderColor: "rgba(148,163,184,0.12)" }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full animate-blink" style={{ backgroundColor: "#22C55E" }} />
            <p className="text-[10px] font-mono" style={{ color: "#22C55E" }}>
              SIMULATED SCENARIO
            </p>
          </div>
          <p className="text-[10px] font-mono" style={{ color: "rgba(169,184,202,0.5)" }}>
            Demo data — Trial #{trial}
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div
          className="border-b px-4 sm:px-6 py-3 flex items-center justify-between"
          style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded"
              style={{ color: "#A9B8CA" }}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open dashboard navigation"
              aria-expanded={sidebarOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="font-semibold text-sm" style={{ color: "#F8FAFC" }}>
              {sidebarLinks.find((l) => l.id === activeSection)?.label ?? "Dashboard"}
            </h1>
            <span
              className="hidden md:inline text-[10px] font-mono px-2 py-1 rounded border"
              style={{
                color: "#F59E0B",
                borderColor: "rgba(245,158,11,0.3)",
                backgroundColor: "rgba(245,158,11,0.08)",
              }}
            >
              DEMONSTRATION DATA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <label className="hidden sm:flex items-center gap-2 text-xs font-mono" style={{ color: "#A9B8CA" }}>
              TRIAL
              <select
                value={trial}
                onChange={(event) => setTrial(event.target.value)}
                className="rounded border px-2 py-1"
                style={{ backgroundColor: "#061426", borderColor: "rgba(148,163,184,0.2)", color: "#F8FAFC" }}
                aria-label="Select demonstration trial"
              >
                {["07", "08", "09", "10"].map((value) => (
                  <option key={value} value={value}>
                    #{value}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={() => setExportConfirm(true)}
              className="px-3 py-1.5 text-xs font-mono rounded border transition-all"
              style={{
                borderColor: "rgba(36,145,255,0.3)",
                color: "#70B7FF",
                backgroundColor: "rgba(36,145,255,0.06)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(36,145,255,0.14)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(36,145,255,0.06)")}
            >
              <Download size={13} aria-hidden="true" className="inline mr-1.5" />
              Export Trial Report
            </button>
          </div>
        </div>

        {/* Export confirm toast */}
        {exportConfirm && (
          <div
            className="fixed bottom-6 right-6 z-50 rounded-xl border px-5 py-4 shadow-xl"
            style={{ backgroundColor: "#102640", borderColor: "rgba(34,197,94,0.3)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "#F8FAFC" }}>
              Export Report
            </p>
            <p className="text-xs mb-3" style={{ color: "#A9B8CA" }}>
              Trial #{trial} demonstration report will be downloaded as CSV.
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 text-xs font-mono rounded"
                style={{ backgroundColor: "#22C55E", color: "#061426" }}
                onClick={exportReport}
              >
                Confirm Export
              </button>
              <button
                className="px-3 py-1.5 text-xs font-mono rounded border"
                style={{ borderColor: "rgba(148,163,184,0.2)", color: "#A9B8CA" }}
                onClick={() => setExportConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6">
          <section
            className="mb-6 rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              backgroundColor: scenario === "failure" ? "rgba(239,68,68,0.06)" : "rgba(34,197,94,0.06)",
              borderColor: scenario === "failure" ? "rgba(239,68,68,0.28)" : "rgba(34,197,94,0.28)",
            }}
            aria-live="polite"
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                {scenario === "failure" ? "Relay failure recovered" : "All nodes online"}
              </p>
              <p className="text-xs mt-1" style={{ color: "#A9B8CA" }}>
                {scenario === "failure"
                  ? "D2 is offline. Telemetry is flowing over the alternate D3 → D1 → Ground Station route."
                  : "Normal route active: D3 → D2 → D1 → Ground Station."}
              </p>
            </div>
            <button
              onClick={() => setScenario(scenario === "normal" ? "failure" : "normal")}
              className="shrink-0 px-4 py-2 rounded text-xs font-mono font-semibold border transition-colors inline-flex items-center gap-2"
              style={{
                color: scenario === "normal" ? "#F8FAFC" : "#061426",
                backgroundColor: scenario === "normal" ? "rgba(239,68,68,0.16)" : "#70B7FF",
                borderColor: scenario === "normal" ? "rgba(239,68,68,0.45)" : "#70B7FF",
              }}
            >
              {scenario === "normal" ? (
                <RadioTower size={14} aria-hidden="true" />
              ) : (
                <RotateCcw size={14} aria-hidden="true" />
              )}
              {scenario === "normal" ? "TRIGGER RELAY FAILURE" : "RESET ALL NODES"}
            </button>
          </section>
          {/* Overview / Node Health */}
          {(activeSection === "overview" || activeSection === "health") && (
            <>
              {/* Key Metrics */}
              {activeSection === "overview" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {metrics.map(({ label, value, sub, color }) => (
                    <div
                      key={label}
                      className="rounded-xl border p-4"
                      style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
                    >
                      <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#A9B8CA" }}>
                        {label}
                      </p>
                      <p className="text-2xl font-bold font-mono" style={{ color }}>
                        {value}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "rgba(169,184,202,0.7)" }}>
                        {sub}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Node Health Cards */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {nodes.map(({ id, label, status, battery, linkQuality, lastPacket }) => {
                  const online = status === "Online";
                  return (
                    <div
                      key={id}
                      className="rounded-xl border p-5"
                      style={{
                        backgroundColor: "#0B1B30",
                        borderColor: online ? "rgba(148,163,184,0.12)" : "rgba(239,68,68,0.3)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-8 h-8 rounded flex items-center justify-center text-xs font-mono font-bold"
                              style={{
                                backgroundColor: online ? "rgba(36,145,255,0.12)" : "rgba(239,68,68,0.12)",
                                color: online ? "#70B7FF" : "#EF4444",
                              }}
                            >
                              {id}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: online ? "#22C55E" : "#EF4444" }}
                              />
                              <span className="text-xs font-mono" style={{ color: online ? "#22C55E" : "#EF4444" }}>
                                {status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-medium" style={{ color: "#F8FAFC" }}>
                            {label}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <MetricBar
                          label="Battery"
                          value={battery}
                          color={battery < 20 ? "#EF4444" : battery < 40 ? "#F59E0B" : "#22C55E"}
                          unit="%"
                        />
                        <MetricBar
                          label="Link Quality"
                          value={linkQuality}
                          color={linkQuality === 0 ? "#EF4444" : linkQuality < 60 ? "#F59E0B" : "#2491FF"}
                          unit="%"
                        />
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono" style={{ color: "#A9B8CA" }}>
                            LAST PACKET
                          </span>
                          <span className="text-[10px] font-mono" style={{ color: online ? "#F8FAFC" : "#EF4444" }}>
                            {lastPacket}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Live Topology */}
          {activeSection === "topology" && (
            <div
              className="rounded-xl border p-6"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <h2 className="text-base font-semibold mb-4" style={{ color: "#F8FAFC" }}>
                Live Network Topology
              </h2>
              <DashboardTopology scenario={scenario} />
              <div className="mt-4 flex flex-wrap gap-4">
                <LegendLine color="#2491FF" dash={false} label="Active Route" />
                <LegendLine color="#2491FF" dash={true} label="Alternate Route" />
                <LegendLine color="#EF4444" dash={true} label="Failed Route" />
                <LegendDot color="#22C55E" label="Healthy" />
                <LegendDot color="#EF4444" label="Offline" />
              </div>
            </div>
          )}

          {/* Telemetry — PDR Chart */}
          {(activeSection === "telemetry" || activeSection === "overview") && (
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                    Packet Delivery Rate
                  </h2>
                  <p className="text-xs font-mono mt-0.5" style={{ color: "#A9B8CA" }}>
                    Trial #{trial} — 6-minute window
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 p-1 rounded border"
                  style={{ borderColor: "rgba(148,163,184,0.12)", backgroundColor: "#102640" }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: scenario === "failure" ? "#F59E0B" : "#22C55E" }}
                  />
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: scenario === "failure" ? "#F59E0B" : "#22C55E" }}
                  >
                    {scenario === "failure" ? "Relay failure @ 04:12" : "Nominal route"}
                  </span>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pdrData} margin={{ top: 4, right: 8, bottom: 0, left: -8 }}>
                    <CartesianGrid stroke="rgba(148,163,184,0.08)" />
                    <XAxis dataKey="t" tick={{ fill: "#A9B8CA", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "#A9B8CA", fontSize: 10, fontFamily: "JetBrains Mono" }}
                      unit="%"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#102640",
                        border: "1px solid rgba(148,163,184,0.2)",
                        borderRadius: 8,
                      }}
                      labelStyle={{ color: "#A9B8CA", fontSize: 11, fontFamily: "JetBrains Mono" }}
                      itemStyle={{ color: "#2491FF", fontSize: 11 }}
                    />
                    {scenario === "failure" && (
                      <ReferenceLine
                        x="4:12"
                        stroke="#EF4444"
                        strokeDasharray="4 2"
                        label={{ value: "Failure", fill: "#EF4444", fontSize: 9 }}
                      />
                    )}
                    {scenario === "failure" && (
                      <ReferenceLine
                        x="4:15"
                        stroke="#22C55E"
                        strokeDasharray="4 2"
                        label={{ value: "Recovery", fill: "#22C55E", fontSize: 9 }}
                      />
                    )}
                    <Line type="monotone" dataKey="pdr" stroke="#2491FF" strokeWidth={2} dot={false} name="PDR" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recovery timeline */}
          {(activeSection === "overview" || activeSection === "results") && (
            <div
              className="mt-6 rounded-xl border p-5"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <h2 className="text-sm font-semibold mb-4" style={{ color: "#F8FAFC" }}>
                Route Recovery Timeline — Trial #{trial}
              </h2>
              <div className="space-y-2">
                {recoveryEvents.map(({ time, event, type }) => (
                  <div
                    key={time}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                    style={{ borderColor: `${eventColors[type]}25`, backgroundColor: eventBg[type] }}
                  >
                    <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "#A9B8CA" }}>
                      {time}
                    </span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0"
                      style={{
                        color: eventColors[type],
                        borderColor: `${eventColors[type]}40`,
                        backgroundColor: `${eventColors[type]}12`,
                      }}
                    >
                      {type}
                    </span>
                    <span className="text-xs" style={{ color: "#F8FAFC" }}>
                      {event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Log */}
          {activeSection === "log" && (
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono" style={{ color: "#A9B8CA" }}>
                    NODE
                  </label>
                  <select
                    className="text-xs font-mono rounded px-2 py-1 border outline-none"
                    style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.2)", color: "#F8FAFC" }}
                    value={nodeFilter}
                    onChange={(e) => setNodeFilter(e.target.value)}
                    aria-label="Filter by node"
                  >
                    {["ALL", "D1", "D2", "D3", "GS"].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono" style={{ color: "#A9B8CA" }}>
                    TYPE
                  </label>
                  <select
                    className="text-xs font-mono rounded px-2 py-1 border outline-none"
                    style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.2)", color: "#F8FAFC" }}
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as "ALL" | EventType)}
                    aria-label="Filter by event type"
                  >
                    {["ALL", "INFO", "WARNING", "FAILURE", "RECOVERY"].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(148,163,184,0.12)" }}>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[540px]" aria-label="Event log">
                    <thead>
                      <tr style={{ backgroundColor: "#0B1B30", borderBottom: "1px solid rgba(148,163,184,0.12)" }}>
                        {["ID", "Time", "Node", "Type", "Message"].map((h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest"
                            style={{ color: "#A9B8CA" }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLog.map((e) => (
                        <tr
                          key={e.id}
                          style={{ borderBottom: "1px solid rgba(148,163,184,0.06)", backgroundColor: "#061426" }}
                        >
                          <td className="px-4 py-3 text-xs font-mono" style={{ color: "#A9B8CA" }}>
                            {e.id}
                          </td>
                          <td className="px-4 py-3 text-xs font-mono" style={{ color: "#F8FAFC" }}>
                            {e.time}
                          </td>
                          <td className="px-4 py-3 text-xs font-mono font-bold" style={{ color: "#70B7FF" }}>
                            {e.node}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                              style={{
                                color: eventColors[e.type],
                                borderColor: `${eventColors[e.type]}40`,
                                backgroundColor: `${eventColors[e.type]}12`,
                              }}
                            >
                              {e.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs" style={{ color: "#A9B8CA" }}>
                            {e.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings stub */}
          {activeSection === "settings" && (
            <div
              className="rounded-xl border p-8 text-center max-w-sm mx-auto"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(36,145,255,0.12)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2491FF" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: "#F8FAFC" }}>
                Dashboard Settings
              </p>
              <p className="text-xs" style={{ color: "#A9B8CA" }}>
                Configuration panel available in the integrated deployment. This is a frontend demonstration.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, color, unit }: { label: string; value: number; color: string; unit: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] font-mono" style={{ color: "#A9B8CA" }}>
          {label}
        </span>
        <span className="text-[10px] font-mono font-bold" style={{ color }}>
          {value}
          {unit}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(148,163,184,0.1)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function DashboardTopology({ scenario }: { scenario: "normal" | "failure" }) {
  const failed = scenario === "failure";
  return (
    <svg
      viewBox="0 0 520 200"
      className="w-full"
      role="img"
      aria-label={
        failed
          ? "Live topology: D3 connected to D1 by an alternate route while D2 is offline"
          : "Live topology: D3 connected through D2 and D1 to the ground station"
      }
    >
      <defs>
        <marker id="da" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#2491FF" />
        </marker>
      </defs>

      {/* Active route */}
      <line
        x1="80"
        y1="100"
        x2="300"
        y2="100"
        stroke="#2491FF"
        strokeWidth="2"
        strokeDasharray={failed ? "6 3" : undefined}
      >
        <animate attributeName="stroke-dashoffset" from="9" to="0" dur="0.9s" repeatCount="indefinite" />
      </line>
      {/* D1→GS */}
      <line x1="344" y1="100" x2="440" y2="100" stroke="#2491FF" strokeWidth="2" markerEnd="url(#da)">
        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" begin="0.4s" />
      </line>
      {failed && (
        <>
          <line
            x1="80"
            y1="100"
            x2="180"
            y2="100"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <line
            x1="224"
            y1="100"
            x2="300"
            y2="100"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.5"
          />
        </>
      )}

      {/* D3 */}
      <circle cx="54" cy="100" r="22" fill="#102640" stroke="#2491FF" strokeWidth="1.5" />
      <text x="54" y="97" textAnchor="middle" fill="#70B7FF" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700">
        D3
      </text>
      <circle cx="54" cy="108" r="4" fill="#22C55E" />
      <text x="54" y="130" textAnchor="middle" fill="#A9B8CA" fontSize="9">
        Remote Node
      </text>

      {/* D2 relay */}
      <circle
        cx="202"
        cy="100"
        r="22"
        fill="#102640"
        stroke={failed ? "#EF4444" : "#2491FF"}
        strokeWidth="1.5"
        strokeDasharray={failed ? "4 2" : undefined}
      />
      <text
        x="202"
        y="97"
        textAnchor="middle"
        fill={failed ? "#EF4444" : "#70B7FF"}
        fontSize="11"
        fontFamily="JetBrains Mono"
        fontWeight="700"
      >
        D2
      </text>
      <circle cx="202" cy="108" r="4" fill={failed ? "#EF4444" : "#22C55E"} />
      <text x="202" y="130" textAnchor="middle" fill="#A9B8CA" fontSize="9">
        {failed ? "OFFLINE" : "Relay"}
      </text>

      {/* D1 */}
      <circle cx="322" cy="100" r="22" fill="#102640" stroke="#2491FF" strokeWidth="1.5" />
      <text
        x="322"
        y="97"
        textAnchor="middle"
        fill="#70B7FF"
        fontSize="11"
        fontFamily="JetBrains Mono"
        fontWeight="700"
      >
        D1
      </text>
      <circle cx="322" cy="108" r="4" fill="#22C55E" />
      <text x="322" y="130" textAnchor="middle" fill="#A9B8CA" fontSize="9">
        Gateway
      </text>

      {/* GS */}
      <rect x="452" y="84" width="58" height="32" rx="4" fill="#102640" stroke="#22C55E" strokeWidth="1.5" />
      <text
        x="481"
        y="97"
        textAnchor="middle"
        fill="#22C55E"
        fontSize="10"
        fontFamily="JetBrains Mono"
        fontWeight="600"
      >
        GS
      </text>
      <text x="481" y="109" textAnchor="middle" fill="#A9B8CA" fontSize="8">
        Ground Stn
      </text>
    </svg>
  );
}

function LegendLine({ color, dash, label }: { color: string; dash: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="24" height="8">
        <line x1="0" y1="4" x2="24" y2="4" stroke={color} strokeWidth="2" strokeDasharray={dash ? "4 2" : "none"} />
      </svg>
      <span className="text-xs" style={{ color: "#A9B8CA" }}>
        {label}
      </span>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-xs" style={{ color: "#A9B8CA" }}>
        {label}
      </span>
    </div>
  );
}
