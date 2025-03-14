import React from "react";
import Layout from "./Shared/Layout";
import LeadManagement from "./Widgets/LeadManagement"

const SalesLead = () => {
  return (
    <Layout>
    {/* Widgets Section */}
    <div className="p-4 ">
          <LeadManagement />
    </div >

    </Layout>
  );
};

export default SalesLead;
