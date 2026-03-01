import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Sparkles, Calendar as CalendarIcon, LayoutDashboard, RotateCcw, ShieldAlert } from "lucide-react";

import AttendanceGrid from "../components/AttendanceGrid";
import StudentForm from "../components/StudentForm";
import PDFButton from "../components/PDFButton";

const Dashboard = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [editStudent, setEditStudent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handlers
  const addStudent = (name) => {
    const id = Date.now();
    const updated = [...students, { id, name }];
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  };

  const updateStudent = (name) => {
    const updated = students.map((s) =>
      s.id === editStudent.id ? { ...s, name } : s
    );
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    setEditStudent(null);
  };

  const deleteStudent = (id) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    setEditStudent(null);
  };

  // 🔥 RESET DATA HANDLER
  const resetAttendanceData = () => {
    localStorage.removeItem("attendance"); // Only clears attendance marks
    window.location.reload(); // Refresh to clear state
  };

  const weekday = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const day = currentDate.getDate();
  const month = currentDate.toLocaleDateString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="relative min-h-screen bg-[#020806] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,_#064e3b_0%,_transparent_60%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-6 py-10 max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-white font-bold text-[10px] tracking-[0.4em] uppercase"
          >
            <LayoutDashboard size={14} /> Management Portal
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 uppercase">
              Madrasa <span className="text-emerald-400">Attendance</span>
            </h1>
            <p className="font-arabic text-xl sm:text-2xl text-white tracking-widest py-2">
              بسم الله الرحمن الرحيم
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-emerald-100/40"
          >
            <CalendarIcon size={12} className="text-emerald-500/50" />
            {weekday}, {day} {month} {year}
          </motion.div>
        </header>

        {/* 🚀 ACTION & STATS BAR - Optimized for Laptop */}
        <AnimatePresence>
          {students.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Users size={20} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Total Strength</p>
                  <p className="text-2xl font-bold text-white leading-none">{students.length} Students</p>
                </div>
              </div>

              {/* Action Buttons: Laptop-la side-by-side varum */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowResetModal(true)}
                  className="flex items-center justify-center gap-2 h-14 w-full sm:w-auto sm:px-8 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-400 transition-all text-[11px] font-bold uppercase tracking-widest"
                >
                  <RotateCcw size={16} /> Reset Data
                </button>
                <div className="w-full sm:w-auto">
                  <PDFButton students={students} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Section - Fixed Width for Laptop */}
        <div className="max-w-2xl mx-auto">
          <StudentForm
            onAdd={addStudent}
            onUpdate={updateStudent}
            onDelete={() => deleteStudent(editStudent?.id)}
            editStudent={editStudent}
            onCancel={() => setEditStudent(null)}
          />
        </div>

        {/* Main Grid Area */}
        <div className="w-full pt-4">
          {students.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white/[0.01] border border-dashed border-white/5 rounded-[3rem]"
            >
              <div className="inline-flex p-5 rounded-full bg-emerald-500/5 mb-4">
                <Sparkles size={32} className="text-emerald-500/20" />
              </div>
              <p className="text-white text-xs tracking-[0.3em] uppercase font-bold italic">
                Portal is ready for first entry
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-[2.5rem] overflow-hidden bg-black/20 border border-white/5 shadow-2xl"
            >
              <AttendanceGrid
                students={students}
                onEdit={(student) => setEditStudent(student)}
              />
            </motion.div>
          )}
        </div>

        {/* Footer Citation */}
        <footer className="text-center py-10 space-y-6">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mx-auto" />
          <p className="text-emerald-300/30 font-arabic text-2xl tracking-widest">
            وَقُلْ رَبِّ زِدْنِي عِلْمًا
          </p>
        </footer>
      </div>

      {/* ⚠️ Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowResetModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-neutral-900 border border-white/10 p-8 rounded-[2.5rem] text-center space-y-6 shadow-3xl"
            >
              <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 border border-red-500/20">
                <ShieldAlert size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-tighter text-white">Clear All Records?</h3>
                <p className="text-white/40 text-[11px] leading-relaxed">Attendance entries will be deleted. Students list will not be affected.</p>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={resetAttendanceData}
                  className="w-full py-4 bg-red-500 text-black font-black rounded-2xl uppercase text-[11px] tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-400 transition-all"
                >
                  Confirm Reset
                </button>
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="w-full py-4 bg-white/5 text-white/60 font-bold rounded-2xl uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;