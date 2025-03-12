import React from "react";
import Layout from "./Shared/Layout";
import Settings from "./Widgets/Settings";

const TechDashboard = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6 ">
          <Settings />

        </div>
      
    </Layout>

  );
};

export default TechDashboard;
