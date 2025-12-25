import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const weekday = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const day = currentDate.getDate();
  const month = currentDate.toLocaleDateString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-emerald-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#065f46,_transparent_60%)] opacity-30" />

      <div className="relative z-10 px-4 py-8 max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Madrasa Attendance
          </h1>
          <p className="font-arabic text-2xl text-emerald-300 tracking-wider">
            بسم الله الرحمن الرحيم
          </p>
          <p className="text-sm text-white">
            {weekday}, {day} {month} {year} • <span>Matharsha related</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 border border-emerald-900 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_60px_#064e3b]"
        >
          <StudentForm
            onAdd={addStudent}
            onUpdate={updateStudent}
            onDelete={() => deleteStudent(editStudent?.id)}
            editStudent={editStudent}
            onCancel={() => setEditStudent(null)}
          />

          {students.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Users size={18} />
                <span className="text-sm text-white">
                  Total Students: {students.length}
                </span>
              </div>
              <PDFButton />
            </div>
          )}

          {students.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-white"
            >
              <p className="text-lg">No students yet 🌙</p>
              <p className="text-sm mt-1">Add students to begin attendance</p>
            </motion.div>
          ) : (
            <AttendanceGrid
              students={students}
              onEdit={(student) => setEditStudent(student)}
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-emerald-300/40 font-arabic text-lg"
        >
          وَقُلْ رَبِّ زِدْنِي عِلْمًا
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
