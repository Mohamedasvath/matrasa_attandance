import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  CloudMoon, 
  FileText, 
  RotateCcw, 
  ShieldAlert
} from "lucide-react";
import NamazGrid from "../components/NamazGrid";
import NamazPDF from "../components/NamazPDF";

export default function NamazPage() {
  const [students, setStudents] = useState(() =>
    JSON.parse(localStorage.getItem("namaz_students") || "[]")
  );
  const [newStudentName, setNewStudentName] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [gridKey, setGridKey] = useState(0); // Used to force refresh NamazGrid

  useEffect(() => {
    localStorage.setItem("namaz_students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    const trimmed = newStudentName.trim();
    if (!trimmed || students.includes(trimmed)) return;
    setStudents((prev) => [...prev, trimmed]);
    setNewStudentName("");
  };

  const deleteStudent = (name) => {
    setStudents((prev) => prev.filter((s) => s !== name));
  };

  // 🔥 Clears ONLY attendance logs, keeps students
  const handleResetAttendance = () => {
    localStorage.removeItem("namaz_attendance");
    setGridKey(prev => prev + 1); // Triggers a re-render of the grid
    setShowResetModal(false);
  };

  const now = new Date();
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const year = now.getFullYear();

  return (
    <div className="min-h-screen bg-[#020806] text-white selection:bg-emerald-500/30 overflow-x-hidden relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,_#064e3b_0%,_transparent_60%)] opacity-30 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
        
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-3">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-emerald-500/60 font-bold text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase"
          >
            <CloudMoon size={12} className="animate-pulse" /> Spiritual Tracker
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
          >
            Namaz <span className="text-emerald-400">RECORD</span>
          </motion.h1>
          
          <motion.p className="text-emerald-100/30 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            {month} {year}
          </motion.p>
        </header>

        {/* 🚀 TOP ACTION BAR - Reset & PDF Export */}
        <AnimatePresence>
          {students.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.03] border border-white/5 p-4 sm:p-5 rounded-[2.2rem] backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <FileText size={18} className="text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/80">Management Suite</span>
                  <span className="text-[9px] text-white/20 uppercase tracking-tight">Sync and export monthly data</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Reset Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowResetModal(true)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-400 transition-all text-[11px] font-bold uppercase tracking-widest"
                >
                  <RotateCcw size={14} />
                  Reset
                </motion.button>

                {/* PDF Export */}
                <div className="flex-1 md:flex-none">
                  <NamazPDF students={students} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Student Hero Input */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl mx-auto"
        >
          <div className="relative group p-[1px] rounded-[2.2rem] bg-gradient-to-r from-emerald-500/20 via-white/5 to-emerald-500/20 shadow-2xl">
            <div className="bg-black/90 backdrop-blur-3xl rounded-[calc(2.2rem-1px)] p-1.5 sm:p-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <UserPlus size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/40" />
                <input
                  type="text"
                  placeholder="Student name..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addStudent()}
                  className="w-full pl-14 pr-4 py-3 sm:py-4 bg-transparent border-none focus:ring-0 text-base sm:text-lg placeholder:text-white/10 text-white font-medium"
                />
              </div>
              <button
                onClick={addStudent}
                className="w-full sm:w-auto px-10 py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-[1.6rem] transition-all active:scale-95 text-sm sm:text-base shadow-xl shadow-emerald-500/20"
              >
                Enroll
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="w-full overflow-x-auto custom-scrollbar rounded-3xl bg-white/[0.01] border border-white/5">
          <AnimatePresence mode="wait">
            {students.length > 0 ? (
              <motion.div
                key={gridKey} // Key change triggers re-render after reset
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-1 sm:p-2"
              >
                <NamazGrid
                  students={students}
                  onDeleteStudent={deleteStudent}
                />
              </motion.div>
            ) : (
              <motion.div 
                key="empty-view"
                className="py-32 text-center"
              >
                <p className="text-emerald-100/10 text-[10px] tracking-[0.5em] uppercase font-black">
                  Sanctuary is Empty
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ⚠️ Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-neutral-950 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-500">
                  <ShieldAlert size={32} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-tighter">Clear All Records?</h3>
                  <p className="text-white/40 text-xs leading-relaxed font-medium">
                    This will permanently erase all attendance marks for this month. <span className="text-white/80">Students will not be removed.</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetAttendance}
                    className="w-full py-4 bg-red-500 hover:bg-red-400 text-black font-black rounded-2xl transition-all uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-red-500/20"
                  >
                    Confirm Reset
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowResetModal(false)}
                    className="w-full py-4 bg-white/[0.03] hover:bg-white/[0.08] text-white/60 font-black rounded-2xl border border-white/5 transition-all uppercase tracking-[0.2em] text-[11px]"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}