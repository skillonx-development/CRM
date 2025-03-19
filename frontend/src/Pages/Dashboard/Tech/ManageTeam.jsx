import React from "react";
import Layout from "./Shared/Layout";
import TeamAnalysis from "./Widgets/ManageTeam/TeamAnalysis";
import TeamMembers from "./Widgets/ManageTeam/TeamMembers";
const ManageTeam = () => {
    return (
      <Layout>
          {/* Widgets Section */}
        <div className="p-6">
          <TeamAnalysis/>
            
          </div>
          <div className="p-6">
          <TeamMembers/>
            
          </div>
          
        
    
  
      </Layout>
  
    );
  };
  
  export default ManageTeam;
  