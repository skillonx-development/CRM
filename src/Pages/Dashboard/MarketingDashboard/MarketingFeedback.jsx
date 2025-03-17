import React from "react";
import Layout from "./Shared/Layout";
import FeedbackHeader from "./Widgets/FeedbackHeader";
import FeedbackList from "./Widgets/FeedbackList";
import FeedbackChart from "./Widgets/FeedbackChart";
import QuickActions from "./Widgets/QuickActions";

const MarketingFeedback = () => {
  return (
    <Layout>
      {/* Widgets Section */}
      <div className="p-6">
        <FeedbackHeader />
      </div>

      <div className="p-6 flex">
        {/* Feedback List on the Left */}
        <div className="flex-1">
          <FeedbackList />
        </div>

        {/* Right-Side Widgets */}
        <div className="w-1/3 flex flex-col gap-6">
          <FeedbackChart />
          <QuickActions />
        </div>
      </div>
    </Layout>
  );
};

export default MarketingFeedback;
