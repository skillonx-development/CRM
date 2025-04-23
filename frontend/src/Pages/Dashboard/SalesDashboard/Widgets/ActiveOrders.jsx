"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ActiveOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch("https://crm-4xul.onrender.com/api/tech-proposals");
        const data = await response.json();

        const activeOrders = data.filter(order => order.status !== "Completed" && order.status!=="Rejected");

        const formattedOrders = activeOrders.map(order => ({
          title: order.title,
          institution: order.institution,
          date: order.schedule,
          participants: order.participants || 0,
          price: `₹${Number(order.price).toLocaleString()}`,
          status: order.status,
          statusColor:
            order.status === "Accepted"
              ? "bg-status-success text-white"
              : order.status === "Pending"
              ? "bg-status-warning text-white"
               : order.status === "Rejected"
              ? "bg-red-600 text-white"
              : "bg-blue-600 text-white",
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Failed to fetch tech proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="bg-background-card p-6 rounded-xl shadow-card border border-border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Active Orders</h2>
        <a href="http://localhost:5173/sales/orders" className="text-primary-light text-sm">
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
