import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Fingerprint, Moon, Star, AlertCircle } from "lucide-react";
import { checkPin } from "../utils/auth";

const AdminLock = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (checkPin(pin)) {
      onUnlock();
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020806] relative overflow-hidden px-4">
      {/* 🌙 Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#064e3b_0%,_transparent_70%)] opacity-30" />
      
      {/* Islamic Pattern Overlay (Optional: If you have an image/SVG pattern) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/islamic-art.png')` }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: error ? [0, -10, 10, -10, 10, 0] : 0
        }}
        className="relative z-10 w-full max-w-[400px] p-8 sm:p-12  bg-gradient-to-b from-emerald-900/20 to-black/40   backdrop-blur-3xl shadow-[0_0_50px_rgba(6,78,59,0.3)] flex flex-col items-center"
      >
        {/* Islamic Crest */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10  border-emerald-500/30 flex items-center justify-center shadow-inner">
            <Moon className="text-emerald-400 fill-emerald-400/20" size={32} />
          </div>
          <Star className="absolute -top-1 -right-1 text-emerald-300 animate-pulse" size={16} />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white tracking-widest uppercase italic">
            JUMMAH <span className="text-emerald-500 font-black">MASJID</span>
          </h2>
          <p className="font-arabic text-emerald-200/40 text-lg mt-2 tracking-widest">
            بسم الله الرحمن الرحيم
          </p>
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/60 font-bold ml-2">
              Security Pin
            </label>
            <div className="relative group">
              <input
                type="password"
                maxLength={6}
                value={pin}
                autoFocus
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="••••••"
                className={`w-full h-16 rounded-2xl bg-black/60 border-2 text-center text-3xl tracking-[0.4em] text-white transition-all duration-500 outline-none
                  ${error ? "border-red-500/50 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "border-emerald-500/10 focus:border-emerald-500/50 focus:bg-emerald-950/20"}`}
              />
              <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/20 group-focus-within:text-emerald-500 transition-colors" />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                <AlertCircle size={14} /> Incorrect Access Key
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUnlock}
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-[#020806] font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
          >
            Authenticate <ChevronRight size={16} />
          </motion.button>
        </div>

        {/* Decorative Footer */}
        <div className="mt-12 flex flex-col items-center gap-4 opacity-30">
           <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-emerald-500" />
              <Moon size={10} className="text-emerald-500" />
              <div className="h-[1px] w-8 bg-emerald-500" />
           </div>
           <p className="text-[9px] uppercase tracking-[0.4em] text-center text-emerald-100">
             Authorized Access Only
           </p>
        </div>
      </motion.div>
    </div>
  );
};

// Helper Icon for button
const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default AdminLock;