import React from "react";
import Layout from "./Shared/Layout";
import Analytics from "./Widgets/Overview/Analytics"; 
import WorkshopPerformance from "./Widgets/Overview/WorkshopPerformance";
import RecentProposals from "./Widgets/RecentProposals";
import QuickActions from "./Widgets/QuickaActions";
import RecentActivity from "./Widgets/Overview/RecentActivity";
import Resources from "./Resources";
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

          {/* Row 2: Workshop Performance (3 Columns) & Recent Activity (1 Column) */}
          <div className="col-span-3">
            <WorkshopPerformance />
          </div>
          <div className="col-span-1">
            <RecentActivity />
          </div>

          {/* Row 3: Recent Proposals (2 Columns) & Quick Actions (2 Columns) */}
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
