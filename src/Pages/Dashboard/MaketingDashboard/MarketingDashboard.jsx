import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import CampaignPerformance from "./Widgets/CampaignPerformance";
import UpcomingEvents from "./Widgets/UpcomingEvents";
import Campaigns from "./Widgets/Campaigns";
import ThreeMonthCalendar from "./Widgets/ThreeMonthCalendar";
const MarketingDashboard = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6">
          <AnalyticsOverview />
         <CampaignPerformance/>
         <ThreeMonthCalendar/>
       
         <Campaigns/>
       
        </div>

     

    </Layout>

  );
};

export default MarketingDashboard;
