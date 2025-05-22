import React, { useState } from "react";
import ProposalsTable from "./ProposalTable";
import ProposalDetails from "./ProposalDetails";

const ProposalsWidget = () => {
  const [selectedProposal, setSelectedProposal] = useState(null);

  return (
    <div className="min-h-screen bg-background-default p-6 text-text-default">
      <h1 className="text-3xl font-bold mb-4 text-primary">Proposals Dashboard</h1>
      <p className="text-text-muted mb-6">Manage workshop proposals efficiently</p>

      <div className="max-w-6xl mx-auto">
        <div className="bg-background-card p-4 rounded-lg shadow-card">
          <ProposalsTable onSelect={setSelectedProposal} selectedProposal={selectedProposal} />
        </div>
      </div>

      {/* Modal for Proposal Details */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative bg-background-card rounded-lg shadow-lg w-full max-w-2xl mx-4 md:mx-0 p-0">
            <div className="p-6">
              <ProposalDetails proposal={selectedProposal} onClose={() => setSelectedProposal(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalsWidget;
