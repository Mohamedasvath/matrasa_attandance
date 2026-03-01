import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, AlertCircle } from "lucide-react";
import { checkPin } from "../utils/auth";

const AdminLock = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (checkPin(pin)) {
      onUnlock();
    } else {
      setError(true);
      setPin(""); // Reset pin on error
      // Auto-reset error state after 2 seconds for animation re-triggering
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020806] relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#064e3b_0%,_transparent_70%)] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: error ? [0, -10, 10, -10, 10, 0] : 0 // Shake animation on error
        }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[360px] p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center"
      >
        {/* Security Icon Container */}
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <ShieldCheck className="text-emerald-400" size={32} strokeWidth={1.5} />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-white tracking-tight uppercase tracking-[0.2em]">
            Admin <span className="text-emerald-500">Vault</span>
          </h2>
          <p className="text-[10px] text-emerald-100/30 mt-2 uppercase tracking-[0.3em] font-bold">
            Authorized Entry Only
          </p>
        </div>

        <div className="w-full space-y-4">
          <div className="relative group">
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="••••••"
              className={`w-full p-4 rounded-2xl bg-black/40 border text-center text-2xl tracking-[0.5em] text-white transition-all duration-300 outline-none
                ${error ? "border-red-500/50 bg-red-500/5" : "border-white/5 focus:border-emerald-500/40 focus:bg-black/60"}`}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-emerald-500/40 transition-colors">
              <Lock size={16} />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest"
              >
                <AlertCircle size={14} /> Access Denied
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgb(16 185 129)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUnlock}
            className="w-full py-4 rounded-2xl bg-emerald-600 text-[#020806] font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/10 transition-all mt-4"
          >
            Authenticate
          </motion.button>
        </div>

        <div className="mt-10 space-y-3 opacity-20">
           <div className="h-[1px] w-20 bg-emerald-500 mx-auto" />
           <p className="text-[9px] uppercase tracking-[0.4em] text-center leading-relaxed">
             Encrypted Protocol <br/> Madrasa Secure Node
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLock;