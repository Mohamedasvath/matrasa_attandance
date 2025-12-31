import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLock from "./components/AdminLock";
import Dashboard from "./pages/Dashboard";
import NamazPage from "./pages/NamazPage";

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        {!isUnlocked ? (
          <AdminLock onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <div>

            {/* 🔥 Top Nav Updated with Active Highlight */}
            <nav className="flex gap-8 p-4 font-medium text-white justify-center 
              backdrop-blur-xl bg-black/40 border-b border-emerald-700 shadow-lg">

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `pb-1 transition-all duration-300 hover:text-emerald-300 
                  ${isActive ? "text-emerald-400 border-b-2 border-emerald-400" : "text-white"}`
                }
              >
                Attendance
              </NavLink>

              <NavLink
                to="/namaz"
                className={({ isActive }) =>
                  `pb-1 transition-all duration-300 hover:text-emerald-300 
                  ${isActive ? "text-emerald-400 border-b-2 border-emerald-400" : "text-white"}`
                }
              >
                Namaz Attendance
              </NavLink>
            </nav>

            {/* Page Routes */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/namaz" element={<NamazPage />} />
            </Routes>

          </div>
        )}
      </motion.div>
    </Router>
  );
};

export default App;
