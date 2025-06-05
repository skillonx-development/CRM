import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function WorkshopCards() {
  const [techProposals, setTechProposals] = useState([]);

  useEffect(() => {
    const fetchTechProposals = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get("https://crm-r5rr.onrender.com/api/tech-proposals");
        setTechProposals(response.data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching tech proposals:", error);
      }
    };

    fetchTechProposals();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Heading for Recent Proposals */}
      <h2 className="text-2xl font-bold text-text-muted">Recent Proposals</h2>

      {/* Render the first 4 proposals */}
      <div className="flex gap-4 flex-wrap">
        {techProposals.slice(0, 4).map((proposal) => (
          <motion.div
            key={proposal._id}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-md font-medium text-text">{proposal.title}</h3>
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-primary-light text-black text-xs font-semibold px-2 py-1 rounded-lg"
              >
                {proposal.status || "Status"} {/* Rendering status */}
              </motion.span>
            </div>
            <p className="text-sm text-text-muted flex items-center mt-1">📍 {proposal.institution}</p>

            <p className="text-sm text-text-muted flex items-center">💰 {proposal.price}</p>
            <p className="text-sm text-text-muted flex items-center">📆 {proposal.scheduledDate}</p>

            <div className="flex justify-between mt-4">


            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
