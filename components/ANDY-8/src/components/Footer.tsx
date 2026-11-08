import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t mt-auto" style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold font-mono"
                style={{ background: "#2491FF", color: "#061426" }}
                aria-hidden="true"
              >
                A8
              </div>
              <span className="font-bold text-base" style={{ color: "#F8FAFC" }}>
                ANDY 8
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-1" style={{ color: "#A9B8CA" }}>
              Distributed Mesh Telemetry &amp; Node Hand-off
            </p>
            <p className="text-xs font-mono" style={{ color: "rgba(169,184,202,0.6)" }}>
              CS 4850 Senior Project · Fall 2026
            </p>
            <a
              href="https://github.com/drones-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm transition-colors"
              style={{ color: "#A9B8CA" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#70B7FF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A9B8CA")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              drones-dev
            </a>
          </div>

          {/* Team nav */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#70B7FF" }}>
              Team
            </h3>
            <ul className="space-y-2">
              {["Imani Gad", "Maryam Baban", "Carlos Guerrero", "Harom Andargachew", "Mekai Matia"].map((name) => (
                <li key={name}>
                  <Link
                    to="/team"
                    className="text-sm transition-colors"
                    style={{ color: "#A9B8CA" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F8FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#A9B8CA")}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages nav */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#70B7FF" }}>
              Pages
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/architecture", label: "Architecture" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/development", label: "Development" },
                { to: "/testing", label: "Testing" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm transition-colors"
                    style={{ color: "#A9B8CA" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F8FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#A9B8CA")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Docs nav */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#70B7FF" }}>
              Documentation
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/documentation", label: "Project Plan" },
                { to: "/documentation", label: "System Architecture" },
                { to: "/documentation", label: "Test Plan" },
                { to: "/documentation", label: "Final Report" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition-colors"
                    style={{ color: "#A9B8CA" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F8FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#A9B8CA")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(148,163,184,0.10)" }}
        >
          <p className="text-xs font-mono" style={{ color: "rgba(169,184,202,0.5)" }}>
            © 2026 ANDY 8 RED Team · CS 4850 · All rights reserved
          </p>
          <p className="text-xs font-mono" style={{ color: "rgba(169,184,202,0.5)" }}>
            Distributed Mesh Telemetry &amp; Node Hand-off
          </p>
        </div>
      </div>
    </footer>
  );
}
