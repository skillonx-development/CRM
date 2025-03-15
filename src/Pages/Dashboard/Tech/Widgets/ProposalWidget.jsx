import React, { useState } from "react";
import ProposalsTable from "./ProposalTable";
import ProposalDetails from "./ProposalDetails";

const ProposalsWidget = () => {
  const [selectedProposal, setSelectedProposal] = useState(null);

  return (
    <div className="min-h-screen bg-background-default p-6 text-text-default">
      <h1 className="text-3xl font-bold mb-4 text-primary">Proposals Dashboard</h1>
      <p className="text-text-muted mb-6">Manage workshop proposals efficiently</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Proposals Table Section */}
        <div className="md:col-span-2 bg-background-card p-4 rounded-lg shadow-card">
          <ProposalsTable onSelect={setSelectedProposal} selectedProposal={selectedProposal} />
        </div>

        {/* Proposal Details Section */}
        <div className="bg-background-card p-4 rounded-lg shadow-card">
          <ProposalDetails proposal={selectedProposal} />
        </div>
      </div>
    </div>
  );
};

export default ProposalsWidget;
