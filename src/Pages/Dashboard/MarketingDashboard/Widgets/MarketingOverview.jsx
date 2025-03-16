import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, FileText } from "lucide-react";

const stats = [
  { title: "Total Proposals", icon: FileText, value: 48, change: 12, period: "This month" },
  { title: "Proposal Acceptance Rate", icon: TrendingUp, value: 78, change: 8, period: "Last 30 days", suffix: "%" },
  { title: "Active Teachers", icon: Users, value: 24, change: 2, period: "Available for assignment" },
  { title: "Upcoming Workshops", icon: Calendar, value: 12, change: 3, period: "Next 30 days" }
];

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let incrementTime = 20;
    let step = Math.ceil(end / 50);
    let timer = setInterval(() => {
      start += step;
      if (start > end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
  }, [target]);

  return <span>{count}</span>;
};

export default function MarketingOverview() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-background-default">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="p-4 rounded-2xl shadow-card bg-background-card text-text-default"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-muted">{stat.title}</span>
            <stat.icon className="w-5 h-5 text-text-muted" />
          </div>
          <div className="text-2xl font-bold">
            <Counter target={stat.value} />{stat.suffix || ""}
          </div>
          <div className="text-sm text-status-success mt-1">
            +{stat.change}% <span className="text-text-muted">{stat.period}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
