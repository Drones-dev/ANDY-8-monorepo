import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const testStages = [
  {
    id: 1,
    name: "Unit Testing",
    status: "In Progress",
    color: "#2491FF",
    desc: "Individual module validation — routing logic, heartbeat timing, HMAC verification.",
  },
  {
    id: 2,
    name: "Software Simulation",
    status: "In Progress",
    color: "#2491FF",
    desc: "Simulated network with configurable failure injection and timing parameters.",
  },
  {
    id: 3,
    name: "Stationary Physical Nodes",
    status: "Pending",
    color: "#F59E0B",
    desc: "Bench test with physical hardware, no flight. Validates real-world radio performance.",
  },
  {
    id: 4,
    name: "One-Drone Integration",
    status: "Pending",
    color: "#A9B8CA",
    desc: "Single airborne node with ground station. Confirms ArduPilot/MAVLink integration.",
  },
  {
    id: 5,
    name: "Two-Drone Integration",
    status: "Pending",
    color: "#A9B8CA",
    desc: "Two-node flight test. Confirms relay behavior and link-quality measurement.",
  },
  {
    id: 6,
    name: "Three-Drone Validation",
    status: "Pending",
    color: "#A9B8CA",
    desc: "Full system validation with controlled obstacle and relay failure trials.",
  },
];

const pdrChartData = [
  { trial: "T01", target: 95, actual: 96 },
  { trial: "T02", target: 95, actual: 94 },
  { trial: "T03", target: 95, actual: 97 },
  { trial: "T04", target: 95, actual: 93 },
  { trial: "T05", target: 95, actual: 98 },
  { trial: "T06", target: 95, actual: 95 },
  { trial: "T07", target: 95, actual: 96 },
  { trial: "T08", target: 95, actual: 91 },
  { trial: "T09", target: 95, actual: 95 },
  { trial: "T10", target: 95, actual: 97 },
];

const recoveryChartData = [
  { trial: "T01", target: 3, actual: 1.9 },
  { trial: "T02", target: 3, actual: 2.1 },
  { trial: "T03", target: 3, actual: 1.7 },
  { trial: "T04", target: 3, actual: 3.4 },
  { trial: "T05", target: 3, actual: 1.8 },
  { trial: "T06", target: 3, actual: 2.3 },
  { trial: "T07", target: 3, actual: 1.6 },
  { trial: "T08", target: 3, actual: 2.9 },
  { trial: "T09", target: 3, actual: 1.8 },
  { trial: "T10", target: 3, actual: 2.2 },
];

const radarData = [
  { metric: "PDR", target: 95, actual: 95.2 },
  { metric: "Recovery", target: 100, actual: 80 },
  { metric: "Latency", target: 85, actual: 88 },
  { metric: "Link Quality", target: 90, actual: 87 },
  { metric: "Battery", target: 75, actual: 70 },
  { metric: "Trial Success", target: 100, actual: 90 },
];

