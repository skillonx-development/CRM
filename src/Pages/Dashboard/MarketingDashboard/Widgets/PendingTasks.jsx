import { motion } from "framer-motion";

export default function PendingTasks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg font-semibold text-status-info mb-3"
      >
        Pending Tasks
      </motion.h2>
      <ul className="space-y-2">
        {["Finalize React workshop proposal for Tech University", "Assign teacher for Data Science workshop", "Review feedback from UI/UX workshop"].map((task, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 * index }}
            className="flex items-start gap-3"
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="w-6 h-6 flex items-center justify-center bg-status-info text-white text-xs font-bold rounded-full"
            >
              {index + 1}
            </motion.span>
            <p className="text-text-muted">{task}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
