import React from "react";
import Layout from "./Shared/Layout";
import WorkshopTimeline from "./Widgets/Overview/Timeline";
import CurriculumDesign from "./Widgets/Overview/CurriculumDesign";
import TodaysTasks from "./Widgets/Overview/Todaystask";
import WorkshopSchedule from "./Widgets/Resources/WorkshopSchedule";
const Curriculum = () => {
  return (
    <Layout>
      <div className="grid grid-cols-12 gap-2 p-6 text-white items-start">
  {/* Curriculum Design - Takes 8 columns */}
  <div className="col-span-8 flex flex-col h-full">
    <CurriculumDesign className="h-full" />
  </div>

  {/* Workshop Timeline - Takes 4 columns */}
  <div className="col-span-4 flex flex-col h-full">
    <WorkshopTimeline className="h-full" />
  </div>

  {/* Today's Tasks - Remove extra space */}
  <div className="col-span-12 mt-2">
  <WorkshopSchedule/>
  </div>
</div>

      
    </Layout>
  );
};

export default Curriculum;
