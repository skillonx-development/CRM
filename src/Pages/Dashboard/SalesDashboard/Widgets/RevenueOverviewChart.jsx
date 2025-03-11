"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Calendar } from "lucide-react";

const data = [
  { name: "SEP", lastMonth: 30, thisMonth: 50 },
  { name: "OCT", lastMonth: 40, thisMonth: 45 },
  { name: "NOV", lastMonth: 50, thisMonth: 60 },
  { name: "DEC", lastMonth: 45, thisMonth: 55 },
  { name: "JAN", lastMonth: 55, thisMonth: 65 },
  { name: "FEB", lastMonth: 60, thisMonth: 70 },
];

export default function RevenueOverviewChart() {
  return (
    <div className="bg-background-card p-6 rounded-3xl shadow-card text-text-default w-full max-w-7xl mx-auto border border-border-dark">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-text-muted">Revenue Overview</h2>
          <p className="text-text-default">$37.5K <span className="text-status-success">▲ +2.45%</span></p>
        </div>
        <button className="bg-background-hover text-text-default hover:bg-background-sidebar flex items-center border border-border-dark px-4 py-2 rounded-lg">
          <Calendar className="w-5 h-5 mr-2" />  month
        </button>
      </div>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: "#233A5F", borderRadius: "8px", color: "#ffffff" }}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend 
              wrapperStyle={{ color: "#ffffff", textAlign: "center" }} 
              formatter={(value) => (value === "lastMonth" ? "Last Month" : "This Month")}
            />
            <Line type="monotone" dataKey="lastMonth" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: "#8B5CF6" }} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="thisMonth" stroke="#3B82F6" strokeWidth={3} dot={{ fill: "#3B82F6" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
