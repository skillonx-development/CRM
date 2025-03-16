import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Jan", proposals: 5, accepted: 3 },
  { name: "Feb", proposals: 8, accepted: 5 },
  { name: "Mar", proposals: 7, accepted: 5 },
  { name: "Apr", proposals: 12, accepted: 8 },
  { name: "May", proposals: 15, accepted: 10 },
  { name: "Jun", proposals: 18, accepted: 12 },
];

export default function ProposalsOverview() {
  return (
    <motion.div
      className="p-4 rounded-2xl shadow-card bg-background-card text-text-default w-3/4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold">Proposals Overview</h2>
      <p className="text-sm text-text-muted">Proposal submissions and acceptance rates</p>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={{ backgroundColor: "#111827", borderRadius: "8px" }} />
          <Area type="monotone" dataKey="proposals" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
          <Area type="monotone" dataKey="accepted" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
