import React from "react";
import Layout from "./Shared/Layout";
import HelpCenter from "../SalesDashboard/Widgets/HelpCenter";
const TechHelp = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6 mt">
          <HelpCenter />
      </div>

    </Layout>

  );
};

export default TechHelp;
