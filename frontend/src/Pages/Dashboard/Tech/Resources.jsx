import React from "react";
import Layout from "./Shared/Layout";
import ResourceManager from "./Widgets/Resources/ResourceManager";
const Resources = () => {
    return (
      <Layout>
          {/* Widgets Section */}
        <div className="p-6">
            <ResourceManager/>
            
          </div>
      </Layout>
  
    );
  };
  
  export default Resources;
  