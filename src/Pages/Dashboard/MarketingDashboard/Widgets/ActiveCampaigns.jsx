import React from "react";

const campaigns = [
  {
    title: "Summer Workshop Promotion",
    description: "Increase enrollment for our summer design workshop series.",
    reach: "12,500",
    conversions: 42,
  },
  {
    title: "Product Launch Ad",
    description: "Drive awareness and sign-ups for our new product launch.",
    reach: "8,900",
    conversions: 30,
  },
  {
    title: "Holiday Sale Campaign",
    description: "Boost holiday sales with special discounts and promotions.",
    reach: "15,300",
    conversions: 55,
  },
];

const ActiveCampaigns = () => {
  return (
    <div className="bg-background-default p-6 rounded-lg shadow-card">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-text-default">Active Campaigns</h2>
        <a href="#" className="text-primary hover:underline text-sm">
          View all &rarr;
        </a>
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-background-card p-4 rounded-lg flex justify-between items-center shadow-md">
            <div>
              <h3 className="font-semibold text-text-default">{campaign.title}</h3>
              <p className="text-text-muted text-sm">{campaign.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-background-hover px-3 py-1 rounded-lg text-center text-sm">
                <p className="text-text-muted">Reach</p>
                <p className="font-bold text-text-default">{campaign.reach}</p>
              </div>
              <div className="bg-background-hover px-3 py-1 rounded-lg text-center text-sm">
                <p className="text-text-muted">Conv.</p>
                <p className="font-bold text-text-default">{campaign.conversions}</p>
              </div>
              <button className="bg-primary text-white px-4 py-1.5 rounded-lg text-sm hover:bg-primary-dark transition">
                Optimize
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCampaigns;
