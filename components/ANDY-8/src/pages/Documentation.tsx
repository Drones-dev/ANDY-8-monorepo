import { useState } from "react";

type Doc = {
  title: string;
  desc: string;
  type: string;
  updated: string;
  category: string;
  size: string;
};

const docs: Doc[] = [
  // Planning
  {
    title: "Project Plan",
    desc: "Scope, schedule, resource allocation and team responsibilities for the full project lifecycle.",
    type: "PDF",
    updated: "Sep 12, 2026",
    category: "Planning",
    size: "420 KB",
  },
  {
    title: "Gantt Chart",
    desc: "Visual schedule covering all phases from September through December 2026.",
    type: "XLSX",
    updated: "Sep 10, 2026",
    category: "Planning",
    size: "88 KB",
  },
  {
    title: "Requirements Baseline",
    desc: "Functional and non-functional requirements with acceptance criteria and traceability matrix.",
    type: "PDF",
    updated: "Sep 20, 2026",
    category: "Planning",
    size: "610 KB",
  },
  {
    title: "Risk Register",
    desc: "Identified risks with probability, impact ratings and mitigation strategies.",
    type: "XLSX",
    updated: "Sep 14, 2026",
    category: "Planning",
    size: "72 KB",
  },

  // Engineering
  {
    title: "System Architecture",
    desc: "Network topology, component interfaces, message flows and technology stack documentation.",
    type: "PDF",
    updated: "Sep 22, 2026",
    category: "Engineering",
    size: "1.2 MB",
  },
  {
    title: "Hardware Inventory",
    desc: "Full bill of materials, part numbers, quantities, costs and procurement status.",
    type: "XLSX",
    updated: "Sep 18, 2026",
    category: "Engineering",
    size: "95 KB",
  },
  {
    title: "Message Protocol Spec",
    desc: "Mesh packet fields, CRC validation, TTL handling, duplicate prevention, heartbeat records and route state.",
    type: "PDF",
    updated: "Sep 24, 2026",
    category: "Engineering",
    size: "340 KB",
  },
  {
    title: "Configuration Guide",
    desc: "ESP32-S3 and SX1262 setup, PX4 UART4 telemetry wiring, node identity, radio parameters and ground-station startup.",
    type: "PDF",
    updated: "Oct 5, 2026",
    category: "Engineering",
    size: "280 KB",
  },

  // Testing
  {
    title: "Test Plan",
    desc: "Six-stage testing strategy with entry/exit criteria, pass/fail definitions and evidence requirements.",
    type: "PDF",
    updated: "Oct 1, 2026",
    category: "Testing",
    size: "390 KB",
  },
  {
    title: "Trial Results",
    desc: "Detailed results for all 10 controlled relay-failure trials with packet delivery and recovery metrics.",
    type: "XLSX",
    updated: "Nov 14, 2026",
    category: "Testing",
    size: "210 KB",
  },
  {
    title: "Safety Checklist",
    desc: "Pre-flight, in-flight and post-flight safety checklist completed for each physical test session.",
    type: "PDF",
    updated: "Nov 14, 2026",
    category: "Testing",
    size: "95 KB",
  },
  {
    title: "Defect Log",
    desc: "Known defects with severity, reproduction steps, assigned engineer and resolution status.",
    type: "XLSX",
    updated: "Nov 13, 2026",
    category: "Testing",
    size: "68 KB",
  },

  // Final Delivery
  {
    title: "Final Report",
    desc: "Comprehensive project report covering design, implementation, testing and conclusions.",
    type: "PDF",
    updated: "Dec 4, 2026",
    category: "Final Delivery",
    size: "4.8 MB",
  },
  {
    title: "Presentation Slides",
    desc: "C-Day slide deck covering project goals, system demo, test results and lessons learned.",
    type: "PPTX",
    updated: "Dec 4, 2026",
    category: "Final Delivery",
    size: "22 MB",
  },
  {
    title: "Demonstration Video",
    desc: "Recorded three-drone relay failure and recovery demonstration with narration.",
    type: "MP4",
    updated: "Dec 3, 2026",
    category: "Final Delivery",
    size: "185 MB",
  },
  {
    title: "GitHub Repository",
    desc: "Full source code, firmware, test scripts, Docker configuration and build documentation.",
    type: "REPO",
    updated: "Dec 5, 2026",
    category: "Final Delivery",
    size: "—",
  },
];

