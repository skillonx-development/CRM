import React from "react";
import Layout from "./Shared/Layout";
import WorkshopTimeline from "./Widgets/Overview/Timeline";
import CurriculumDesign from "./Widgets/Overview/CurriculumDesign";
import TodaysTasks from "./Widgets/Overview/Todaystask";

const Curriculum = () => {
  return (
    <Layout>
      {/* Main grid layout with 12 columns */}
      <div className="grid grid-cols-12 gap-4 p-6 text-white">
        {/* Curriculum Design Widget - Takes 8 columns */}
        <div className="col-span-12">
          <CurriculumDesign />
        </div>
        
        {/* Workshop Timeline - Takes 4 columns */}
        <div className="col-span-6">
          <WorkshopTimeline />
        </div>
        
        {/* Today's Tasks - Takes 4 columns */}
        <div className="col-span-6">
          <TodaysTasks />
        </div>
      </div>
    </Layout>
  );
};

export default Curriculum;