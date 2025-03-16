"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "JavaScript Basics", content: 4.2, instructor: 4.3, overall: 4.3 },
  { name: "Node.js Backend", content: 4.8, instructor: 5.0, overall: 4.9 },
  { name: "UI/UX Principles", content: 3.9, instructor: 4.3, overall: 4.0 },
  { name: "Data Structures", content: 4.1, instructor: 3.8, overall: 3.9 },
];

// Custom Tooltip to prevent white background effect
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-card p-3 rounded-lg shadow-card border border-border-dark text-text-default">
        <p className="font-semibold text-text-muted">{label}</p>
        <p className="text-chart-blue">Content: {payload[0].value}</p>
        <p className="text-chart-green">Instructor: {payload[1].value}</p>
        <p className="text-chart-purple">Overall: {payload[2].value}</p>
      </div>
    );
  }
  return null;
};

const WorkshopRatings = () => {
  return (
    <div className="p-6 bg-background-default rounded-lg shadow-card">
      <h2 className="text-xl font-semibold text-text-default mb-4">Workshop Ratings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="20%">
          <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
          <YAxis tick={{ fill: "#9ca3af" }} />
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none", background: "transparent" }} />
          <Legend />
          <Bar dataKey="content" fill="#3b82f6" name="Content" />
          <Bar dataKey="instructor" fill="#10b981" name="Instructor" />
          <Bar dataKey="overall" fill="#8b5cf6" name="Overall" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkshopRatings;
