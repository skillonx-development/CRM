import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecentProposals() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);

  // ✅ Fetch data from the backend
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get("https://crm-4xul.onrender.com/api/proposals"); // Update the endpoint if needed
        setProposals(response.data.proposals); 
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  // ✅ Function to get status color dynamically
  const getStatusColor = (status) => {
    switch (status) {
      case "Lead Acquired":
        return "bg-blue-500 text-white";
      case "Proposal Sent":
        return "bg-purple-200 text-purple-600";
      case "Accpeted":
        return "bg-green-200 text-yellow-800";
      case "Rejected":
        return "bg-red-230 text-white-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div 
      className="bg-background-card p-6 rounded-xl shadow-card cursor-pointer hover:bg-background-hover transition"
      onClick={() => navigate("/tech/proposals")}
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
          {proposals.map((proposal) => (
            <tr key={proposal._id} className="border-b border-border-dark last:border-b-0">
              <td className="py-3 text-white font-medium">{proposal.institution}</td>
              <td className="py-3 text-text-muted">{proposal.title}</td>
              <td className="py-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
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
