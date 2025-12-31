import { useState, useEffect } from "react";
import NamazGrid from "../components/NamazGrid";
import NamazPDF from "../components/NamazPDF";

export default function NamazPage() {
  const [students, setStudents] = useState(() =>
    JSON.parse(localStorage.getItem("namaz_students") || "[]")
  );
  const [newStudentName, setNewStudentName] = useState("");

  // Persist students list
  useEffect(() => {
    localStorage.setItem("namaz_students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    const trimmed = newStudentName.trim();
    if (!trimmed || students.includes(trimmed)) return;
    setStudents(prev => [...prev, trimmed]);
    setNewStudentName("");
  };

  const deleteStudent = (name) => {
    setStudents(prev => prev.filter(s => s !== name));
  };

  const now = new Date();
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const year = now.getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950/70 to-black text-white p-6">
      <h1 className="text-center text-4xl font-bold text-white mb-2 font-extrabold text-5xl "> Namaz Attendance</h1>
      <p className="text-center text-emerald-300 mt-2">{month} {year}</p>

      {/* Add Student Input */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 mb-6">
        <input
          type="text"
          placeholder="Add student..."
          value={newStudentName}
          onChange={e => setNewStudentName(e.target.value)}
          className="px-4 py-2 rounded-xl bg-black/20 border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-60 text-white"
        />
        <button
          onClick={addStudent}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition"
        >
          Add
        </button>
      </div>

      {students.length > 0 ? (
        <>
          <NamazGrid
            students={students}
            onAddStudent={(name) => {
              if (!students.includes(name)) setStudents(prev => [...prev, name]);
            }}
            onDeleteStudent={deleteStudent}
          />
          <NamazPDF students={students} />
        </>
      ) : (
        <p className="text-center mt-20 opacity-60 text-white">Add names to start attendance 🕋</p>
      )}
    </div>
  );
}
