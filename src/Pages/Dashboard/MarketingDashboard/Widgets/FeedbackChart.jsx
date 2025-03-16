import React from "react"; 
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeedbackChart = () => {
  const data = {
    labels: ["React", "UI/UX", "Data Science", "Mobile App", "Cloud", "AI/ML"],
    datasets: [
      {
        label: "Rating",
        data: [4.8, 3.2, 4.9, 4.2, 4.7, 4.6], // Ratings for each category
        backgroundColor: [
          "#3b82f6", // Blue
          "#f97316", // Orange
          "#10b981", // Green
          "#ef4444", // Red
          "#6366f1", // Indigo
          "#facc15", // Yellow
        ],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Rating: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          color: "#9ca3af",
        },
        grid: { color: "#374151" },
      },
      x: {
        ticks: { color: "#9ca3af" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-background-card p-8 rounded-lg shadow-card w-full max-w-2xl">
      <h3 className="text-xl font-bold">Feedback Overview</h3>
      <p className="text-md text-text-muted">Workshop ratings and performance</p>

      {/* Bigger Chart */}
      <div className="h-72 mt-6">
        <Bar data={data} options={options} />
      </div>

      {/* Stats Section */}
      <div className="flex justify-between mt-6 text-lg text-text-default">
        <div className="text-center">
          <p className="font-semibold text-xl text-status-info">4.6</p>
          <p>Average Rating</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl text-status-info">124</p>
          <p>Total Feedback</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-xl text-status-info">78%</p>
          <p>Response Rate</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackChart;
