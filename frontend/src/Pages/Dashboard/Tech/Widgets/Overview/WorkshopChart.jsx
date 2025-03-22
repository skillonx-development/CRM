import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkshopChart = () => {
  const data = {
    labels: ["React", "NodeJs", "AI/ML", "UI/UX", "DevOps"],
    datasets: [
      {
        label: "Workshop Categories Distribution",
        data: [12, 9, 6, 3, 0], // Workshop counts
        backgroundColor: [
          "#8b5cf6", // Purple
          "#10b981", // Green
          "#eab308", // Yellow
          "#ef4444", // Red
          "#3b82f6", // Blue
        ],
        borderRadius: 5, // Smooth bar edges
        barThickness: 30, // Reduce bar width
        hoverBackgroundColor: "#ffffff", // Hover effect
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner UI
      },
      title: {
        display: true,
        text: "Workshop Categories Distribution",
        color: "#ffffff",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          bottom: 10,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false, // Hide grid lines for a clean look
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 3,
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "#1f2937", // Dark grid lines
        },
      },
    },
    animation: {
      duration: 1200, // Smooth animation
      easing: "easeInOutQuart",
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-background-card p-6 rounded-lg shadow-card">
      <h2 className="text-text-muted text-lg font-semibold mb-4 text-center">
        Workshop Distribution
      </h2>
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default WorkshopChart;
