"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const widgets = [
  {
    title: "Total Team Members",
    value: "6",
    change: "8%",
    positive: true,
    description: "vs last month",
  },
  {
    title: "Active Members",
    value: "83%",
    change: "0%",
    positive: true,
    description: "No change",
  },
  {
    title: "Total Revenue Generated",
    value: "$535.0k",
    change: "12%",
    positive: true,
    description: "vs last quarter",
  },
  {
    title: "Avg. Performance Score",
    value: "80%",
    change: "5%",
    positive: true,
    description: "vs last quarter",
  },
];

const TeamAnalysis = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
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
