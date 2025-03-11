import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PlatformPerformance = () => {
  const data = {
    labels: ["Insta", "F.B", "Twitt", "LinkedIn", "YouTube", "Others"],
    datasets: [
      {
        label: "Performance",
        data: [120, 200, 150, 80, 70, 110],
        backgroundColor: [
          "#4285F4", // Blue (Insta)
          "#EA4335", // Red (F.B)
          "#FBBC05", // Yellow (Twitt)
          "#34A853", // Green (LinkedIn)
          "#32CD32", // Light Green (YouTube)
          "#26C6DA", // Cyan (Others)
        ],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: { enabled: true }, // Enable tooltips
    },
    scales: {
      x: {
        ticks: { color: "#FFFFFF" }, // White labels
      },
      y: {
        ticks: { color: "#FFFFFF" }, // White labels
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card">
      <h2 className="text-white text-lg font-bold mb-4">Platform Performance</h2>
      <div style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PlatformPerformance;
