// import { useState, useEffect } from "react";
// import AttendanceCard from "../components/AttendanceCard";
// import AttendanceModal from "../components/AttendanceModal";
// import StudentForm from "../components/StudentForm";
// import MonthlyReport from "../components/MonthlyReport";
// import { motion } from "framer-motion";

// const today = new Date().toISOString().split("T")[0];

// const Attendance = () => {
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(today);
//   const [showReport, setShowReport] = useState(false);

//   useEffect(() => {
//     setStudents(JSON.parse(localStorage.getItem("students")) || []);
//     setAttendance(JSON.parse(localStorage.getItem("attendance")) || {});
//   }, []);

//   const addStudent = (name) => {
//     if (!name) return;
//     const updated = [...students, { id: Date.now(), name }];
//     setStudents(updated);
//     localStorage.setItem("students", JSON.stringify(updated));
//   };

//   const deleteStudent = (id) => {
//     const updated = students.filter((s) => s.id !== id);
//     setStudents(updated);
//     localStorage.setItem("students", JSON.stringify(updated));
//   };

//   const markAttendance = (status) => {
//     const updated = {
//       ...attendance,
//       [selectedDate]: {
//         ...(attendance[selectedDate] || {}),
//         [selectedStudent.id]: status,
//       },
//     };
//     setAttendance(updated);
//     localStorage.setItem("attendance", JSON.stringify(updated));
//     setSelectedStudent(null);
//   };

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold text-center text-emerald-700"
//       >
//         🕌 Masjid Attendance
//       </motion.h1>

//       <p className="text-center text-gray-500 mb-6">
//         “Indeed, prayer prohibits immorality” – Quran 29:45
//       </p>

//       <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border px-3 py-2 rounded-lg"
//         />

//         <button
//           onClick={() => setShowReport(!showReport)}
//           className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
//         >
//           {showReport ? "Back to Attendance" : "Monthly Report"}
//         </button>
//       </div>

//       {!showReport && (
//         <>
//           <StudentForm onAdd={addStudent} />

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//             {students.map((student) => (
//               <AttendanceCard
//                 key={student.id}
//                 student={student}
//                 status={attendance[selectedDate]?.[student.id]}
//                 onClick={() => setSelectedStudent(student)}
//                 onDelete={deleteStudent}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {showReport && (
//         <MonthlyReport
//           students={students}
//           attendance={attendance}
//         />
//       )}

//       {selectedStudent && (
//         <AttendanceModal
//           student={selectedStudent}
//           onClose={() => setSelectedStudent(null)}
//           onMark={markAttendance}
//         />
//       )}
//     </div>
//   );
// };

// export default Attendance;
