"use client";

import { motion } from "framer-motion";

const orders = [
  {
    title: "AI & Machine Learning",
    institution: "Tech Institute",
    date: "Apr 10 - Apr 14",
    participants: 35,
    price: "$8,750",
    status: "Accepted",
    statusColor: "bg-status-success text-white",
  },
  {
    title: "Web Development",
    institution: "Digital Academy",
    date: "Apr 18 - Apr 20",
    participants: 28,
    price: "$5,600",
    status: "Pending",
    statusColor: "bg-status-warning text-white",
  },
];

const ActiveOrders = () => {
  return (
    <div className="bg-background-card p-6 rounded-xl shadow-card border border-border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Active Orders</h2>
        <a href="#" className="text-primary-light text-sm">
          View all
        </a>
      </div>
      <div className="mt-4 space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-background-hover p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-white font-medium">{order.title}</h3>
              <p className="text-text-muted text-sm">{order.institution}</p>
              <p className="text-text-disabled text-xs">
                {order.date} • {order.participants} participants
              </p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${order.statusColor}`}>
                {order.status}
              </span>
              <p className="text-xl font-semibold text-white mt-2">{order.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActiveOrders;
