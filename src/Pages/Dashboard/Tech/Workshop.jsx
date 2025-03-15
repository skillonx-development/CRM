import React from "react";
import Layout from "./Shared/Layout";
import DashboardAnalytics from "./Widgets/DashboardAnalytics";


const Workshop = () => {
    return (
      <Layout>
          {/* Widgets Section */}
        <div className="p-6">
            <DashboardAnalytics />
           
          </div>
       
      
        
  
      </Layout>
  
    );
  };
  
  export default Workshop;
  