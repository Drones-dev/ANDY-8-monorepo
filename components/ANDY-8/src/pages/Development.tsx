const phases = [
  {
    id: 1,
    name: "Requirements",
    status: "In Progress",
    color: "#F59E0B",
    pct: 70,
    planned: 88,
    completed: [
      "System requirements drafted",
      "Use case scenarios defined",
      "Risk register initialized",
      "Stakeholder review meeting",
    ],
    remaining: ["Final requirements sign-off", "Requirements traceability matrix", "Baseline document submission"],
    deliverables: ["Project Plan", "Requirements Baseline", "Risk Register"],
    months: ["Sep"],
  },
  {
    id: 2,
    name: "Project Design",
    status: "In Progress",
    color: "#2491FF",
    pct: 40,
    planned: 120,
    completed: ["System architecture defined", "Hardware selection finalized", "Network topology designed"],
    remaining: [
      "Protocol specification",
      "API contract documentation",
      "Design review sign-off",
      "Hardware procurement complete",
    ],
    deliverables: ["System Architecture Doc", "Hardware Inventory", "Message Protocol Spec"],
    months: ["Sep", "Oct"],
  },
  {
    id: 3,
    name: "Development",
    status: "Pending",
    color: "#A9B8CA",
    pct: 0,
    planned: 200,
    completed: [],
    remaining: [
      "Node firmware implementation",
      "Mesh routing algorithm",
      "Ground-station backend",
      "Dashboard frontend",
      "Docker deployment",
    ],
    deliverables: ["Integrated Prototype", "Source Repository", "Configuration Guide"],
    months: ["Oct", "Nov"],
  },
  {
    id: 4,
    name: "Testing",
    status: "Pending",
    color: "#A9B8CA",
    pct: 0,
    planned: 120,
    completed: [],
    remaining: [
      "Unit test suite",
      "Software simulation",
      "Physical node tests",
      "Three-drone validation",
      "Safety checklist sign-off",
    ],
    deliverables: ["Test Plan", "Trial Results", "Safety Checklist", "Defect Log"],
    months: ["Nov", "Dec"],
  },
  {
    id: 5,
    name: "Final Report",
    status: "Pending",
    color: "#A9B8CA",
    pct: 0,
    planned: 64,
    completed: [],
    remaining: ["Final report draft", "Presentation slides", "Demonstration video", "C-Day delivery"],
    deliverables: ["Final Report", "Presentation Deck", "Demo Video"],
    months: ["Dec"],
  },
];

const milestones = [
  {
    id: "M1",
    label: "Milestone 1",
    title: "Requirements Baseline",
    date: "Sep 26, 2026",
    status: "Upcoming",
    color: "#F59E0B",
  },
  {
    id: "M2",
    label: "Milestone 2",
    title: "Integrated Prototype",
    date: "Nov 7, 2026",
    status: "Pending",
    color: "#A9B8CA",
  },
  {
    id: "M3",
    label: "Milestone 3",
    title: "Validation Complete",
    date: "Nov 28, 2026",
    status: "Pending",
    color: "#A9B8CA",
  },
  { id: "CD", label: "C-Day", title: "Final Delivery", date: "Dec 5, 2026", status: "Pending", color: "#2491FF" },
];

const ganttData = [
  { task: "Requirements", start: 0, span: 4, color: "#F59E0B" },
  { task: "Project Design", start: 2, span: 6, color: "#2491FF" },
  { task: "Hardware Procurement", start: 3, span: 3, color: "#70B7FF" },
  { task: "Development", start: 5, span: 7, color: "#22C55E" },
  { task: "Testing", start: 8, span: 5, color: "#A855F7" },
  { task: "Final Report", start: 11, span: 3, color: "#F59E0B" },
];

const ganttMonths = ["Sep 1", "Sep 15", "Oct 1", "Oct 15", "Nov 1", "Nov 15", "Dec 1", "Dec 5"];
const totalCols = 14;

