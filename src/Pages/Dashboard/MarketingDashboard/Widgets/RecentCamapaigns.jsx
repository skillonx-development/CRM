import React from "react";
import workshop from "../Assets/RecentCampaigns/workshop.png"
import webinar from "../Assets/RecentCampaigns/webinar.png"
import ux from "../Assets/RecentCampaigns/ux.png"
import ux2 from "../Assets/RecentCampaigns/ux2.png"


const campaigns = [
  {
    title: "Summer Workshop",
    description: "Increase enrollment for our summer design workshop.",
    image: workshop, // Replace with actual image URL
    status: "Active",
    statusColor: "bg-green-500",
    date: "1/6/2023 - 30/6/2023",
    reach: "12,500",
    clicks: "830",
    conversions: "42",
  },
  {
    title: "UX Course Launch",
    description: "Promote our new advanced UX course.",
    image: ux,
    status: "Scheduled",
    statusColor: "bg-blue-500",
    date: "15/7/2023 - 15/8/2023",
    reach: "0",
    clicks: "0",
    conversions: "0",
  },
  {
    title: "Webinar Promotion",
    description: "Drive registrations for our upcoming product webinar.",
    image: webinar,
    status: "Completed",
    statusColor: "bg-gray-500",
    date: "1/5/2023 - 15/5/2023",
    reach: "8,700",
    clicks: "560",
    conversions: "128",
  },
  {
    title: "UI Masterclass",
    description: "Promote our comprehensive UI masterclass.",
    image: ux2,
    status: "Draft",
    statusColor: "bg-yellow-500",
    date: "10/8/2023 - 10/9/2023",
    reach: "0",
    clicks: "0",
    conversions: "0",
  },
];

const RecentCampaigns = () => {
  return (
    <div className="bg-background-default p-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-text-default">Recent Campaigns</h2>
        <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition">
          View all campaigns
        </button>
      </div>

      {/* Campaign List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-background-card rounded-lg shadow-lg overflow-hidden">
            {/* Image */}
            <img src={campaign.image} alt={campaign.title} className="w-full h-40 object-cover" />

            {/* Campaign Details */}
            <div className="p-4">
              <span className={`${campaign.statusColor} text-white px-2 py-1 text-xs rounded-full`}>
                {campaign.status}
              </span>
              <h3 className="mt-2 font-semibold text-text-default">{campaign.title}</h3>
              <p className="text-sm text-text-muted">{campaign.description}</p>

              {/* Date */}
              <div className="flex items-center text-xs text-text-muted mt-2">
                📅 {campaign.date}
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center mt-3 text-xs">
                <div className="text-center">
                  <p className="text-text-muted">Reach</p>
                  <p className="font-bold text-text-default">{campaign.reach}</p>
                </div>
                <div className="text-center">
                  <p className="text-text-muted">Clicks</p>
                  <p className="font-bold text-text-default">{campaign.clicks}</p>
                </div>
                <div className="text-center">
                  <p className="text-text-muted">Conv.</p>
                  <p className="font-bold text-text-default">{campaign.conversions}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCampaigns;
