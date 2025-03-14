import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import ActiveOrders from "./Widgets/ActiveOrders";
import Notifications from "./Widgets/Notifications";
import RecentProposals from "./Widgets/RecentProposals";

const SalesDashboard = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6 mt">
          <AnalyticsOverview />
        </div>
      {/* Add the ProjectTable component */}
      <div className="p-6 flex gap-6">
        <div className="w-3/5">
          <ActiveOrders />
        </div>
        <div className="w-2/5">
          <Notifications />
        </div>
      </div>
      <div className="w-3/5">
        <RecentProposals />
      </div>

    </Layout>

  );
};

export default SalesDashboard;
