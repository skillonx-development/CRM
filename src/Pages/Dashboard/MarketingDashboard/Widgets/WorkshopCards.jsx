import { motion } from "framer-motion";

export default function WorkshopCards() {
  return (
    <div className="flex gap-4">
      {/* Card 1 */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" }}
        whileTap={{ scale: 0.98 }}
        className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96 transition-all duration-300"
      >
        <div className="flex justify-between items-start">
          <h3 className="text-md font-medium text-text">3-Day React Workshop</h3>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary-light text-primary-dark text-xs font-semibold px-2 py-1 rounded-lg"
          >
            Enhancing
          </motion.span>
        </div>
        <p className="text-sm text-text-muted flex items-center mt-1">📍 Tech University</p>
        <p className="text-sm text-text-muted flex items-center">📅 Aug. 15-17, 2023 &nbsp; ⏳ 3 days</p>
        <p className="text-sm text-text-muted flex items-center">👨‍🏫 Dr. Jane Smith</p>

        <div className="flex justify-between mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-background-hover text-text-muted rounded-lg hover:bg-primary-dark hover:text-text transition"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Enhance
          </motion.button>
        </div>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" }}
        whileTap={{ scale: 0.98 }}
        className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96 transition-all duration-300"
      >
        <div className="flex justify-between items-start">
          <h3 className="text-md font-medium text-text">UI/UX Design Masterclass</h3>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-status-success text-white text-xs font-semibold px-2 py-1 rounded-lg"
          >
            Ready for Review
          </motion.span>
        </div>
        <p className="text-sm text-text-muted flex items-center mt-1">📍 Design Academy</p>
        <p className="text-sm text-text-muted flex items-center">📅 July 10-11, 2023 &nbsp; ⏳ 2 days</p>
        <p className="text-sm text-text-muted flex items-center">👨‍🏫 Prof. Robert Johnson</p>

        <div className="flex justify-between mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-background-hover text-text-muted rounded-lg hover:bg-primary-dark hover:text-text transition"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            Enhance
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
