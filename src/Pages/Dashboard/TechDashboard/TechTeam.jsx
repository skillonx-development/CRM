import React from "react";
import Layout from "./Shared/Layout";
import TeamMembers from "./Widgets/TeamMembers";

const TechTeam = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6 ">
          <TeamMembers />
        </div>
    </Layout>

  );
};

export default TechTeam;
