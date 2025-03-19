import React from "react";
import Layout from "./Shared/Layout";
import ProposalEnhancement from "./Widgets/ProposalEnhancement";



const MarketingDashboard = () => {
  return (
    <Layout>
       <div className="p-6 space-y-6  ">
        {/* Analytics Overview */}
        <ProposalEnhancement />
        </div>
    </Layout>
  );
};

export default MarketingDashboard;