const categories = ["All", "Planning", "Engineering", "Testing", "Final Delivery"];

const catColors: Record<string, string> = {
  Planning: "#2491FF",
  Engineering: "#22C55E",
  Testing: "#F59E0B",
  "Final Delivery": "#A855F7",
};

const typeColors: Record<string, string> = {
  PDF: "#EF4444",
  XLSX: "#22C55E",
  PPTX: "#F59E0B",
  MP4: "#A855F7",
  REPO: "#2491FF",
};

export default function Documentation({ navOffset }: { navOffset: string }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? docs : docs.filter((d) => d.category === activeCategory);

  const grouped = categories.slice(1).reduce<Record<string, Doc[]>>((acc, cat) => {
    const items = filtered.filter((d) => d.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className={`min-h-screen ${navOffset}`} style={{ backgroundColor: "#061426" }}>
      {/* Header */}
      <div className="border-b bg-grid" style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#70B7FF" }}>
            Resources
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
            Project Documentation
          </h1>
          <p className="text-base" style={{ color: "#A9B8CA" }}>
            Planning, engineering, testing and final delivery documents — CS 4850 · Fall 2026
          </p>
        </div>

        {/* Category filter */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto pb-px" role="tablist" aria-label="Document category filter">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
                style={{
                  borderColor: activeCategory === cat ? "#2491FF" : "transparent",
                  color: activeCategory === cat ? "#F8FAFC" : "#A9B8CA",
                  backgroundColor: "transparent",
                }}
              >
                {cat}
                {cat !== "All" && (
                  <span
                    className="ml-2 text-[10px] font-mono px-1 rounded"
                    style={{ backgroundColor: "rgba(148,163,184,0.1)", color: "#A9B8CA" }}
                  >
                    {docs.filter((d) => d.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: catColors[cat] }} />
              <h2 className="text-base font-semibold" style={{ color: "#F8FAFC" }}>
                {cat}
              </h2>
              <span className="text-xs font-mono" style={{ color: "#A9B8CA" }}>
                {items.length} documents
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((doc) => (
                <DocCard key={doc.title} doc={doc} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocCard({ doc }: { doc: Doc }) {
  const extension = doc.type === "REPO" ? "" : `.${doc.type.toLowerCase()}`;
  const placeholderPath =
    doc.type === "REPO"
      ? "https://github.com/drones-dev"
      : `./documents/${doc.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}${extension}`;
  return (
    <div
      className="rounded-xl border p-4 flex flex-col gap-3 transition-all group"
      style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,145,255,0.3)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "#102640";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.12)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "#0B1B30";
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0"
          style={{
            backgroundColor: `${typeColors[doc.type] ?? "#2491FF"}18`,
            color: typeColors[doc.type] ?? "#2491FF",
          }}
        >
          {doc.type}
        </span>
        <span className="text-[10px] font-mono" style={{ color: "rgba(169,184,202,0.5)" }}>
          {doc.size}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold mb-1.5" style={{ color: "#F8FAFC" }}>
          {doc.title}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#A9B8CA" }}>
          {doc.desc}
        </p>
      </div>

      <div
        className="flex items-center justify-between pt-2 border-t"
        style={{ borderColor: "rgba(148,163,184,0.08)" }}
      >
        <span className="text-[10px] font-mono" style={{ color: "rgba(169,184,202,0.5)" }}>
          {doc.updated}
        </span>
        <a
          href={placeholderPath}
          target={doc.type === "REPO" ? "_blank" : undefined}
          rel={doc.type === "REPO" ? "noopener noreferrer" : undefined}
          download={doc.type === "REPO" ? undefined : true}
          className="text-xs font-mono transition-colors flex items-center gap-1"
          style={{ color: "#2491FF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#70B7FF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#2491FF")}
          aria-label={`${doc.type === "REPO" ? "View" : "Download"} ${doc.title} (placeholder link)`}
        >
          {doc.type === "REPO" ? "View →" : "Download ↓"}
        </a>
      </div>
    </div>
  );
}
