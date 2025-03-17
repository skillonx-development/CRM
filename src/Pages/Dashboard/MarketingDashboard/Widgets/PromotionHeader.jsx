import React, { useState } from "react";
import CreateCampaign from "./CreateCampaign"; // Import the modal component

const PromotionHeader = () => {
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  return (
    <div className="p-6 bg-background-card shadow-card rounded-lg text-text-default">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Instagram Promotions</h1>
          <p className="text-text-muted">Create and manage your Instagram ad campaigns</p>
        </div>
        <button
          className="bg-primary px-4 py-2 rounded-md hover:bg-primary-dark transition"
          onClick={() => setShowModal(true)} // Open modal on click
        >
          + Create Campaign
        </button>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-background-hover rounded-lg text-center shadow-card">
          <p className="text-text-muted">Total Reach</p>
          <h2 className="text-xl font-bold">124,500</h2>
          <p className="text-status-success text-sm">▲ 12.5%</p>
        </div>

        <div className="p-4 bg-background-hover rounded-lg text-center shadow-card">
          <p className="text-text-muted">Engagement Rate</p>
          <h2 className="text-xl font-bold">4.8%</h2>
          <p className="text-status-success text-sm">▲ 2.1%</p>
        </div>

        <div className="p-4 bg-background-hover rounded-lg text-center shadow-card">
          <p className="text-text-muted">Click Rate</p>
          <h2 className="text-xl font-bold">2.3%</h2>
          <p className="text-status-success text-sm">▲ 0.8%</p>
        </div>

        <div className="p-4 bg-background-hover rounded-lg text-center shadow-card">
          <p className="text-text-muted">Conversion Rate</p>
          <h2 className="text-xl font-bold">1.2%</h2>
          <p className="text-status-error text-sm">▼ -0.3%</p>
        </div>
      </div>

      {/* Render CreateCampaign Modal if showModal is true */}
      {showModal && <CreateCampaign onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PromotionHeader;
