import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import AttendanceGrid from "../components/AttendanceGrid";
import StudentForm from "../components/StudentForm";
import PDFButton from "../components/PDFButton";
import { Link } from "react-router-dom";

const AttendancePage = () => {
  const [students, setStudents] = useState(() => {
    return JSON.parse(localStorage.getItem("students")) || [];
  });
  const [editStudent, setEditStudent] = useState(null);

  const addStudent = (name) => {
    const updated = [...students, { id: Date.now(), name }];
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-emerald-950 to-black text-white p-6">
      <h1 className="text-center text-4xl font-bold text-emerald-400">📘 Attendance Register</h1>

      <StudentForm
        onAdd={addStudent}
        onUpdate={updateStudent}
        onDelete={() => deleteStudent(editStudent?.id)}
        editStudent={editStudent}
        onCancel={() => setEditStudent(null)}
      />

      {students.length > 0 && (
        <div className="flex justify-between mt-4">
          <p className="text-emerald-400">Total: {students.length}</p>
          <PDFButton />
        </div>
      )}

      {students.length > 0 ? (
        <AttendanceGrid students={students} onEdit={setEditStudent} />
      ) : (
        <p className="text-center mt-10 opacity-70">No students added yet</p>
      )}

      {/* 🔥 Button to open Namaz Attendance */}
      <Link to="/namaz" className="block text-center mt-8">
        <button className="bg-emerald-500 hover:bg-emerald-400 px-6 py-3 rounded-xl font-bold">
          🕌 Go to Namaz Attendance
        </button>
      </Link>
    </div>
  );
};

export default AttendancePage;
