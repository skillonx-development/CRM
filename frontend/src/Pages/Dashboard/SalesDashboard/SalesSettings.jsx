import React from "react";
import Layout from "./Shared/Layout";
import Settings from "./Widgets/Settings";


const SalesSettings = () => {
  return (
    <Layout>
    {/* Widgets Section */}
    <div className="p-4">
          <Settings />

      </div>
    </Layout>
  );
};

export default SalesSettings;
