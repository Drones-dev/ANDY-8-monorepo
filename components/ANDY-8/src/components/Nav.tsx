import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/architecture", label: "Architecture" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/development", label: "Development" },
  { to: "/testing", label: "Testing" },
  { to: "/team", label: "Team" },
  { to: "/documentation", label: "Documentation" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Top announcement banner ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-8 py-2 text-[10px] font-mono uppercase tracking-widest border-b"
        style={{
          backgroundColor: "rgba(6,20,38,0.98)",
          borderColor: "rgba(148,163,184,0.08)",
          color: "#A9B8CA",
        }}
        aria-label="Project tagline"
      >
        <span>University Senior Project · Autonomy / Networking / Resilience</span>
        <span className="font-bold tracking-[0.3em]" style={{ color: "#F8FAFC" }}>
          THREE NODES. A STRONGER NETWORK. &nbsp;·&nbsp; ADAPT / RELAY / RECOVER
        </span>
        <span style={{ color: "#A9B8CA" }}>Real Systems. Real Problems. Brighter Tomorrows.</span>
      </div>

      {/* ── Main nav ── */}
      <nav
        className="fixed left-0 right-0 z-50 border-b"
        style={{
          top: 0,
          // On large screens, shift down past the announcement bar (32px)
          backgroundColor: "rgba(6,20,38,0.97)",
          borderColor: "rgba(148,163,184,0.10)",
          backdropFilter: "blur(12px)",
        }}
        aria-label="Primary navigation"
      >
        {/* Spacer for announcement bar on lg */}
        <div className="hidden lg:block h-8" aria-hidden="true" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="ANDY 8 home">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold font-mono shrink-0"
              style={{ background: "#2491FF", color: "#061426" }}
              aria-hidden="true"
            >
              A8
            </div>
            <span className="font-extrabold text-base tracking-tight" style={{ color: "#F8FAFC" }}>
              ANDY 8
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {links.map(({ to, label }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="relative px-3 py-1.5 text-sm font-medium rounded transition-colors"
                  style={{ color: active ? "#F8FAFC" : "#A9B8CA" }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "#F8FAFC";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "#A9B8CA";
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: "#2491FF" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="hidden sm:inline text-[10px] font-mono font-medium px-2 py-1 rounded border uppercase tracking-widest"
              style={{
                color: "#70B7FF",
                borderColor: "rgba(36,145,255,0.3)",
                backgroundColor: "rgba(36,145,255,0.08)",
              }}
            >
              Fall 2026 Senior Project
            </span>
            <a
              href="https://github.com/drones-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all border"
              style={{ borderColor: "rgba(148,163,184,0.2)", color: "#A9B8CA" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(36,145,255,0.4)";
                (e.currentTarget as HTMLElement).style.color = "#F8FAFC";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.2)";
                (e.currentTarget as HTMLElement).style.color = "#A9B8CA";
              }}
              aria-label="View on GitHub"
            >
              <GitHubIcon />
              GitHub
            </a>

            {/* Mobile menu button */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded"
              style={{ color: "#A9B8CA" }}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile slide-out ── */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(6,20,38,0.75)" }} />
          <div
            className="absolute top-0 right-0 bottom-0 w-72 flex flex-col"
            style={{ backgroundColor: "#0B1B30", borderLeft: "1px solid rgba(148,163,184,0.10)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-14 flex items-center justify-between px-4 border-b"
              style={{ borderColor: "rgba(148,163,184,0.10)" }}
            >
              <span className="font-bold text-sm" style={{ color: "#F8FAFC" }}>
                ANDY 8
              </span>
              <button
                className="w-11 h-11 flex items-center justify-center"
                style={{ color: "#A9B8CA" }}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <XIcon />
              </button>
            </div>
            <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
              {links.map(({ to, label }) => {
                const active = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded text-sm font-medium"
                    style={{
                      color: active ? "#F8FAFC" : "#A9B8CA",
                      backgroundColor: active ? "rgba(36,145,255,0.10)" : "transparent",
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <span className="w-1 h-4 rounded-full shrink-0" style={{ backgroundColor: "#2491FF" }} />
                    )}
                    {label}
                  </Link>
                );
              })}
              <a
                href="https://github.com/drones-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-3 rounded text-sm font-medium mt-4 border"
                style={{ color: "#A9B8CA", borderColor: "rgba(148,163,184,0.15)" }}
              >
                <GitHubIcon /> GitHub
              </a>
            </nav>
            <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(148,163,184,0.10)" }}>
              <p className="text-xs font-mono" style={{ color: "#A9B8CA" }}>
                Fall 2026 Senior Project
              </p>
              <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(169,184,202,0.5)" }}>
                CS 4850
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