const trials = [
  {
    id: "T01",
    date: "2026-11-08",
    route: "D3→D2→D1",
    failTime: "00:02:14",
    recovTime: "1.9s",
    lost: 3,
    status: "Pass",
  },
  {
    id: "T02",
    date: "2026-11-08",
    route: "D3→D2→D1",
    failTime: "00:03:01",
    recovTime: "2.1s",
    lost: 5,
    status: "Pass",
  },
  {
    id: "T03",
    date: "2026-11-09",
    route: "D3→D2→D1",
    failTime: "00:01:45",
    recovTime: "1.7s",
    lost: 2,
    status: "Pass",
  },
  {
    id: "T04",
    date: "2026-11-09",
    route: "D3→D2→D1",
    failTime: "00:04:33",
    recovTime: "3.4s",
    lost: 18,
    status: "Fail",
  },
  {
    id: "T05",
    date: "2026-11-10",
    route: "D3→D2→D1",
    failTime: "00:02:58",
    recovTime: "1.8s",
    lost: 4,
    status: "Pass",
  },
  {
    id: "T06",
    date: "2026-11-10",
    route: "D3→D2→D1",
    failTime: "00:03:22",
    recovTime: "2.3s",
    lost: 6,
    status: "Pass",
  },
  {
    id: "T07",
    date: "2026-11-12",
    route: "D3→D2→D1",
    failTime: "00:01:55",
    recovTime: "1.6s",
    lost: 2,
    status: "Pass",
  },
  {
    id: "T08",
    date: "2026-11-12",
    route: "D3→D2→D1",
    failTime: "00:03:47",
    recovTime: "2.9s",
    lost: 9,
    status: "Pass",
  },
  {
    id: "T09",
    date: "2026-11-13",
    route: "D3→D2→D1",
    failTime: "00:04:12",
    recovTime: "1.8s",
    lost: 7,
    status: "Pass",
  },
  {
    id: "T10",
    date: "2026-11-14",
    route: "D3→D2→D1",
    failTime: "00:02:36",
    recovTime: "2.2s",
    lost: 4,
    status: "Pass",
  },
];

const ttStyle = {
  contentStyle: { backgroundColor: "#102640", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 8 },
  labelStyle: { color: "#A9B8CA", fontSize: 11, fontFamily: "JetBrains Mono" },
  itemStyle: { fontSize: 11 },
};

