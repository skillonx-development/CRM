"use client";
import { FaStar, FaRegStar, FaThumbsUp, FaReply } from "react-icons/fa";

const feedbackData = [
  {
    id: 1,
    course: "React Fundamentals",
    rating: 5,
    author: "Alex Johnson",
    date: "May 24, 2023",
    comment: "The workshop was incredibly helpful! The instructor broke down complex concepts into digestible pieces. I especially loved the hands-on exercises that reinforced what we learned in the lectures.",
    tags: ["Beginner-friendly", "Hands-on", "Well-structured"],
  },
  {
    id: 2,
    course: "JavaScript Basics",
    rating: 4,
    author: "Sarah Miller",
    date: "May 22, 2023",
    comment: "Good introduction but could have covered more advanced topics towards the end. The exercises were helpful though.",
    tags: ["Clear explanations", "Needs more depth"],
  },
  {
    id: 3,
    course: "Node.js Backend",
    rating: 5,
    author: "Michael Brown",
    date: "May 20, 2023",
    comment: "Excellent workshop on Node.js! The instructor was knowledgeable and patient with questions.",
    tags: ["Informative", "Great instructor"],
  },
];

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < rating ? (
            <FaStar className="text-status-warning" />
          ) : (
            <FaRegStar className="text-status-warning" />
          )}
        </span>
      ))}
      <span className="ml-1 text-text-default">{rating}</span>
    </div>
  );
};

const RecentFeedback = () => {
  return (
    <div className="bg-background-card rounded-lg shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-default">Recent Feedback</h2>
        <a href="#" className="text-status-info hover:underline">View all</a>
      </div>

      <div className="space-y-6">
        {feedbackData.map((feedback) => (
          <div key={feedback.id} className="border-t border-border-dark pt-6 first:pt-0 first:border-t-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium text-text-default">{feedback.course}</h3>
                <div className="flex items-center text-text-muted text-sm">
                  <span>{feedback.author}</span>
                  <span className="mx-2">•</span>
                  <span>{feedback.date}</span>
                </div>
              </div>
              <div className="flex items-center">
                <RatingStars rating={feedback.rating} />
              </div>
            </div>

            <p className="text-text-default mt-2 mb-3">
              {feedback.comment.length > 100 
                ? `${feedback.comment.substring(0, 100)}...` 
                : feedback.comment}
            </p>
            
            {feedback.comment.length > 100 && (
              <button className="text-status-info text-sm mb-3">Show more</button>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {feedback.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-xs rounded-full bg-background-hover text-text-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-text-muted">
              <button className="flex items-center text-sm hover:text-text-default">
                <FaThumbsUp className="mr-1" /> Helpful
              </button>
              <button className="flex items-center text-sm hover:text-text-default">
                <FaReply className="mr-1" /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFeedback;