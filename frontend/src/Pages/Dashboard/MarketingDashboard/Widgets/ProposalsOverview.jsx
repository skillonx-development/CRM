import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

export default function ProposalsOverview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProposalStats = async () => {
      try {
        const res = await axios.get("https://crm-r5rr.onrender.com/api/tech-proposals");
        const proposals = res.data || [];

        // Group by month
        const monthlyStats = {};
        proposals.forEach((proposal) => {
          const date = new Date(proposal.createdAt);
          const month = date.toLocaleString("default", { month: "short" });

          if (!monthlyStats[month]) {
            monthlyStats[month] = { month, proposals: 0, accepted: 0 };
          }

          monthlyStats[month].proposals += 1;
          if (proposal.sent) {
            monthlyStats[month].accepted += 1;
          }
        });

        // Convert to array sorted by month order
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const sortedStats = monthOrder
          .map((month) => monthlyStats[month])
          .filter(Boolean); // remove undefined months

        setData(sortedStats);
      } catch (error) {
        console.error("Error fetching proposal overview:", error);
      }
    };

    fetchProposalStats();
  }, []);

  return (
    <motion.div
      className="p-4 rounded-2xl shadow-card bg-background-card text-text-default w-full md:w-11/12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold">Proposals Overview</h2>
      <p className="text-sm text-text-muted">Proposal submissions and acceptance rates</p>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={{ backgroundColor: "#111827", borderRadius: "8px" }} />
          <Area type="monotone" dataKey="proposals" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
          <Area type="monotone" dataKey="accepted" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
