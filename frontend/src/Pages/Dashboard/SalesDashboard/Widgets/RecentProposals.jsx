"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RecentProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch("https://crm-r5rr.onrender.com/api/tech-proposals");
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }
        const data = await response.json();
        setProposals(data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Sent":
        return "bg-blue-600 text-white";
      case "Accepted":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-600 text-white";
      case "Completed":
        return "bg-green-800 text-white";
      case "Rejected":
        return "bg-red-600 text-white";
      default:
        return "bg-status-neutral text-white";
    }
  };

  return (
    <div className="bg-background-card p-6 rounded-xl shadow-card border border-border ml-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Recent Proposals</h2>
        <a href="https://skillonxcrm/sales/proposals" className="text-primary-light text-sm">
          View all
        </a>
      </div>

      <div className="mt-4 space-y-4">
        {loading ? (
          <p className="text-text-muted text-center">Loading proposals...</p>
        ) : proposals.length > 0 ? (
          proposals
            .slice(0, 4) // Show only the first 4
            .map((proposal, index) => (
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
                  <p className="text-text-disabled text-xs">Awaiting details</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-lg ${getStatusColor(
                      proposal.status
                    )}`}
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
