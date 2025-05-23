import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, FileText } from "lucide-react";
import axios from "axios";

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

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

export default function MarketingOverview() {
  const [stats, setStats] = useState([
    { title: "Total Proposals", icon: FileText, value: 0, change: 0, period: "This month" },
    { title: "Proposal Acceptance Rate", icon: TrendingUp, value: 0, change: 0, period: "Last 30 days", suffix: "%" },
    { title: "Active Teachers", icon: Users, value: 0, change: 0, period: "Available for assignment" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [proposalsRes, teachersRes] = await Promise.all([
          axios.get("/api/tech-proposals"),
          axios.get("/api/teachers"),
        ]);

        const proposals = proposalsRes.data || [];
        const teachers = teachersRes.data || [];

        const totalProposals = proposals.length;
        const acceptedProposals = proposals.filter(p => p.sent === true).length;
        const acceptanceRate = totalProposals > 0 ? Math.round((acceptedProposals / totalProposals) * 100) : 0;

        const activeTeachers = teachers.filter(t => t.status === "active" || t.status === "Available").length;

        setStats([
          {
            title: "Total Proposals",
            icon: FileText,
            value: totalProposals,
            change: 12, // you can calculate this with historical data
            period: "This month",
          },
          {
            title: "Proposal Acceptance Rate",
            icon: TrendingUp,
            value: acceptanceRate,
            change: 8, // placeholder
            period: "Last 30 days",
            suffix: "%",
          },
          {
            title: "Active Teachers",
            icon: Users,
            value: activeTeachers,
            change: 2, // placeholder
            period: "Available for assignment",
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-background-default">
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
