import React, { useRef } from "react";
import { FileDown } from "lucide-react";

const Report = () => {
  const reportRef = useRef(null);

  const handleDownloadReport = () => {
    if (reportRef.current) {
      let reportContent = "";

      // Extract the text content dynamically
      reportRef.current.querySelectorAll("h2, p, li").forEach((el) => {
        reportContent += el.innerText + "\n";
      });

      const blob = new Blob([reportContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "General_Report.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-900 text-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold tracking-wide">📊 General Report</h1>
        <button
          className="flex items-center gap-3 px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          onClick={handleDownloadReport}
        >
          <FileDown size={20} />
          <span className="font-medium">Download Report</span>
        </button>
      </div>

      <div ref={reportRef} className="space-y-8">
        {/* Analytics Overview */}
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-3">
          <h2 className="text-xl font-semibold">📈 Analytics Overview</h2>
          <hr className="border-gray-700" />
          <p><strong>Total Users:</strong> 1,234</p>
          <p><strong>Active Projects:</strong> 56</p>
          <p><strong>Revenue:</strong> $89,000</p>
        </div>

        {/* Team Performance */}
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-3">
          <h2 className="text-xl font-semibold">📊 Team Performance</h2>
          <hr className="border-gray-700" />
          <p><strong>Completed Tasks:</strong> 234</p>
          <p><strong>Pending Tasks:</strong> 12</p>
          <p><strong>Top Performer:</strong> John Doe</p>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-3">
          <h2 className="text-xl font-semibold">📅 Recent Activity</h2>
          <hr className="border-gray-700" />
          <ul className="list-disc pl-6 space-y-2">
            <li>Project Alpha completed</li>
            <li>New user joined: Sarah</li>
            <li>System update applied</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Report;
