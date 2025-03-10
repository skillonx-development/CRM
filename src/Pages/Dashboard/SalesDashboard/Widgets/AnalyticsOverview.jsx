"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const widgets = [
  {
    title: "Total Revenue",
    value: "50.8K",
    change: "28.4%",
    positive: true,
  },
  {
    title: "Sales Target",
    value: "92%",
    change: "3.1%",
    positive: true,
    negativeChange: "12.6%",
  },
  {
    title: "Total Orders",
    value: "756",
    change: "3.1%",
    positive: true,
  },
  {
    title: "Active Deals",
    value: "2.3K",
    change: "11.3%",
    positive: true,
  },
];

const AnalyticsOverview = () => {
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
              <div className="text-2xl font-semibold">{widget.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-md ${
                    widget.positive
                      ? "bg-status-success/20 text-status-success"
                      : "bg-status-error/20 text-status-error"
                  }`}
                >
                  {widget.change} {widget.positive ? "↑" : "↓"}
                </span>
                {widget.negativeChange && (
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-status-error/20 text-status-error">
                    {widget.negativeChange} ↓
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsOverview;
