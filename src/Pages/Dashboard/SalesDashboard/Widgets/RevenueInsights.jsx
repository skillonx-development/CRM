"use client";

import { motion } from "framer-motion";
import { Bell, ShoppingCart, TrendingUp } from "lucide-react";

const insights = [
  { icon: <Bell className="text-status-info" />, title: "Growing revenue trend", date: "22 DEC 7:20 PM" },
  { icon: <TrendingUp className="text-status-error" />, title: "Product B revenue surge", date: "21 DEC 11:21 PM" },
  { icon: <ShoppingCart className="text-status-info" />, title: "Q2 targets on track", date: "21 DEC 9:28 PM" },
  { icon: <Bell className="text-status-info" />, title: "Product E declining", date: "22 DEC 7:20 PM" },
];

export default function RevenueInsights() {
  return (
    <div className="bg-background-card p-4 rounded-2xl shadow-card w-[320px] text-text-default border border-border-dark ">
      <h2 className="text-lg font-semibold mb-4">Revenue Insights</h2>
      <div className="space-y-3">
        {insights.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-hover transition"
          >
            {item.icon}
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-text-muted">{item.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
