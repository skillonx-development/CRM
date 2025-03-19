import React from "react";
import Layout from "./Shared/Layout";
import Settings from "../SalesDashboard/Widgets/Settings";


const MarketingSettings = () => {
  return (
    <Layout>
    {/* Widgets Section */}
    <div className="p-4">
          <Settings />

      </div>
    </Layout>
  );
};

export default MarketingSettings;
