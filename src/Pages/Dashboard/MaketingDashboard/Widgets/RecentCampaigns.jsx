import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const campaigns = [
  { title: "Latest marketing activities and status", date: "22 DEC 7:20 PM" },
  { title: "Social media engagement campaign active", date: "21 DEC 9:28 PM" },
  { title: "Paid Advertising", date: "20 DEC 3:52 PM" },
  { title: "Email Marketing Campaigns", date: "19 DEC 11:35 PM" },
  { title: "International Campaigns", date: "18 DEC 4:41 PM" },
  { title: "Paid Advertising", date: "20 DEC 3:52 PM" },

  
];

const RecentCampaigns = () => {
  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card">
      <h2 className="flex items-center text-xl font-semibold text-text-default mb-4">
        <FaCheckCircle className="text-status-success mr-2" /> Recent Campaigns
      </h2>
      <ul className="space-y-4">
        {campaigns.map((campaign, index) => (
          <li key={index} className="text-text-default">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-chart-yellow rounded-full mr-3"></span>
              {campaign.title}
            </div>
            <p className="text-text-muted text-sm ml-6">{campaign.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCampaigns;
