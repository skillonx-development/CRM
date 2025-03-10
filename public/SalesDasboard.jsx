import React from "react";
import Layout from "./Shared/layout";
import AnalyticsOverview from "../MarkatingDashboard/Widgets/AnalyticsOverview";
import AnalyticsChart from "./Widgets/AnalyticsChart";
import ProjectTable from "./Widgets/projecttable";
import RecentActivity from "./Widgets/RecentActivity";

const SalesDashboard = () => {
  return (
    <Layout>

      {/* Widgets Section */}
      <div className="p-4">
          <AnalyticsOverview />
          <AnalyticsChart />

        <div className="p-8  min-h-screen text-white">
      {/* Add the ProjectTable component */}
      <ProjectTable />
      <div className="py-6   text-white"></div>
      <RecentActivity />
      </div>
      </div>

    </Layout>

  );
};

export default SalesDashboard;
