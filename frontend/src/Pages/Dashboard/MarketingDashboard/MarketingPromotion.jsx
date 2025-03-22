import React from "react"; 
import Layout from "./Shared/Layout";
import PromotionHeader from "./Widgets/PromotionHeader";
import CampaignPerformance from "./Widgets/CampaignPerformance";
import AudienceInsights from "./Widgets/AudienceInsights";
import ActiveCampaigns from "./Widgets/ActiveCampaigns";
import RecentCampaigns from "./Widgets/RecentCamapaigns";
import InstagramBanner from "./Widgets/InstagramBanner";

const MarketingPromotion = () => {
  return (
    <Layout>
      {/* Header Section */}
      <div className="p-6">
        <PromotionHeader />
      </div>

      {/* Performance & Insights Section - Equal Height Fix */}
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="h-full bg-background-card p-4 rounded-lg shadow-card">
            <CampaignPerformance />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col">
          <div className="h-full bg-background-card p-4 rounded-lg shadow-card">
            <AudienceInsights />
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="p-6">
        <ActiveCampaigns />
      </div>
      <div className="p-6">
        <RecentCampaigns />
      </div>
      <div className="p-6">
        <InstagramBanner />
      </div>
    </Layout>
  );
};

export default MarketingPromotion;
