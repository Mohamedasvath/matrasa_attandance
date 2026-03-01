import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PRAYERS = ["F", "D", "A", "M", "I", "T", "Fst"];

const NAMAZ_STATUS = ["", "✓", "✗", "L"];
const YES_NO_STATUS = ["", "Y", "N"];

export default function NamazGrid({ students, onDeleteStudent }) {
  const [attendance, setAttendance] = useState({});
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("namaz_attendance") || "{}");
    setAttendance(saved);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const toggle = (name, day, prayer) => {
    setAttendance(prev => {

      const current = prev[name]?.[day]?.[prayer] || "";

      // If Taraweeh or Fasting → Y/N
      const isYesNo = prayer === "T" || prayer === "Fst";
      const statusArray = isYesNo ? YES_NO_STATUS : NAMAZ_STATUS;

      const next = statusArray[(statusArray.indexOf(current) + 1) % statusArray.length];

      const updated = {
        ...prev,
        [name]: {
          ...prev[name],
          [day]: {
            ...(prev[name]?.[day] || {}),
            [prayer]: next,
          },
        },
      };

      localStorage.setItem("namaz_attendance", JSON.stringify(updated));
      return updated;
    });
  };

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const formattedDate =
    today.getDate().toString().padStart(2, "0") +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getFullYear();

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">

      <div className="text-center text-emerald-300 font-bold text-xl 
      bg-black/40 border border-emerald-700 px-5 py-2 rounded-xl shadow-lg w-fit mx-auto">
        {formattedDate}
      </div>

      {students.map((name, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-black/50 p-4 rounded-2xl border border-emerald-900 shadow-lg"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-emerald-300 font-bold text-lg">
              {name}
            </div>
            <button
              onClick={() => onDeleteStudent(name)}
              className="text-red-500 font-bold px-3 py-1 rounded-lg hover:bg-red-600 hover:text-white transition"
            >
              Delete
            </button>
          </div>

          <div className="overflow-x-auto py-2">
            <div className="flex gap-3 min-w-max">
              {days.map(day => (
                <div
                  key={day}
                  className={`bg-black/30 p-3 rounded-xl border border-emerald-700 min-w-[170px]
                  ${day === today.getDate() ? "border-2 border-emerald-400" : ""}`}
                >
                  <div className="text-white/80 text-sm font-semibold mb-2">
                    Day {day}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {PRAYERS.map(p => {
                      const val = attendance[name]?.[day]?.[p] || "";
                      const isYesNo = p === "T" || p === "Fst";

                      return (
                        <motion.div
                          key={p}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => toggle(name, day, p)}
                          className={`flex items-center justify-center w-10 h-10 text-sm font-bold rounded-lg cursor-pointer transition
                            ${val === "✓" && "bg-green-500 text-black"}
                            ${val === "✗" && "bg-red-600 text-white"}
                            ${val === "L" && "bg-yellow-400 text-black"}
                            ${val === "Y" && "bg-emerald-500 text-black"}
                            ${val === "N" && "bg-red-500 text-white"}
                            ${val === "" && "bg-black/40 text-white/30"}`}
                        >
                          {p} {val}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}