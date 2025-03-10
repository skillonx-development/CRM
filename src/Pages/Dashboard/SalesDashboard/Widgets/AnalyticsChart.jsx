"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", expectedRevenue: 25000, actualRevenue: 24000 },
  { month: "Feb", expectedRevenue: 32000, actualRevenue: 30000 },
  { month: "Mar", expectedRevenue: 22000, actualRevenue: 20000 },
  { month: "Apr", expectedRevenue: 28000, actualRevenue: 27000 },
  { month: "May", expectedRevenue: 37000, actualRevenue: 35000 },
  { month: "Jun", expectedRevenue: 42000, actualRevenue: 40000 },
  { month: "Jul", expectedRevenue: 47000, actualRevenue: 45000 },
];

const RevenueAreaChart = () => {
  return (
    <div className="bg-background-card shadow-card p-6 w-6xl max-w-8xl border border-border-dark rounded-xl">
      <div className="mb-4">
        <h2 className="text-text-default text-lg font-semibold">Expected Revenue vs. Actual Revenue</h2>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(31, 41, 55)" />
            <XAxis dataKey="month" stroke="rgb(156, 163, 175)" />
            <YAxis stroke="rgb(156, 163, 175)" />
            <Tooltip contentStyle={{ backgroundColor: "rgb(31, 41, 55)", color: "rgb(226, 232, 240)" }} />
            <Legend />
            <Area
              type="monotone"
              dataKey="expectedRevenue"
              stroke="rgb(var(--color-chart-yellow))"
              fill="rgba(234, 179, 8, 0.3)"
              name="Expected Revenue"
            />
            <Area
              type="monotone"
              dataKey="actualRevenue"
              stroke="rgb(var(--color-chart-purple))"
              fill="rgba(139, 92, 246, 0.3)"
              name="Actual Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueAreaChart;
