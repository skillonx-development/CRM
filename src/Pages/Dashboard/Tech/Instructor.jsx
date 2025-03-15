import React from "react";
import Layout from "./Shared/Layout";
import AnalyticsOverview from "./Widgets/AnalyticsOverview";
import InstructorManager from "./Widgets/InstructorManager";
import UpcomingWorkshops from "./Widgets/UpcomingWorkshop";
import InstructorAvailability from "./Widgets/InstructorAvailabilty";
// import Instructor1 from "./Widgets/Instructor";
import InstructorOverview from "./Widgets/Instructor/WorkshopAnalytics";
import InstructorData from "./Widgets/Instructor/InstructorData";
import InstructorCalendar from "./Widgets/Instructor/InstructorCalendar"; 
const Instructor = () => {
    return (
      <Layout>
          {/* Widgets Section */}
        <div className="p-6">
            <InstructorOverview />
            {/* <Instructor1 /> */}
            <InstructorData />
           
          </div>
          <div className="col-span-6">
          < InstructorCalendar/>
        </div>
       
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-background-default min-h-screen">
      {/* <InstructorAvailability /> */}
      {/* <UpcomingWorkshops /> */}
    </div>
     
  
      </Layout>
  
    );
  };
  
  export default Instructor;
  