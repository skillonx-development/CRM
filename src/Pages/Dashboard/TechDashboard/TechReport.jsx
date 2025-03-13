import React from "react";
import Layout from "./Shared/Layout";
import Report from "./Widgets/Report";

const TechTeam = () => {
  return (
    <Layout>
        {/* Widgets Section */}
      <div className="p-6 ">
          <Report />
        </div>
    </Layout>

  );
};

export default TechTeam;
