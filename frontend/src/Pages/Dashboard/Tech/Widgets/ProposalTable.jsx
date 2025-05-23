import React, { useEffect, useState } from "react";
import axios from "axios";

const ProposalsTable = ({ onSelect }) => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get("/api/proposals");
        setProposals(response.data.proposals);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const formatBudget = (price) => `₹${Number(price).toLocaleString("en-IN")}`;
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500 text-white";
      case "Draft":
        return "bg-gray-300 text-gray-800";
      case "Ready":
        return "bg-green-500 text-white";
      case "Sent":
        return "bg-purple-500 text-white";
      case "Accepted":
        return "bg-green-600 text-white";
      case "Lead Acquired":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) {
    return <div>Loading proposals...</div>;
  }

  return (
    <div className="bg-background-card p-6 shadow-card rounded-lg text-text-default">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Proposals</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-background-hover text-text-default">
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Budget</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Scheduled</th>
            </tr>
          </thead>
          <tbody>
            {proposals.length > 0 ? (
              proposals.map((proposal) => (
                <tr
                  key={proposal._id}
                  className="hover:bg-background-hover cursor-pointer transition"
                  onClick={() => onSelect(proposal)}
                >
                  <td className="p-3 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{proposal.institution}</td>
                  <td className="p-3 whitespace-nowrap overflow-hidden text-ellipsis">{proposal.title}</td>
                  <td className="p-3 whitespace-nowrap overflow-hidden text-ellipsis">{formatBudget(proposal.price)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap overflow-hidden text-ellipsis">{formatDate(proposal.scheduleDate)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">No proposals available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProposalsTable;
