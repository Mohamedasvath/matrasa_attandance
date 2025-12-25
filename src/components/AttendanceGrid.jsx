import { motion } from "framer-motion";
import { useState } from "react";
import AttendanceModal from "./AttendanceModal";

const STATUS = ["", "ح", "غ", "L"];

const AttendanceGrid = ({ students, onEdit }) => {

  // ⬇ Format date as DD:MM:YYYY
  const today = new Date();
  const formattedDate =
    `${String(today.getDate()).padStart(2,"0")}:${String(today.getMonth()+1).padStart(2,"0")}:${today.getFullYear()}`;

  // Days based on current month
  const daysInMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
  const DAYS = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendance");
    return saved ? JSON.parse(saved) : {};
  });

  const [selected, setSelected] = useState(null);

  const toggle = (student, day) => {
    setAttendance((prev) => {
      const current = prev[student.id]?.[day] || "";
      const next = STATUS[(STATUS.indexOf(current) + 1) % STATUS.length];

      const updated = {
        ...prev,
        [student.id]: { ...prev[student.id], [day]: next },
      };

      localStorage.setItem("attendance", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <div className="overflow-x-auto mt-6">

        {/* 📅 Date at Top - FORMAT: DD:MM:YYYY */}
        <div className="text-emerald-300/80 text-lg mb-4 font-semibold">
          📅 {formattedDate}
        </div>

        <div className="min-w-[1000px] space-y-3">
          <div className="flex gap-2 text-white font-bold text-xs">
            <div className="w-40">Student</div>
            {DAYS.map(d => (
              <div key={d} className="w-8 text-center">{d}</div>
            ))}
          </div>

          {students.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{opacity:0,x:-30}}
              animate={{opacity:1,x:0}}
              transition={{delay:i*0.05}}
              className="flex gap-2 bg-black/50 border border-emerald-900 rounded-xl p-2"
            >
              
              {/* click name to edit */}
              <div 
                className="w-40 text-emerald-300 cursor-pointer"
                onClick={() => onEdit(student)}
              >
                ✏ {student.name}
              </div>

              {DAYS.map(day => {
                const val = attendance[student.id]?.[day] || "";

                return (
                  <motion.div
                    key={day}
                    whileTap={{scale:0.85}}
                    onClick={() => toggle(student, day)}
                    onContextMenu={(e)=>{e.preventDefault(); setSelected({student,day});}}

                    className={`w-8 h-8 rounded-md flex items-center justify-center cursor-pointer text-xs font-bold
                      ${
                        val=="P"?"bg-emerald-500 text-black"
                        :val=="A"?"bg-red-600 text-white"
                        :val=="L"?"bg-yellow-400 text-black"
                        :"bg-black border border-emerald-800"
                      }`}
                  >
                    {val}
                  </motion.div>
                );
              })}

            </motion.div>
          ))}
        </div>
      </div>

      {selected && (
        <AttendanceModal 
          student={selected.student}
          day={selected.day}
          onMark={(mark)=>{ toggle(selected.student, selected.day); setSelected(null); }}
          onClose={()=>setSelected(null)}
        />
      )}
    </>
  );
};

export default AttendanceGrid;
