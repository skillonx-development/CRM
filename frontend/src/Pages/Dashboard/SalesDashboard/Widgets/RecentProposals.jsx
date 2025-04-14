"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// const API_URL = "http://localhost:5001/api/proposals";

const RecentProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/proposals");
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }
        const data = await response.json();
        console.log("Fetched proposals:", data);
        setProposals(data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="bg-background-card p-6 rounded-xl shadow-card border border-border ml-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Recent Proposals</h2>
        <a href="http://localhost:5173/sales/proposals" className="text-primary-light text-sm">
          View all
        </a>
      </div>

      <div className="mt-4 space-y-4">
        {loading ? (
          <p className="text-text-muted text-center">Loading proposals...</p>
        ) : proposals.length > 0 ? (
          proposals.map((proposal, index) => (
            <motion.div
              key={proposal._id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-background-hover p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-white font-medium">{proposal.title}</h3>
                <p className="text-text-muted text-sm">{proposal.institution}</p>
                {/* Placeholder text, since date is not available */}
                <p className="text-text-disabled text-xs">Awaiting details</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-lg bg-yellow-600 text-white`}
                >
                  {proposal.status}
                </span>
                <p className="text-xl font-semibold text-white mt-2">₹{proposal.price}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-text-muted text-center">No proposals found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentProposals;
