import React from "react";
import Layout from "./Shared/Layout";
import DashboardAnalytics from "./Widgets/DashboardAnalytics";
import FeedbackAnalysis from "./Widgets/Feedback/FeedbackAnalysis";
import Ratings from "./Widgets/Feedback/Rating";
import TopWorkshops from "./Widgets/Feedback/TopWorkshops";
import RecentFeedback from "./Widgets/Feedback/RecentFeedback";
const Feedback = () => {
    return (
      <Layout>
          {/* Widgets Section */}
      
          <div className="p-6">
            <FeedbackAnalysis />
          
          </div>
          <div className="p-6">
        
           <Ratings/>
           
          </div>
      
          <div className="p-6">
        
           <RecentFeedback/>
          </div>
  
      </Layout>
  
    );
  };
  
  export default Feedback;
  