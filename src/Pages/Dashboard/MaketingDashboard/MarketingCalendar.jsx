import React from "react"; 
import Layout from "./Shared/Layout";
import Calendar from "../SalesDashboard/Widgets/Calandar";
import CalendarSidebar from "./Widgets/CalendarSidebar";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
const MarketingCalendar= () => {
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

export default MarketingCalendar;
