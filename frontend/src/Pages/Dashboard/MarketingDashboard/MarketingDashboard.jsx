import React from "react";
import Layout from "./Shared/Layout";
import MarketingOverview from "./Widgets/MarketingOverview";
import ProposalsOverview from "./Widgets/ProposalsOverview";
import UpcomingWorkshop from "./Widgets/UpcomingWorkshop";
import WorkshopCards from "./Widgets/WorkshopCards";
import PendingTasks from "./Widgets/PendingTasks";

const MarketingDashboard = () => {
  return (
    <Layout>
        <div className="p-6 space-y-6  ">
        {/* Analytics Overview */}
        <MarketingOverview />

        <div className="flex gap-6" >
        <ProposalsOverview />
        <UpcomingWorkshop className="flex-1"/>
        </div>

        <div className="flex gap-6" >
        <WorkshopCards />
        <PendingTasks className="flex-1"/>
        </div>

        </div>
    </Layout>
  );
};

export default MarketingDashboard;
