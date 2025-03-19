import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export default function RecentProposals() {
  const navigate = useNavigate(); // ✅ React Router navigation hook

  const proposals = [
    { client: "Acme Corporation", type: "Web Development", status: "In Progress", color: "bg-blue-500 text-white" },
    { client: "TechGiant Inc.", type: "Data Science", status: "Review", color: "bg-purple-200 text-purple-600" },
    { client: "Startup Hub", type: "UI/UX Design", status: "Pending", color: "bg-yellow-200 text-yellow-800" },
    { client: "Creative Studios", type: "Mobile Development", status: "Completed", color: "bg-green-200 text-green-800" }
  ];

  return (
    <div 
      className="bg-background-card p-6 rounded-xl shadow-card cursor-pointer hover:bg-background-hover transition"
      onClick={() => navigate("/tech/proposal")} // ✅ Corrected navigation
    >
      <h2 className="text-lg font-semibold text-white mb-4">Recent Proposals</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-text-muted uppercase text-sm">
            <th className="pb-2">Client</th>
            <th className="pb-2">Type</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal, index) => (
            <tr key={index} className="border-b border-border-dark last:border-b-0">
              <td className="py-3 text-white font-medium">{proposal.client}</td>
              <td className="py-3 text-text-muted">{proposal.type}</td>
              <td className="py-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${proposal.color}`}>
                  {proposal.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
