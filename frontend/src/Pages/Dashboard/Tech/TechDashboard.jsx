import React from "react";
import Layout from "./Shared/Layout";
import Analytics from "./Widgets/Overview/Analytics"; 
import WorkshopPerformance from "./Widgets/Overview/WorkshopPerformance";
import RecentProposals from "./Widgets/RecentProposals";
import WorkshopChart from "./Widgets/Overview/WorkshopChart";
const TechDashboard = () => {
    return (
      <Layout>
        {/* Dashboard Grid Layout */}
        <div className="p-6 grid grid-cols-4 gap-6">
          
          {/* Row 1: Analytics (Full Width) */}
          <div className="col-span-4">
            <Analytics />
          </div>

          {/* Row 2: Workshop Performance (Full Width) */}
          <div className="col-span-4 min-h-[400px]">
            <WorkshopPerformance />
          </div>

          {/* Row 3: Recent Proposals & Workshop Chart */}
          <div className="col-span-2">
            <RecentProposals />
          </div>
          
          <div className="col-span-2">
            <WorkshopChart />
          </div>

        </div>
      </Layout>
    );
};

export default TechDashboard;
