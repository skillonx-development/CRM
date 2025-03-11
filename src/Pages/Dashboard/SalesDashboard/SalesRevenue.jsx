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
      <div className="p-6 space-y-6"> {/* Balanced spacing */}
        {/* Top Section - Analytics Overview */}
        <AnalyticsOverview />

        {/* Middle Section - Today's Sales & Revenue Insights (Side by Side) */}
        <div className="grid grid-cols-3 gap-6"> {/* Evenly spaced widgets */}
          {/* Left Side: Today's Sales (2/3 width) */}
          <div className="col-span-2">
            <Todaysales />
          </div>
          {/* Right Side: Revenue Insights */}
          <div className="col-span-1">
            <RevenueInsights className="h-[600px]" /> {/* Adjusted height for better alignment */}
          </div>
        </div>

        {/* Bottom Section - Revenue Pie Chart & Revenue Overview (Stacked) */}
        <div className="grid grid-cols-1 gap-6"> {/* Consistent spacing */}
          <RevenuePieChart />
          <RevenueOverviewChart />
        </div>
      </div>
    </Layout>
  );
};

export default SalesRevenue;
