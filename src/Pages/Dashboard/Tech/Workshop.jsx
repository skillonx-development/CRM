import React from "react";
import Layout from "./Shared/Layout";
import DashboardAnalytics from "./Widgets/DashboardAnalytics";
import ResourceManager from "./Widgets/Resources/ResourceManager";
import WorkshopSchedule from "./Widgets/Resources/WorkshopSchedule";
const Workshop = () => {
    return (
      <Layout>
          {/* Widgets Section */}
        <div className="p-6">
            <DashboardAnalytics />
            <ResourceManager/>
            <WorkshopSchedule/>
          </div>
       
      
        
  
      </Layout>
  
    );
  };
  
  export default Workshop;
  