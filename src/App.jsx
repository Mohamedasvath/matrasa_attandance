import { useState } from "react";
import { motion } from "framer-motion";
import AdminLock from "./components/AdminLock";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {!isUnlocked ? (
        <AdminLock onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <Dashboard />
      )}
    </motion.div>
  );
};

export default App;
