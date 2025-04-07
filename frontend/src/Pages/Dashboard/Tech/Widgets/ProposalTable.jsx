import React, { useEffect, useState } from "react";
import axios from "axios";

const ProposalsTable = ({ onSelect }) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/proposals");
        setProposals(response.data.proposals);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  const formatBudget = (price) => `$${Number(price).toLocaleString()}`;
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US");

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500 text-white";
      case "Draft":
        return "bg-gray-300 text-gray-800";
      case "Ready":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-background-card p-6 shadow-card rounded-lg text-text-default">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Proposals</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-background-hover text-text-default">
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Budget</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Received</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr
              key={proposal._id}
              className="hover:bg-background-hover cursor-pointer transition"
              onClick={() => onSelect(proposal)}
            >
              <td className="p-3 font-semibold">{proposal.institution}</td>
              <td className="p-3">{proposal.title}</td>
              <td className="p-3">{formatBudget(proposal.price)}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(
                    proposal.status
                  )}`}
                >
                  {proposal.status}
                </span>
              </td>
              <td className="p-3">{formatDate(proposal.scheduleDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalsTable;
