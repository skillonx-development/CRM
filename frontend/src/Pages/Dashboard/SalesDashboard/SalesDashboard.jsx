import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import ActiveOrders from "./Widgets/ActiveOrders";
import RecentProposals from "./Widgets/RecentProposals";

const SalesDashboard = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Analytics Overview */}
        <AnalyticsOverview />

        {/* Active Orders & Notifications */}
        <div className="flex gap-6 ml-5">
          <div className="w-full">
            <ActiveOrders />
          </div>
        </div>

        {/* Recent Proposals */}
        <div>
          <RecentProposals />
        </div>
      </div>
    </Layout>
  );
};

export default SalesDashboard;
