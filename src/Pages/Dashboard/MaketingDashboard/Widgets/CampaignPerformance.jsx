import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", email: 200, social: 500 },
  { month: "Feb", email: 100, social: 200 },
  { month: "Mar", email: 150, social: 250 },
  { month: "Apr", email: 300, social: 350 },
  { month: "May", email: 400, social: 400 },
  { month: "Jun", email: 500, social: 300 },
  { month: "Jul", email: 450, social: 250 },
  { month: "Aug", email: 350, social: 200 },
  { month: "Sep", email: 400, social: 300 },
  { month: "Oct", email: 300, social: 250 },
  { month: "Nov", email: 350, social: 400 },
  { month: "Dec", email: 450, social: 300 },
];

const CampaignPerformance = () => {
  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card">
      <h2 className="text-text-default text-xl font-semibold mb-2">
        Campaign Performance
      </h2>
      <p className="text-status-success text-sm mb-4">(+5) more in 2021</p>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEmail" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", color: "#ffffff" }} />

          <Area type="monotone" dataKey="email" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEmail)" />
          <Area type="monotone" dataKey="social" stroke="#60a5fa" fillOpacity={1} fill="url(#colorSocial)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CampaignPerformance;
