"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";

const data = [
  { name: "Workshop", value: 30, color: "#8B5CF6" },
  { name: "Hackathon", value: 25, color: "#EC4899" },
  { name: "ID Card", value: 20, color: "#F59E0B" },
  { name: "Projects", value: 15, color: "#10B981" },
  { name: "Prod ", value: 10, color: "#3B82F6" },
];

export default function RevenuePieChart() {
  return (
    <div className="bg-background-card p-6 rounded-3xl shadow-card w-2/4 text-text-default border border-border-dark ">
      <div className="flex justify-between items-center mb-1 mt-0">
        <h2 className="text-2xl font-bold text-text-muted">Revenue By Product</h2>
        <button className="bg-background-hover text-text-default hover:bg-background-sidebar flex items-center border border-border-dark px-4 py-2 rounded-lg">
          <Calendar className="w-5 h-5 mr-2" /> This month
        </button>
      </div>
      <div className="w-full h-80 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
  <Pie
    data={data}
    cx="50%"
    cy="50%"
    innerRadius={70}
    outerRadius={100}
    paddingAngle={6}
    dataKey="value"
    label={({ name }) => name}
  >
    {data.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={entry.color} // This ensures correct colors
        stroke="#ffffff"
        strokeWidth={3}
      />
    ))}
  </Pie>
  <Tooltip contentStyle={{ backgroundColor: "#233A5F", borderRadius: "8px", color: "#ffffff" }} />
</PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}     