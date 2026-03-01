import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, CloudMoon, FileText } from "lucide-react";
import NamazGrid from "../components/NamazGrid";
import NamazPDF from "../components/NamazPDF";

export default function NamazPage() {
  const [students, setStudents] = useState(() =>
    JSON.parse(localStorage.getItem("namaz_students") || "[]")
  );
  const [newStudentName, setNewStudentName] = useState("");

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

  const now = new Date();
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const year = now.getFullYear();

  return (
    <div className="min-h-screen bg-[#020806] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Ambience - Reduced opacity for mobile performance */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,_#064e3b_0%,_transparent_60%)] opacity-30 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
        
        {/* Header Section - Smaller text on mobile */}
        <header className="flex flex-col items-center text-center space-y-3">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-emerald-500/60 font-bold text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase"
          >
            <CloudMoon size={12} /> Spiritual Tracker
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

        {/* 🚀 TOP ACTION BAR - Optimized for Mobile */}
        <AnimatePresence>
          {students.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.03] border border-white/5 p-4 sm:p-5 rounded-[2rem] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FileText size={16} className="text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Report Ready</span>
                  <span className="text-[9px] text-white/20 uppercase tracking-tight">Generate monthly summary</span>
                </div>
              </div>
              
              <div className="w-full sm:w-auto">
                {/* Ensure your NamazPDF component is responsive inside */}
                <NamazPDF students={students} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Student Hero Input - Full width on mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl mx-auto"
        >
          <div className="relative group p-[1px] rounded-[2rem] bg-gradient-to-r from-emerald-500/20 via-white/5 to-emerald-500/20 shadow-2xl">
            <div className="bg-black/80 backdrop-blur-3xl rounded-[calc(2rem-1px)] p-1.5 sm:p-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40" />
                <input
                  type="text"
                  placeholder="Student name..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addStudent()}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-transparent border-none focus:ring-0 text-base sm:text-lg placeholder:text-white/10"
                />
              </div>
              <button
                onClick={addStudent}
                className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-[1.4rem] transition-all active:scale-95 text-sm sm:text-base"
              >
                Enroll
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area - Added horizontal scroll safety */}
        <div className="w-full overflow-x-auto custom-scrollbar rounded-xl">
          <AnimatePresence mode="wait">
            {students.length > 0 ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pb-4"
              >
                <NamazGrid
                  students={students}
                  onDeleteStudent={deleteStudent}
                />
              </motion.div>
            ) : (
              <motion.div 
                key="empty-view"
                className="py-20 text-center"
              >
                <p className="text-emerald-100/10 text-[10px] tracking-[0.4em] uppercase font-bold">
                  No Students Enrolled
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Decoration */}
        <footer className="flex justify-center pt-6 pb-4">
           <div className="h-[1px] w-16 bg-white/5" />
        </footer>
      </div>
    </div>
  );
}