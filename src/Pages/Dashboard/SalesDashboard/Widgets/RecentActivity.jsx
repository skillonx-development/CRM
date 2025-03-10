"use client";

import { motion } from "framer-motion";
import { Bell, ShoppingCart, Package } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: <Bell className="w-5 h-5 text-status.info" />, // Blue for information
    text: "Updated Dashboard Theme",
    date: "10 MAR 2:15 PM",
  },
  {
    id: 2,
    icon: <Package className="w-5 h-5 text-status.error" />, // Red for errors
    text: "New Feature Deployment",
    date: "09 MAR 6:42 PM",
  },
  {
    id: 3,
    icon: <ShoppingCart className="w-5 h-5 text-status.success" />, // Green for success
    text: "Subscription Payment Processed",
    date: "08 MAR 10:30 AM",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-background-card text-text shadow-card p-6 rounded-2xl w-full max-w-md border border-border">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </motion.div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            {activity.icon}
            <div>
              <p className="text-sm font-medium text-text">{activity.text}</p>
              <p className="text-xs text-text-muted">{activity.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
