import React from "react";
import Layout from "./Shared/Layout";
import FeedbackAnalysis from "../AdminDashboard/Widgets/FeedbackAnalysis";
// import TopWorkshops from "./Widgets/Feedback/TopWorkshops";
// import RecentFeedback from "./Widgets/Feedback/RecentFeedback";
const Feedback = () => {
    return (
      <Layout>
          {/* Widgets Section */}
      
          <div className="p-6">
            <FeedbackAnalysis />
          
          </div>
          <div className="p-6">
        
           <Rating/>
           
          </div>
      
          <div className="p-6">
        
           {/* <RecentFeedback/> */}
          </div>
  
      </Layout>
  
    );
  };
  
  export default Feedback;
  