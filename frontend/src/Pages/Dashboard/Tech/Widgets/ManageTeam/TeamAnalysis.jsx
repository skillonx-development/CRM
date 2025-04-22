"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const TeamAnalysis = () => {
  const [widgets, setWidgets] = useState([
    {
      title: "Total Team Members",
      value: "-",
      change: "0%",
      positive: true,
      description: "vs last month",
    },
    {
      title: "Active Members",
      value: "-",
      change: "0%",
      positive: true,
      description: "No change",
    },
    {
      title: "Total Revenue Generated",
      value: "-",
      change: "0%",
      positive: true,
      description: "vs last quarter",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, invoiceRes] = await Promise.all([
          fetch("http://localhost:5001/api/members/getMembers/Tech"),
          fetch("http://localhost:5001/api/invoice"),
        ]);

        const teamData = await teamRes.json();
        const invoiceData = await invoiceRes.json();

        const totalMembers = teamData.length;
        const activeMembers = teamData.filter(m => m.approved).length;

        // Sum up invoice amounts, filtering out "Paid" status
        const totalRevenue = invoiceData.reduce((sum, inv) => {
          if (inv.status !== "Paid") {
           const amount = typeof inv.amount === "number" ? inv.amount : 0;
            return sum + amount;
          }
          return sum;
        }, 0);

        const updatedWidgets = [
          {
            ...widgets[0],
            value: totalMembers.toString(),
          },
          {
            ...widgets[1],
            value: totalMembers > 0 ? `${Math.round((activeMembers / totalMembers) * 100)}%` : "0%",
          },
          {
            ...widgets[2],
            value: `₹${totalRevenue}`,
          },
        ];

        setWidgets(updatedWidgets);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {widgets.map((widget, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="bg-background-card text-text shadow-card border border-border rounded-xl p-4 h-32 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-text-muted">{widget.title}</h3>
              <MoreHorizontal className="text-text-disabled" size={16} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-semibold text-chart-blue">{widget.value}</div>
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

export default TeamAnalysis;
