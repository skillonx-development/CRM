import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import AnalyticsChart from "./Widgets/AnalyticsChart";
import ProjectTable from "./Widgets/projecttable";
import RecentActivity from "./Widgets/RecentActivity";

const SalesDashboard = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6">
          <AnalyticsOverview />
          <AnalyticsChart />
        </div>
      {/* Add the ProjectTable component */}
      <div className="p-6  min-h-screen text-white">
      <ProjectTable />
      <div className="py-6   text-white">
      </div>
      <RecentActivity />
      </div>

    </Layout>

  );
};

export default SalesDashboard;
