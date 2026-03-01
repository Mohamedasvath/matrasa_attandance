import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Moon, Sparkles, Loader2 } from "lucide-react";
import AdminLock from "./components/AdminLock";
import Dashboard from "./pages/Dashboard";
import NamazPage from "./pages/NamazPage";

// --- Loading Component ---
const SplashLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-[#020806] flex flex-col items-center justify-center gap-6"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
      <div className="relative w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        <Moon size={40} className="text-emerald-400" />
      </div>
    </motion.div>

    <div className="text-center space-y-2">
      <motion.h1 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-black tracking-[0.3em] text-white uppercase"
      >
        MAKKAH <span className="text-emerald-500">MASJID</span>
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 text-emerald-500/40 text-[10px] font-bold tracking-widest uppercase"
      >
        <Loader2 size={12} className="animate-spin" />
        Initialising Portal
      </motion.div>
    </div>
  </motion.div>
);

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Loading logic
  useEffect(() => {
    if (isUnlocked) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2200); // 2.2 seconds loading time
      return () => clearTimeout(timer);
    }
  }, [isUnlocked]);

  return (
    <Router>
      <div className="min-h-screen bg-[#020806] text-white selection:bg-emerald-500/30">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div key="lock">
              <AdminLock onUnlock={() => setIsUnlocked(true)} />
            </motion.div>
          ) : isLoading ? (
            <SplashLoader key="loader" />
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex flex-col min-h-screen"
            >
              {/* 📍 TOP BAR */}
              <header className="sticky top-0 z-50 w-full bg-[#020806]/80 backdrop-blur-xl border-b border-emerald-500/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      <Sparkles size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-xl font-black tracking-[0.15em] uppercase text-white">
                        MAKKAH <span className="text-emerald-500">MASJID</span>
                      </h1>
                      {/* <p className="text-[8px] tracking-[0.3em] uppercase text-emerald-500/50 font-bold leading-none">
                        Management Portal
                      </p> */}
                    </div>
                  </div>
                </div>
              </header>

              {/* 🔥 NAVIGATION BAR */}
              <nav className="sticky top-[73px] z-40 flex justify-center gap-2 p-2 bg-black/40 backdrop-blur-md border-b border-white/5">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300
                    ${isActive 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "text-white/40 hover:text-white"}`
                  }
                >
                  <LayoutDashboard size={14} /> Attendance
                </NavLink>

                <NavLink
                  to="/namaz"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300
                    ${isActive 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "text-white/40 hover:text-white"}`
                  }
                >
                  <Moon size={14} /> Namaz
                </NavLink>
              </nav>

              {/* Page Content */}
              <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 pb-20">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/namaz" element={<NamazPage />} />
                  </Routes>
                </AnimatePresence>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;