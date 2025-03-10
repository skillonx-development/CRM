import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import OrderTable from "./Widgets/OrderTable";

const SalesOrders = () => {
  return (
    <Layout>
    {/* Widgets Section */}
    <div className="p-4">
          <AnalyticsOverview />
          <OrderTable />

      </div>
    </Layout>
  );
};

export default SalesOrders;
