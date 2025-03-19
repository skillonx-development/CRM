import React from "react";
import Layout from "./Shared/Layout";
import StatsWidget from "./Widgets/StatsWidget";
import TeamWidget from "./Widgets/TeamWidget";



const SalesTeam = () => {
  return (
    <Layout>
        {/* Widgets Section */}
        <div className="p-4">
              <StatsWidget />
          </div>
        <div className="p-4">
          <TeamWidget />
        </div>
    </Layout>
  );
};

export default SalesTeam ;