import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const CampaignPerformance = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Reach",
        data: [2000, 1500, 10000, 5000, 6000, 4500, 5000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointRadius: 4,
      },
      {
        label: "Engagement",
        data: [200, 300, 1200, 800, 600, 500, 700],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#8b5cf6",
        pointRadius: 4,
      },
      {
        label: "Clicks",
        data: [50, 100, 500, 300, 250, 200, 280],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#ef4444",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "#1f2937",
        titleFont: { size: 14, weight: "bold", color: "#ffffff" },
        bodyFont: { size: 12, color: "#ffffff" },
        padding: 10,
        borderColor: "#374151",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (tooltipItem) => {
            let value = tooltipItem.raw;
            return `${tooltipItem.dataset.label}: ${value.toLocaleString()}`;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#9ca3af", callback: (value) => value.toLocaleString() },
      },
    },
  };

  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-text-default">Campaign Performance</h2>
        <select className="p-2 bg-background-hover border border-border-dark rounded-md text-text-muted">
          <option>Last 7 days</option>
          <option>Last 14 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
      <div className="w-full h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CampaignPerformance;
