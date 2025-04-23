"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const Analytics = () => {
  const [data, setData] = useState({
    totalProposals: 0,
    activeWorkshops: 0,
    completedWorkshops: 0,
    instructors: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all proposals
        const proposalsRes = await fetch("https://crm-4xul.onrender.com/api/tech-proposals");
        const proposals = await proposalsRes.json();

        // Fetch all teachers
        const teachersRes = await fetch("https://crm-4xul.onrender.com/api/teachers");
        const teachers = await teachersRes.json();

        // Calculate metrics
        const totalProposals = proposals.length;
        const completedWorkshops = proposals.filter(p => p.status === "Completed").length;
        const activeWorkshops = proposals.filter(p => p.status !== "Completed").length;
        const totalInstructors = teachers.length;

        // Update state
        setData({
          totalProposals,
          completedWorkshops,
          activeWorkshops,
          instructors: totalInstructors,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  // Widget cards for UI
  const widgets = [
    {
      title: "Total Proposals",
      value: data.totalProposals,
      change: "12%", // Optional: replace with real trend %
      positive: true,
      description: "from last month",
    },
    {
      title: "Active Workshops",
      value: data.activeWorkshops,
      change: "25%",
      positive: true,
      description: "from last month",
    },
    {
      title: "Instructors",
      value: data.instructors,
      change: "5%",
      positive: true,
      description: "from last month",
    },
    {
      title: "Completed Workshops",
      value: data.completedWorkshops,
      change: "8%",
      positive: false,
      description: "from last month",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {widgets.map((widget, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="bg-background-card text-text shadow-card border border-border rounded-xl p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-text-muted">{widget.title}</h3>
              <MoreHorizontal className="text-text-disabled" size={16} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-semibold text-chart-blue">
                {widget.value}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-md ${
                    widget.positive ? "text-status-success" : "text-status-error"
                  }`}
                >
                  {widget.positive ? "↑" : "↓"} {widget.change}
                </span>
                <span className="text-xs text-text-muted">{widget.description}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Analytics;
