import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

// Feedback data
const feedbackData = [
  {
    title: "React Workshop",
    institution: "Tech University",
    date: "2023-05-15",
    feedback: "Excellent workshop! The hands-on exercises were very helpful.",
    user: "John Smith",
    rating: 4.8,
  },
  {
    title: "UI/UX Design Masterclass",
    institution: "Design Academy",
    date: "2023-06-10",
    feedback: "Great content but could use more practical examples.",
    user: "Sarah Johnson",
    rating: 4.5,
  },
  {
    title: "Data Science Fundamentals",
    institution: "Analytics College",
    date: "2023-07-05",
    feedback: "The instructor was very knowledgeable and explained complex concepts clearly.",
    user: "Michael Chen",
    rating: 4.9,
  },
  {
    title: "Mobile App Development",
    institution: "Digital University",
    date: "2023-07-20",
    feedback: "Good workshop, but could be better structured.",
    user: "Emily Rodriguez",
    rating: 4.2,
  },
  {
    title: "Cloud Computing",
    institution: "IT Institute",
    date: "2023-08-08",
    feedback: "Very comprehensive coverage of the topic. The workshop materials were excellent.",
    user: "David Wilson",
    rating: 4.7,
  },
  {
    title: "AI and Machine Learning",
    institution: "Future Academy",
    date: "2023-08-15",
    feedback: "Challenging but rewarding. Would recommend to others.",
    user: "Lisa Thompson",
    rating: 4.6,
  },
];

// Tab options
const tabs = ["All Feedback", "Recent", "Highest Rated", "Lowest Rated"];

const FeedbackList = () => {
  const [activeTab, setActiveTab] = useState("All Feedback");

  // Function to get sorted feedback
  const getSortedFeedback = () => {
    let sortedFeedback = [...feedbackData];

    switch (activeTab) {
      case "Recent":
        return sortedFeedback.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "Highest Rated":
        return sortedFeedback.sort((a, b) => b.rating - a.rating);
      case "Lowest Rated":
        return sortedFeedback.sort((a, b) => a.rating - b.rating);
      default:
        return feedbackData;
    }
  };

  return (
    <div className="p-6 bg-background-default text-text-default">
      {/* Tabs Section */}
      <div className="flex gap-4 mb-4 border-b border-border-dark pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm rounded-md transition ${
              activeTab === tab
                ? "font-bold text-text-default bg-background-card"
                : "text-text-muted hover:text-text-default"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Feedback Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getSortedFeedback().map((item, index) => (
          <div key={index} className="bg-background-card p-4 rounded-lg shadow-card">
            {/* Title & Institution */}
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm text-text-muted">
              {item.institution} - {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            {/* Feedback Text */}
            <p className="mt-2 italic text-text-default">"{item.feedback}"</p>

            {/* User Name */}
            <p className="mt-2 text-sm text-text-muted">- {item.user}</p>

            {/* Rating Badge */}
            <div className="mt-3 flex items-center justify-end">
              <span className="flex items-center bg-status-info text-white px-3 py-1 rounded-full text-sm font-semibold">
                {item.rating} <FaStar className="ml-1 text-white" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
