import React from "react";

const proposals = [
  { id: 1, client: "Acme Corp", type: "Web Dev", budget: "$5,000", status: "New", received: "2023-03-10", requirements: "Advanced React workshop" },
  { id: 2, client: "TechGiant", type: "Data Science", budget: "$8,000", status: "Draft", received: "2023-03-08", requirements: "Data pipeline optimization" },
  { id: 3, client: "Startup Hub", type: "UI/UX", budget: "$4,000", status: "Ready", received: "2023-03-05", requirements: "Redesign mobile UI" },
];

const ProposalsTable = ({ onSelect }) => {
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
              key={proposal.id}
              className="hover:bg-background-hover cursor-pointer transition"
              onClick={() => onSelect(proposal)}
            >
              <td className="p-3 font-semibold">{proposal.client}</td>
              <td className="p-3">{proposal.type}</td>
              <td className="p-3">{proposal.budget}</td>
              <td className="p-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full 
                  ${proposal.status === "New" ? "bg-status-info text-white" : 
                  proposal.status === "Draft" ? "bg-border-dark text-text-default" : 
                  "bg-status-success text-white"}`}>
                  {proposal.status}
                </span>
              </td>
              <td className="p-3">{proposal.received}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalsTable;
