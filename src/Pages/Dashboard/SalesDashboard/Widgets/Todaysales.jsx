"use client";

import { motion } from "framer-motion";

const salesData = [
  {
    id: 1,
    value: "$5k",
    label: "Total Sales",
    change: "+10% from yesterday",
    color: "text-chart-orange",
  },
  {
    id: 2,
    value: "500",
    label: "Total Proposals",
    change: "+8% from yesterday",
    color: "text-chart-green",
  },
  {
    id: 3,
    value: "9",
    label: "Products Done",
    change: "+2% from yesterday",
    color: "text-chart-blue",
  },
  {
    id: 4,
    value: "12",
    label: "New Customers",
    change: "+3% from yesterday",
    color: "text-chart-teal",
  },
];

const SalesSummary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background-card text-text-muted p-6 rounded-2xl shadow-card w-full h-80 "
    >
      {/* Title Section */}
      <h2 className="text-lg font-semibold text-center text-text-default">
        Today's Sales
      </h2>
      <p className="text-sm text-text-muted text-center mb-7">Sales Summary</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {salesData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-background-hover rounded-xl p-4 shadow-card text-center"
          >
            <h3 className="text-xl font-bold text-text-default">{item.value}</h3>
            <p className="text-sm text-text-muted">{item.label}</p>
            <span className={`text-xs ${item.color}`}>{item.change}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SalesSummary;
