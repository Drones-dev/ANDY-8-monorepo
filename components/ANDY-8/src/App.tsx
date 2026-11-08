import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Architecture from "./pages/Architecture";
import Dashboard from "./pages/Dashboard";
import Development from "./pages/Development";
import Testing from "./pages/Testing";
import TeamPage from "./pages/Team";
import Documentation from "./pages/Documentation";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Nav height: 56px (mobile) or 56+32=88px (desktop, incl. announcement bar)
// Pages need appropriate top padding to clear the fixed nav
const NAV_OFFSET = "pt-14 lg:pt-[88px]";

function AppShell() {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard";

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#061426" }}>
      <ScrollToTop />
      <Nav />
      <main id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Routes location={pathname}>
              <Route path="/" element={<Home navOffset={NAV_OFFSET} />} />
              <Route path="/architecture" element={<Architecture navOffset={NAV_OFFSET} />} />
              <Route path="/dashboard" element={<Dashboard navOffset={NAV_OFFSET} />} />
              <Route path="/development" element={<Development navOffset={NAV_OFFSET} />} />
              <Route path="/testing" element={<Testing navOffset={NAV_OFFSET} />} />
              <Route path="/team" element={<TeamPage navOffset={NAV_OFFSET} />} />
              <Route path="/documentation" element={<Documentation navOffset={NAV_OFFSET} />} />
              <Route path="*" element={<NotFound navOffset={NAV_OFFSET} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

function NotFound({ navOffset }: { navOffset: string }) {
  return (
    <div className={`flex-1 flex flex-col items-center justify-center py-32 px-4 ${navOffset}`}>
      <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#70B7FF" }}>
        404
      </p>
      <h1 className="text-3xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
        Page Not Found
      </h1>
      <p className="text-sm mb-8" style={{ color: "#A9B8CA" }}>
        The route you requested does not exist.
      </p>
      <a
        href="/"
        className="px-4 py-2 rounded text-sm font-medium"
        style={{ backgroundColor: "#2491FF", color: "#061426" }}
      >
        Return Home
      </a>
    </div>
  );
}
