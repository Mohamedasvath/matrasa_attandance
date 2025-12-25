import { useState } from "react";
import { motion } from "framer-motion";
import { checkPin } from "../utils/auth";

const AdminLock = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = () => {
    if (checkPin(pin)) {
      onUnlock();
    } else {
      setError("❌ Incorrect PIN");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-emerald-950 to-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-80 p-8 rounded-3xl bg-black/40 backdrop-blur-lg border border-emerald-700 shadow-lg shadow-emerald-900/50 flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold text-emerald-300 mb-6 tracking-wide">
          🔐 Admin Access
        </h2>

        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          className="w-full p-3 rounded-xl bg-black/50 border border-emerald-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-3 text-sm font-medium"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlock}
          className="mt-6 w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 shadow-md shadow-emerald-900/30 transition"
        >
          Unlock
        </motion.button>

        <p className="mt-4 text-sm text-emerald-400/60 text-center">
          Only authorized users can access the dashboard
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLock;
