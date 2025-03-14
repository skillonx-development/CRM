"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const notifications = [
  {
    title: "New lead",
    description: "ABC University is interested in a React workshop",
    time: "2 hours ago",
  },
  {
    title: "Proposal accepted",
    description: "XYZ College approved your proposal",
    time: "1 day ago",
  },
  {
    title: "Payment received",
    description: "Payment received from Tech Institute",
    time: "2 days ago",
  },
];

const Notifications = () => {
  return (
    <div className="bg-background-card p-6 rounded-xl shadow-card border border-border">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bell className="text-primary" size={18} />
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
        </div>
        <button className="text-primary-light text-sm">Mark all as read</button>
      </div>
      <div className="mt-4 space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex justify-between items-start p-3 rounded-lg hover:bg-background-hover"
          >
            <div className="flex space-x-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-1"></span>
              <div>
                <h3 className="text-white font-medium">{notification.title}</h3>
                <p className="text-text-muted text-sm">{notification.description}</p>
              </div>
            </div>
            <span className="text-text-disabled text-xs">{notification.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
