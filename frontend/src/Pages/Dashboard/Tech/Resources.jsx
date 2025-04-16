import React from "react";
import Layout from "./Shared/Layout";
import ResourceManager from "./Widgets/Resources/ResourceManager";
import TodaysTasks from "./Widgets/Overview/Todaystask";
const Resources = () => {
    return (
      <Layout>
          {/* Widgets Section */}
        <div className="p-6">
            <ResourceManager/>
            <TodaysTasks/>
            
          </div>
      </Layout>
  
    );
  };
  
  export default Resources;
  