export default function Development({ navOffset }: { navOffset: string }) {
  return (
    <div className={`min-h-screen ${navOffset}`} style={{ backgroundColor: "#061426" }}>
      {/* Header */}
      <div className="border-b bg-grid" style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#70B7FF" }}>
            SDLC Progress
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
            Development Progress
          </h1>
          <p className="text-base" style={{ color: "#A9B8CA" }}>
            Five-phase software development lifecycle — Fall 2026
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Planned Tasks", value: "31" },
            { label: "Estimated Hours", value: "592" },
            { label: "Schedule Status", value: "On Track" },
            { label: "Current Phase", value: "Design" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#A9B8CA" }}>
                {label}
              </p>
              <p className="text-2xl font-bold font-mono" style={{ color: "#F8FAFC" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Phase cards */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#F8FAFC" }}>
          SDLC Phases
        </h2>
        <div className="space-y-4 mb-10">
          {phases.map(({ id, name, status, color, pct, planned, completed, remaining, deliverables }) => (
            <div
              key={id}
              className="rounded-xl border"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <div className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-xs font-mono font-bold"
                      style={{ backgroundColor: `${color}18`, color }}
                    >
                      P{id}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#F8FAFC" }}>
                        {name}
                      </p>
                      <p className="text-[10px] font-mono" style={{ color }}>
                        {status.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs font-mono font-bold" style={{ color }}>
                        {pct}%
                      </p>
                      <p className="text-[10px]" style={{ color: "#A9B8CA" }}>
                        Complete
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-bold" style={{ color: "#F8FAFC" }}>
                        {planned}h
                      </p>
                      <p className="text-[10px]" style={{ color: "#A9B8CA" }}>
                        Planned
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="h-1.5 rounded-full mb-4 overflow-hidden"
                  style={{ backgroundColor: "rgba(148,163,184,0.1)" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Completed */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#22C55E" }}>
                      Completed
                    </p>
                    {completed.length > 0 ? (
                      <ul className="space-y-1">
                        {completed.map((t) => (
                          <li key={t} className="text-xs flex items-start gap-2" style={{ color: "#A9B8CA" }}>
                            <span style={{ color: "#22C55E" }}>✓</span> {t}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs" style={{ color: "rgba(169,184,202,0.4)" }}>
                        Not yet started
                      </p>
                    )}
                  </div>
                  {/* Remaining */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#F59E0B" }}>
                      Remaining
                    </p>
                    <ul className="space-y-1">
                      {remaining.map((t) => (
                        <li key={t} className="text-xs flex items-start gap-2" style={{ color: "#A9B8CA" }}>
                          <span style={{ color: "#F59E0B" }}>○</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Deliverables */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#70B7FF" }}>
                      Deliverables
                    </p>
                    <ul className="space-y-1">
                      {deliverables.map((d) => (
                        <li key={d} className="text-xs flex items-start gap-2" style={{ color: "#A9B8CA" }}>
                          <span style={{ color: "#70B7FF" }}>▸</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#F8FAFC" }}>
          Key Milestones
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {milestones.map(({ id, label, title, date, status, color }) => (
            <div
              key={id}
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center text-[10px] font-mono font-bold"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  {id}
                </div>
                <span className="text-[10px] font-mono" style={{ color }}>
                  {status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#F8FAFC" }}>
                {label}
              </p>
              <p className="text-xs font-medium mb-2" style={{ color: "#A9B8CA" }}>
                {title}
              </p>
              <p className="text-xs font-mono" style={{ color }}>
                {date}
              </p>
            </div>
          ))}
        </div>

        {/* Gantt */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#F8FAFC" }}>
          Schedule — September through December 2026
        </h2>
        <div
          className="rounded-xl border overflow-hidden"
          style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
        >
          <div className="overflow-x-auto">
            <div className="min-w-[640px] p-5">
              {/* Month headers */}
              <div className="flex mb-4 pl-36">
                {ganttMonths.map((m) => (
                  <div key={m} className="flex-1 text-[10px] font-mono text-center" style={{ color: "#A9B8CA" }}>
                    {m}
                  </div>
                ))}
              </div>

              {/* Gantt rows */}
              <div className="space-y-3">
                {ganttData.map(({ task, start, span, color }) => (
                  <div key={task} className="flex items-center gap-3">
                    <span className="text-xs font-medium w-32 shrink-0 text-right" style={{ color: "#A9B8CA" }}>
                      {task}
                    </span>
                    <div
                      className="flex-1 relative h-7 rounded overflow-hidden"
                      style={{ backgroundColor: "rgba(148,163,184,0.06)" }}
                    >
                      {/* Grid lines */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 w-px"
                          style={{ left: `${(i / 8) * 100}%`, backgroundColor: "rgba(148,163,184,0.08)" }}
                        />
                      ))}
                      {/* Bar */}
                      <div
                        className="absolute top-1 bottom-1 rounded"
                        style={{
                          left: `${(start / totalCols) * 100}%`,
                          width: `${(span / totalCols) * 100}%`,
                          backgroundColor: `${color}30`,
                          border: `1px solid ${color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-10" aria-label="Work status summary">
          {[
            {
              title: "Current Work",
              color: "#2491FF",
              items: ["Message protocol specification", "Requirements traceability", "Hardware procurement"],
            },
            {
              title: "Completed Work",
              color: "#22C55E",
              items: ["System architecture", "Network topology", "Initial risk register"],
            },
            {
              title: "Upcoming Work",
              color: "#70B7FF",
              items: ["Node firmware", "Routing simulation", "Integrated prototype"],
            },
            {
              title: "Project Blockers",
              color: "#F59E0B",
              items: ["Outdoor flight-test approval", "Long-lead radio hardware", "Final test-site scheduling"],
            },
          ].map(({ title, color, items }) => (
            <section
              key={title}
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#0B1B30", borderColor: `${color}30` }}
            >
              <h2 className="text-sm font-semibold mb-4" style={{ color }}>
                {title}
              </h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-xs flex gap-2" style={{ color: "#A9B8CA" }}>
                    <span style={{ color }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
