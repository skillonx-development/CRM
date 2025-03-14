import React from "react";
import Layout from "./Shared/Layout";
import OrderManagement from "./Widgets/OrderManagement";


const SalesOrders = () => {
  return (
    <Layout>
        <div className="p-6 ">
          <OrderManagement />
        </div>
    </Layout>
  );
};

export default SalesOrders;
