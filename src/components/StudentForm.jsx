import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Edit3, Trash2, X, Sparkles } from "lucide-react";

const StudentForm = ({ onAdd, onUpdate, onDelete, editStudent, onCancel }) => {
  const [name, setName] = useState("");

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="relative group p-[1px] rounded-[2rem] bg-gradient-to-r from-emerald-500/20 via-white/5 to-emerald-500/20 shadow-2xl transition-all duration-500 focus-within:shadow-emerald-500/10">
        <div className="bg-black/80 backdrop-blur-3xl rounded-[calc(2rem-1px)] p-3">
          <div className="flex flex-col gap-3">
            
            {/* Header Tag - Shows only when editing */}
            <AnimatePresence>
              {editStudent && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 px-3 pt-1"
                >
                  <Sparkles size={12} className="text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/60">
                    Modifying Entry
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Wrapper */}
            <div className="relative">
              <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40 group-focus-within:text-emerald-400 transition-colors" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (editStudent ? handleUpdate() : handleAdd())}
                placeholder="Student name..."
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-lg placeholder:text-white/10 text-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              {editStudent ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                  >
                    <Edit3 size={18} /> Update
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDelete(editStudent.id)}
                      className="flex-1 sm:flex-none flex items-center justify-center px-6 py-4 bg-white/5 hover:bg-red-500/20 text-red-400 border border-white/5 rounded-2xl transition-all active:scale-95"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={onCancel}
                      className="flex-1 sm:flex-none flex items-center justify-center px-6 py-4 bg-white/5 hover:bg-white/10 text-white/60 border border-white/5 rounded-2xl transition-all active:scale-95"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={handleAdd}
                  className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  Enroll Student
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentForm;