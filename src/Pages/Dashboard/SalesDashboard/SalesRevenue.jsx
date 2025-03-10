import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import Todaysales from "./Widgets/Todaysales";
import RevenueInsights from "./Widgets/RevenueInsights";
import RevenuePieChart from "./Widgets/RevenuePieChart";
import RevenueOverviewChart from "./Widgets/RevenueOverviewChart";

const SalesRevenue = () => {
  return (
    <Layout>
    {/* Widgets Section */}
    <div className="p-4">
          <AnalyticsOverview />
          <div className="p-6">
    {/* Flexbox layout with spacing */}
  <div className="flex gap-4"> 
    <Todaysales className="flex-1" /> 
    <RevenueInsights /> 

  </div>
    {/* Revenue Pie Chart Below */}
    <div className="mt-6 p-6 ">
            <RevenuePieChart />
          </div>
      {/* Revenue Pie Chart Below */}
    <div className="mt-6 p-6 ">
            <RevenueOverviewChart />
          </div>
      </div>

      </div>
    </Layout>
  );
};

export default SalesRevenue;
