import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "../SalesDashboard/Widgets/AnalyticsOverview";
import ProjectPerformance from "./Widgets/ProjectPerformance";
import RecentActivity from "./Widgets/RecentActivity";
import KanbanBoard from "./Widgets/KanbanBoard";

const TechDashboard = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6 ">
          <AnalyticsOverview />
          <ProjectPerformance />
        </div>
        <div className="p-6">
          <RecentActivity />
        </div>
        <div className="p-6">
          <KanbanBoard />
        </div>
    </Layout>

  );
};

export default TechDashboard;
