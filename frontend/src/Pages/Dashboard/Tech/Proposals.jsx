import React from "react";
import Layout from "./Shared/Layout";
import ProposalAnalytics from "./Widgets/ProposalAnalytics";
import ProposalWidget from "./Widgets/ProposalWidget";
const Proposals = () => {
    return (
      <Layout>
          {/* Widgets Section */}
        <div className="p-6">
            <ProposalAnalytics/>
           
          </div>
       
        <div className="p-6  min-h-screen text-white">
        <ProposalWidget />
       
        </div>
        {/* <div className="p-6  min-h-screen text-white">
        <QuickActions />
       
        </div> */}
  
      </Layout>
  
    );
  };
  
  export default Proposals;
  