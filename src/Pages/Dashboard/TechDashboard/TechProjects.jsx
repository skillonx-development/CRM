import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "../SalesDashboard/Widgets/AnalyticsOverview";
import ProductList from "./Widgets/ProductList";

const TechProjects = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6 ">
          <AnalyticsOverview />
          <ProductList />
        </div>
       
    </Layout>

  );
};

export default TechProjects;
