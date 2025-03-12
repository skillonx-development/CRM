import React from "react";
import Layout from "./Shared/Layout";
import Help from "./Widgets/Help";
const SalesDashboard = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6 mt">
          <Help />
      </div>

    </Layout>

  );
};

export default SalesDashboard;
