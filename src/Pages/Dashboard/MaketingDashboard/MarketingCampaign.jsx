import React from "react"; 
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import CampaignMetrics from "./Widgets/CampaignMetrics";
import RecentCampaigns from "./Widgets/RecentCampaigns";
import AllCampaigns from "./Widgets/AllCampaigns";
const MarketingCampaign = () => {
  return (
    <Layout>
      {/* Widgets Section */}
      <div className="p-6 space-y-6">
        {/* Analytics Overview - Full Width */}
        <AnalyticsOverview />

        {/* Campaign Metrics & Recent Campaigns Side by Side */}
        <div className="flex flex-wrap gap-6">
          {/* Left: Campaign Metrics */}
          <div className="flex-1 min-w-[300px]">
            <CampaignMetrics />
          </div>

          {/* Right: Recent Campaigns */}
          <div className="flex-1 min-w-[300px]">
            <RecentCampaigns />
          </div>

        </div>
      </div>
      <AllCampaigns/>
    </Layout>
  );
};

export default MarketingCampaign;
