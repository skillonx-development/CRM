import React from "react";
import { FaFilter, FaSort, FaCommentDots } from "react-icons/fa";

const FeedbackHeader = () => {
  return (
    <div className="p-6 bg-background-default text-text-default rounded-lg shadow-card">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Feedback Collection</h1>
          <p className="text-text-muted">Gather and analyze student feedback for workshop improvement</p>
        </div>
        <button className="flex items-center gap-2 bg-status-info text-white px-4 py-2 rounded-md hover:bg-status-info/90 transition">
          <FaCommentDots />
          Request Feedback
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="Search feedback..." 
          className="w-full px-4 py-2 rounded-md bg-background-card text-text-default border border-border-dark focus:outline-none"
        />

        {/* Filter Button */}
        <button className="p-2 bg-background-card text-text-muted rounded-md hover:bg-background-hover">
          <FaFilter />
        </button>

        {/* Sort Button */}
        <button className="p-2 bg-background-card text-text-muted rounded-md hover:bg-background-hover">
          <FaSort />
        </button>

        {/* Category Dropdown */}
        <select className="px-4 py-2 rounded-md bg-background-card text-text-default border border-border-dark">
          <option>Workshop</option>
          <option>Course</option>
          <option>Instructor</option>
        </select>
      </div>
    </div>
  );
};

export default FeedbackHeader;
