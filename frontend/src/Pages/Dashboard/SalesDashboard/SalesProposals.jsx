import React from "react";
import Layout from "./Shared/Layout";
import ProposalTracking from "./Widgets/ProposalTracking";

const SalesProposals = () => {
  return (
    <Layout>
          <div className="p-4 ">
          <ProposalTracking />
    </div >
    </Layout>
  );
};

export default SalesProposals;
