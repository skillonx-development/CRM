import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { FaUsers } from "react-icons/fa"; // Icon for age demographics

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const AudienceInsights = () => {
  const data = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        label: "Users",
        data: [25, 40, 20, 8, 3],
        backgroundColor: [
          "#f97316", // Orange for 18-24
          "#8b5cf6", // Purple for 25-34
          "#10b981", // Green for 35-44
          "#eab308", // Yellow for 45-54
          "#ef4444", // Red for 55+
        ],
        borderRadius: 5,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#9ca3af" },
      },
    },
    plugins: {
      legend: {
        display: false, // 🔥 Hides the legend
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: { size: 14, weight: "bold", color: "#ffffff" },
        bodyFont: { size: 12, color: "#ffffff" },
        padding: 10,
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
  };
  

  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card w-full max-w-sm">
      <h2 className="text-xl font-bold text-text-default text-center">Audience Insights</h2>

      <div className="flex items-center mt-4 mb-4">
        <FaUsers className="text-chart-purple text-xl mr-2" />
        <h3 className="text-lg font-semibold text-text-default">Age Demographics</h3>
      </div>

      {/* Chart Container */}
      <div className="w-full h-48">
        <Bar data={data} options={options} />
      </div>

      {/* Key Insights */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-text-default">Key Insights:</h4>
        <ul className="list-disc list-inside text-text-muted mt-2">
          <li><span className="text-chart-orange">18-24</span> has growing engagement.</li>
          <li><span className="text-chart-purple">25-34</span> is your best-performing group.</li>
          <li><span className="text-chart-red">55+</span> shows low engagement.</li>
        </ul>
      </div>
    </div>
  );
};

export default AudienceInsights;
