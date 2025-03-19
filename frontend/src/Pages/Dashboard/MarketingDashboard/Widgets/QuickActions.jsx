import React, { useState } from "react";
import { FaPaperPlane, FaChartBar, FaDownload } from "react-icons/fa";

const QuickActions = () => {
  const [selectedTeam, setSelectedTeam] = useState("Tech Team");

  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card w-80 text-text-default">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

      {/* Dropdown for Team Selection */}
      <label className="block text-sm text-text-muted mb-2">Send Feedback To:</label>
      <select
        className="w-full p-2 bg-background-hover text-text-default border border-border-dark rounded-md mb-3"
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="Tech Team">Tech Team</option>
        <option value="Sales Team">Sales Team</option>
      </select>

      {/* Send Feedback Form Button */}
      <button className="w-full flex items-center gap-2 border border-primary text-primary py-2 px-4 rounded-md hover:bg-primary hover:text-white transition">
        <FaPaperPlane />
        Send Feedback Form
      </button>

      {/* Generate Report Button */}
      <button className="w-full flex items-center gap-2 border border-status-info text-status-info py-2 px-4 rounded-md hover:bg-status-info hover:text-white transition mt-3">
        <FaChartBar />
        Generate Report
      </button>

      {/* Export Feedback Button */}
      <button className="w-full flex items-center gap-2 border border-status-success text-status-success py-2 px-4 rounded-md hover:bg-status-success hover:text-white transition mt-3">
        <FaDownload />
        Export Feedback
      </button>
    </div>
  );
};

export default QuickActions;
