import React from "react";
import Layout from "./Shared/Layout";
import MarketingOverview from "./Widgets/MarketingOverview";
import ProposalsOverview from "./Widgets/ProposalsOverview";
import WorkshopCards from "./Widgets/WorkshopCards";

const MarketingDashboard = () => {
  return (
    <Layout>
      <div className="p-2 md:p-4 w-full">
        <div className="grid gap-4 w-full">
          <div className="col-span-full">
            <MarketingOverview />
          </div>

          <div className="col-span-full">
            <ProposalsOverview />
          </div>

          <div className="col-span-full">
            <WorkshopCards />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketingDashboard;
