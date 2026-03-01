import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Check, X, Clock, Info } from "lucide-react";

const PRAYERS = ["F", "Z", "A", "M", "I"]; 
const STATUS = ["", "✓", "✗", "L"];

export default function NamazAttendance() {
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem("namaz_students") || "[]"));
  const [attendance, setAttendance] = useState(() => JSON.parse(localStorage.getItem("namaz_records") || "{}"));
  const [inputValue, setInputValue] = useState("");

  const addStudent = () => {
    if (!inputValue.trim()) return;
    const updated = [...students, inputValue.trim()];
    setStudents(updated);
    localStorage.setItem("namaz_students", JSON.stringify(updated));
    setInputValue("");
  };

  const toggle = (student, day, prayer) => {
    setAttendance(prev => {
      const current = prev[student]?.[day]?.[prayer] || "";
      const next = STATUS[(STATUS.indexOf(current) + 1) % STATUS.length];
      const updated = {
        ...prev,
        [student]: {
          ...prev[student],
          [day]: {
            ...(prev[student]?.[day] || {}),
            [prayer]: next
          }
        }
      };
      localStorage.setItem("namaz_records", JSON.stringify(updated));
      return updated;
    });
  };

  const now = new Date();
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const year = now.getFullYear();
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
  const days = [...Array(lastDay)].map((_, i) => i + 1);

  return (
    <div className="min-h-screen pb-20">
      {/* Page Title */}
      <div className="mb-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-light tracking-[0.2em] text-emerald-400 uppercase"
        >
          Salāt Records
        </motion.h2>
        <p className="text-emerald-100/30 text-xs mt-2 uppercase tracking-widest">{month} {year}</p>
      </div>

      {/* Sleek Input Bar */}
      <div className="max-w-md mx-auto mb-12 relative group">
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex p-1 bg-emerald-950/40 border border-white/10 rounded-full backdrop-blur-xl">
          <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Student Name..." 
            className="flex-grow bg-transparent px-6 py-2 outline-none text-sm placeholder:text-white"
          />
          <button 
            onClick={addStudent}
            className="bg-emerald-500 hover:bg-emerald-400 text-[#020806] p-2 rounded-full transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="sticky left-0 z-20 bg-[#06120e] p-5 text-left border-r border-white/5 w-48">
                  <div className="flex items-center gap-2 text-emerald-400/70 text-[10px] tracking-widest uppercase font-bold">
                    <Users size={14} /> Student
                  </div>
                </th>
                {days.map(d => (
                  <th key={d} className="p-4 border-r border-white/5 min-w-[60px]">
                    <span className="text-xs font-medium text-emerald-100/40">{d}</span>
                    <div className="flex justify-between mt-2 px-1 text-[8px] tracking-tighter text-emerald-500/30 font-bold">
                      <span>F</span><span>Z</span><span>A</span><span>M</span><span>I</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {students.map((st, i) => (
                  <motion.tr 
                    key={st}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-emerald-500/[0.03] transition-colors"
                  >
                    <td className="sticky left-0 z-20 bg-[#06120e] p-4 border-r border-white/5">
                      <span className="text-sm font-medium text-emerald-50 capitalize tracking-wide">{st}</span>
                    </td>

                    {days.map(day => (
                      <td key={day} className="p-2 border-r border-white/5">
                        <div className="flex gap-1 justify-center">
                          {PRAYERS.map((p, idx) => {
                            let val = attendance[st]?.[day]?.[p] || "";
                            return (
                              <motion.div
                                key={idx}
                                whileTap={{ scale: 0.8 }}
                                onClick={() => toggle(st, day, p)}
                                className={`w-2.5 h-6 rounded-[4px] cursor-pointer transition-all duration-300 flex items-center justify-center text-[8px]
                                  ${val === "✓" ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)] text-black font-black" : 
                                    val === "✗" ? "bg-red-500 text-white" : 
                                    val === "L" ? "bg-yellow-400 text-black" : 
                                    "bg-white/5 hover:bg-white/10"}`}
                              >
                                {val === "✓" ? <Check size={8} strokeWidth={4} /> : 
                                 val === "✗" ? <X size={8} strokeWidth={4} /> : 
                                 val === "L" ? <Clock size={8} strokeWidth={4} /> : ""}
                              </motion.div>
                            );
                          })}
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-emerald-100/20">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Present</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Absent</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400" /> Late</div>
      </div>
      
      <p className="text-center text-emerald-400/40 mt-16 font-arabic text-lg tracking-widest">
        وَأَقِمِ ٱلصَّلَوٰةَ لِذِكْرِى۠
      </p>
    </div>
  );
}