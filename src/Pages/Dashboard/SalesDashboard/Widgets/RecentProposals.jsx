"use client";

import { motion } from "framer-motion";

const proposals = [
  {
    title: "React Workshop",
    institution: "ABC University",
    date: "Mar 15, 2023",
    daysLeft: "2 days left",
    price: "$4,500",
    status: "Proposal Sent",
    statusColor: "bg-chart-purple text-white",
  },
  {
    title: "UI/UX Design Workshop",
    institution: "XYZ College",
    date: "Mar 20, 2023",
    daysLeft: "7 days left",
    price: "$7,200",
    status: "Lead Acquired",
    statusColor: "bg-chart-indigo text-white",
  },
];

const RecentProposals = () => {
  return (
    <div className="bg-background-card p-6 rounded-xl shadow-card border border-border ml-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Recent Proposals</h2>
        <a href="http://localhost:5173/sales/proposals" className="text-primary-light text-sm">
          View all
        </a>
      </div>
      <div className="mt-4 space-y-4">
        {proposals.map((proposal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-background-hover p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-white font-medium">{proposal.title}</h3>
              <p className="text-text-muted text-sm">{proposal.institution}</p>
              <p className="text-text-disabled text-xs">
                Sent on {proposal.date} • {proposal.daysLeft}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${proposal.statusColor}`}>
                {proposal.status}
              </span>
              <p className="text-xl font-semibold text-white mt-2">{proposal.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentProposals;
