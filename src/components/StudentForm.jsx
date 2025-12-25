import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Edit2, Trash2, XCircle } from "lucide-react";

const StudentForm = ({ onAdd, onUpdate, onDelete, editStudent, onCancel }) => {
  const [name, setName] = useState("");

  // Prefill input when editing
  useEffect(() => {
    setName(editStudent ? editStudent.name : "");
  }, [editStudent]);

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name);
    setName("");
  };

  const handleUpdate = () => {
    if (!name.trim()) return;
    onUpdate(name);
  };

  const handleDelete = () => {
    if (editStudent) onDelete(editStudent.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto bg-gradient-to-br from-emerald-950/80 to-black 
      border border-emerald-800 rounded-2xl px-5 py-6 shadow-[0_0_25px_#065f46]"
    >
      <div className="flex flex-col gap-4">

        {/* Input Box */}
        <div className="relative w-full">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Student Name"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/70 text-white 
            border border-emerald-700 placeholder:text-gray-300 focus:ring-2 
            focus:ring-emerald-500 outline-none transition"
          />
          <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
        </div>

        {/* Buttons Section */}
        {editStudent ? (
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">

            {/* Update */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleUpdate}
              className="flex items-center gap-2 px-5 py-3 rounded-xl 
              bg-blue-500 text-white font-semibold hover:bg-blue-400 transition"
            >
              <Edit2 size={18} />
              Update
            </motion.button>

            {/* Delete */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleDelete}
              className="flex items-center gap-2 px-5 py-3 rounded-xl 
              bg-red-600 text-white font-semibold hover:bg-red-500 transition"
            >
              <Trash2 size={18} />
              Delete
            </motion.button>

            {/* Cancel */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={onCancel}
              className="flex items-center gap-2 px-5 py-3 rounded-xl 
              bg-gray-600 text-white font-semibold hover:bg-gray-500 transition"
            >
              <XCircle size={18} />
              Cancel
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl 
            bg-emerald-500 text-black font-bold shadow-lg hover:bg-emerald-400 transition w-full sm:w-auto mx-auto"
          >
            Add Student
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default StudentForm;
