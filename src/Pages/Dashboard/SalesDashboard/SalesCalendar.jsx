import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import CalendarSidebar from "./Widgets/CalendarSidebar";
import Calendar from "./Widgets/Calandar";

const SalesRevenue = () => {
  return (
    <Layout>
    {/* Widgets Section */}
    <div className="p-4 ">
          <AnalyticsOverview />
    </div >
    <div className="p-4 flex">
        <CalendarSidebar />
    <div className="p-4 flex-1">
        <Calendar />
    </div>
        
    </div>

    </Layout>
  );
};

export default SalesRevenue;
