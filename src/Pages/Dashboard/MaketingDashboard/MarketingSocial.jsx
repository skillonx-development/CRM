import React from "react"; 
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import PlatformPerformance from "./Widgets/PlatformPerformance";
import TopPosts from "./Widgets/TopPosts";
const MarketingSocial = () => {
  return (
    <Layout>
      {/* Widgets Section */}
      <div className="p-6 space-y-6">
        {/* Analytics Overview - Full Width */}
        <AnalyticsOverview />
        <PlatformPerformance/>
        <TopPosts/>

       

       
      </div>
   
    </Layout>
  );
};

export default MarketingSocial;
