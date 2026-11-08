const team = [
  {
    name: "Imani Gad",
    role: "Systems/Integration Engineer",
    focus: "System architecture, hardware integration, project coordination, schedule and risk management.",
    color: "#2491FF",
    photo: "team/imani-gad.png",
  },
  {
    name: "Maryam Baban",
    role: "Project Documentation & Software Developer",
    focus: "Requirements, progress tracking, reports, presentations and coding support.",
    color: "#A855F7",
    photo: "team/maryam-baban.png",
  },
  {
    name: "Carlos Guerrero",
    role: "Mesh Networking & Software Developer",
    focus: "Routing logic, telemetry processing, automated testing and software implementation.",
    color: "#22C55E",
    photo: "team/carlos-guerrero.png",
  },
  {
    name: "Harom Andargachew",
    role: "Ground-Station & Dashboard Developer",
    focus: "Backend services, telemetry visualization, dashboard implementation and integration.",
    color: "#F59E0B",
    photo: "team/harom-andargachew.png",
  },
  {
    name: "Mekai Matia",
    role: "Prototype & Systems Engineer",
    focus: "3D-printed prototypes, mechanical integration, payload mounting and hardware testing.",
    color: "#70B7FF",
    photo: "team/mekai-matia.png",
  },
];

export default function TeamPage({ navOffset }: { navOffset: string }) {
  return (
    <div className={`min-h-screen ${navOffset}`} style={{ backgroundColor: "#061426" }}>
      {/* Header */}
      <div className="border-b bg-grid" style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#70B7FF" }}>
            People
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
            Meet the ANDY-8 RED Team
          </h1>
          <p className="text-base" style={{ color: "#A9B8CA" }}>
            Five engineers · CS 4850 Senior Project · Fall 2026
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(({ name, role, focus, color, photo }) => (
            <div
              key={name}
              className="rounded-xl border overflow-hidden transition-all group"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}40`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(148,163,184,0.12)")}
            >
              {/* Avatar area */}
              <div
                className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: `${color}10` }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${photo}`}
                  alt={`${name} — ANDY-8 RED team member`}
                  className="absolute inset-0 w-full h-full object-contain object-center"
                  style={{ backgroundColor: `${color}10` }}
                  loading="lazy"
                />
                <div
                  className="absolute bottom-3 right-3 w-2 h-2 rounded-full z-10"
                  style={{ backgroundColor: color }}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="font-bold text-base mb-1" style={{ color: "#F8FAFC" }}>
                  {name}
                </p>
                <p className="text-xs font-mono mb-3" style={{ color }}>
                  {role}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#A9B8CA" }}>
                  {focus}
                </p>
              </div>
            </div>
          ))}

          {/* Team stats */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
          >
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#70B7FF" }}>
              Team Stats
            </p>
            <div className="space-y-5">
              {[
                { label: "Team Size", value: "5 Engineers" },
                { label: "Total Planned Hours", value: "592 hrs" },
                { label: "Planned Tasks", value: "31 tasks" },
                { label: "Semester", value: "Fall 2026" },
                { label: "Course", value: "CS 4850" },
                { label: "Repository", value: "drones-dev" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "#A9B8CA" }}>
                    {label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