export default function Testing({ navOffset }: { navOffset: string }) {
  return (
    <div className={`min-h-screen ${navOffset}`} style={{ backgroundColor: "#061426" }}>
      {/* Header */}
      <div className="border-b bg-grid" style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#70B7FF" }}>
            Validation
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
            Testing and Validation
          </h1>
          <p className="text-base" style={{ color: "#A9B8CA" }}>
            Six-stage test progression from unit tests to three-drone validation
          </p>
          <div
            className="inline-block mt-4 px-3 py-1.5 rounded border text-xs font-mono"
            style={{ borderColor: "rgba(245,158,11,0.3)", color: "#F59E0B", backgroundColor: "rgba(245,158,11,0.06)" }}
          >
            ⚠ Planning and illustrative data — replace with measured results from controlled trials
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Initial targets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Packet Delivery Target", value: "≥ 95%", actual: "Pending measurement" },
            { label: "Recovery Time Target", value: "≤ 3.0s", actual: "Pending measurement" },
            { label: "Controlled Trials", value: "≥ 10", actual: "Planned" },
            { label: "Failure Detection Target", value: "≤ 5.0s", actual: "Pending measurement" },
          ].map(({ label, value, actual }) => (
            <div
              key={label}
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(245,158,11,0.2)" }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#A9B8CA" }}>
                {label}
              </p>
              <p className="text-lg font-bold font-mono mb-1" style={{ color: "#F8FAFC" }}>
                {value}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                <p className="text-xs font-mono" style={{ color: "#F59E0B" }}>
                  {actual}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Test stages */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#F8FAFC" }}>
          Test Stages
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {testStages.map(({ id, name, status, color, desc }) => (
            <div
              key={id}
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  {id}
                </div>
                <p className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                  {name}
                </p>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#A9B8CA" }}>
                {desc}
              </p>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded"
                style={{ backgroundColor: `${color}18`, color }}
              >
                {status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* PDR chart */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
          >
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#F8FAFC" }}>
              Packet Delivery Rate per Trial (Illustrative)
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pdrChartData} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
                  <CartesianGrid stroke="rgba(148,163,184,0.08)" />
                  <XAxis dataKey="trial" tick={{ fill: "#A9B8CA", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <YAxis
                    domain={[80, 100]}
                    tick={{ fill: "#A9B8CA", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    unit="%"
                  />
                  <Tooltip {...ttStyle} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#A9B8CA" }} />
                  <Bar
                    dataKey="target"
                    name="Target (95%)"
                    fill="rgba(36,145,255,0.25)"
                    stroke="#2491FF"
                    strokeWidth={1}
                  />
                  <Bar dataKey="actual" name="Actual" fill="#22C55E" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recovery time chart */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
          >
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#F8FAFC" }}>
              Route Recovery Time per Trial (Illustrative)
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recoveryChartData} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
                  <CartesianGrid stroke="rgba(148,163,184,0.08)" />
                  <XAxis dataKey="trial" tick={{ fill: "#A9B8CA", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <YAxis
                    domain={[0, 5]}
                    tick={{ fill: "#A9B8CA", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    unit="s"
                  />
                  <Tooltip {...ttStyle} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#A9B8CA" }} />
                  <Bar
                    dataKey="target"
                    name="Target (<3s)"
                    fill="rgba(245,158,11,0.2)"
                    stroke="#F59E0B"
                    strokeWidth={1}
                  />
                  <Bar dataKey="actual" name="Actual" fill="#2491FF" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
          >
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#F8FAFC" }}>
              Performance Profile (Targets vs. Illustrative)
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(148,163,184,0.15)" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: "#A9B8CA", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke="#2491FF"
                    fill="#2491FF"
                    fillOpacity={0.1}
                    strokeDasharray="4 2"
                  />
                  <Radar name="Actual" dataKey="actual" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#A9B8CA" }} />
                  <Tooltip {...ttStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trial success summary */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
          >
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#F8FAFC" }}>
              Trial Outcomes (Illustrative)
            </h3>
            <div className="space-y-3">
              {[
                { label: "Trials Passed", value: 9, total: 10, color: "#22C55E" },
                { label: "Recovery &lt; 3s", value: 9, total: 10, color: "#2491FF" },
                { label: "PDR ≥ 95%", value: 8, total: 10, color: "#70B7FF" },
                { label: "Zero Safety Defects", value: 10, total: 10, color: "#22C55E" },
              ].map(({ label, value, total, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span
                      className="text-xs"
                      style={{ color: "#A9B8CA" }}
                      dangerouslySetInnerHTML={{ __html: label }}
                    />
                    <span className="text-xs font-mono font-bold" style={{ color }}>
                      {value}/{total}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(148,163,184,0.1)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(value / total) * 100}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trial results table */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#F8FAFC" }}>
          Trial Evidence Matrix (Illustrative)
        </h2>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(148,163,184,0.12)" }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]" aria-label="Trial results">
              <thead>
                <tr style={{ backgroundColor: "#0B1B30", borderBottom: "1px solid rgba(148,163,184,0.12)" }}>
                  {[
                    "Trial ID",
                    "Date",
                    "Initial Route",
                    "Failure Time",
                    "Recovery Time",
                    "Pkts Lost",
                    "Status",
                    "Evidence",
                  ].map((h) => (
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
                {trials.map((t) => (
                  <tr
                    key={t.id}
                    style={{ borderBottom: "1px solid rgba(148,163,184,0.06)", backgroundColor: "#061426" }}
                  >
                    <td className="px-4 py-3 text-xs font-mono font-bold" style={{ color: "#70B7FF" }}>
                      {t.id}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#A9B8CA" }}>
                      {t.date}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#F8FAFC" }}>
                      {t.route}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#F8FAFC" }}>
                      {t.failTime}
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-mono"
                      style={{ color: t.recovTime > "3.0s" ? "#EF4444" : "#22C55E" }}
                    >
                      {t.recovTime}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: t.lost > 10 ? "#EF4444" : "#F8FAFC" }}>
                      {t.lost}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                        style={{
                          color: t.status === "Pass" ? "#22C55E" : "#EF4444",
                          borderColor: t.status === "Pass" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
                          backgroundColor: t.status === "Pass" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                        }}
                      >
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#2491FF" }}>
                      <button className="underline underline-offset-2" aria-label={`View evidence for trial ${t.id}`}>
                        View Log
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
