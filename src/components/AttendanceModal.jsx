import { useState } from "react";
import { motion } from "framer-motion";

const AttendanceModal = ({ student, day, onMark, onUpdateName, onDelete, onClose }) => {
  const [name, setName] = useState(student.name);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0f2c1d] p-6 rounded-2xl w-80 text-center space-y-4"
      >
        <h2 className="text-xl font-semibold">Edit Student</h2>

        {/* Name input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-xl text-black"
        />

        {/* Attendance buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onMark("present")}
            className="bg-green-900 px-4 py-2 rounded-xl"
          >
            Present
          </button>
          <button
            onClick={() => onMark("absent")}
            className="bg-red-600 px-4 py-2 rounded-xl"
          >
            Absent
          </button>
        </div>

        {/* Update/Delete buttons */}
        <div className="flex gap-4 justify-center mt-2">
          <button
            onClick={() => onUpdateName(name)}
            className="bg-blue-600 px-4 py-2 rounded-xl"
          >
            Update
          </button>
          <button
            onClick={() => onDelete()}
            className="bg-gray-600 px-4 py-2 rounded-xl"
          >
            Delete
          </button>
        </div>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="mt-3 text-sm opacity-60"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default AttendanceModal;
