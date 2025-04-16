import React from "react";
import Layout from "./Shared/Layout";
import TeacherManagement from "./Widgets/TeacherManagement";
import Teachers from "./Widgets/Teachers";
import TeacherAvailability from "./Widgets/TeacherAvailability";

const MarketingDashboard = () => {
  return (
    <Layout>
        <div className="p-6 space-y-6  ">
        {/* Analytics Overview */}
        <TeacherManagement />

        <div className="flex gap-6" >
        <Teachers />
        <TeacherAvailability className="flex-1"/>
        </div>
        </div>
    </Layout>
  );
};

export default MarketingDashboard;
