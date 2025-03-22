import React, { useState } from "react";

const InstructorDetails = ({ instructor }) => {
  const [activeTab, setActiveTab] = useState("info");

  if (!instructor) {
    return <p className="text-text-muted p-4">Select an instructor to view details.</p>;
  }

  return (
    <div className="w-full md:w-2/3 bg-background-card text-text-default p-6 rounded-lg shadow-card">
      {/* Tabs Section */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`flex items-center px-4 py-2 rounded-lg shadow ${
            activeTab === "info" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("info")}
        >
          <span className="mr-2">ℹ️</span> Info
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-lg shadow ${
            activeTab === "availability" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("availability")}
        >
          <span className="mr-2">📅</span> Availability
        </button>
      </div>

      {/* Info Section */}
      {activeTab === "info" && (
        <>
          {/* Profile Image */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold text-primary">{instructor.name}</h2>
              <p className="text-text-muted">{instructor.role}</p>
            </div>
          </div>

          {/* Bio */}
          <h3 className="mt-4 font-semibold">Bio</h3>
          <p className="text-text-muted">{instructor.bio}</p>

          {/* Skills */}
          <h3 className="mt-4 font-semibold">Skills</h3>
          <div className="flex flex-wrap">
            {instructor.skills.map(skill => (
              <span key={skill} className="bg-primary text-white px-3 py-1 rounded-full text-xs mr-2 mb-2">
                {skill}
              </span>
            ))}
          </div>

          {/* Experience */}
          <h3 className="mt-4 font-semibold">Experience</h3>
          <p className="text-status-warning font-semibold">{instructor.experience}</p>

          {/* Rating */}
          <h3 className="mt-4 font-semibold">Rating</h3>
          <p className="flex items-center text-status-success">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={`text-xl ${index < Math.round(instructor.rating) ? "text-yellow-500" : "text-gray-400"}`}>
                ⭐
              </span>
            ))}
            <span className="ml-2">{instructor.rating}/5.0</span>
          </p>

          {/* Contact */}
          <h3 className="mt-4 font-semibold">Contact</h3>
          <p className="text-status-info">{instructor.contact}</p>

          {/* Assigned Workshops */}
          <h3 className="mt-4 font-semibold">Assigned Workshops</h3>
          <ul className="list-disc pl-6 text-text-muted">
            {instructor.workshops.map(workshop => (
              <li key={workshop}>{workshop}</li>
            ))}
          </ul>

          {/* Assign Button */}
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Assign to Workshop
          </button>
        </>
      )}

      {/* Availability Section */}
      {activeTab === "availability" && (
        <div>
          <h2 className="text-lg font-bold">March 2025</h2>
          <div className="flex justify-between items-center">
            <button className="text-gray-500">←</button>
            <span className="text-gray-700">Today</span>
            <button className="text-gray-500">→</button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-2 mt-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="text-center font-semibold">{day}</div>
            ))}
            {[...Array(31)].map((_, index) => {
              const day = index + 1;
              const isAvailable = day === 15; // Example: only 15th is available
              return (
                <div
                  key={day}
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    isAvailable ? "border-2 border-blue-500" : "bg-red-100 text-red-500"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center items-center space-x-4 mt-4">
            <span className="flex items-center">
              <span className="w-4 h-4 bg-green-200 rounded-full mr-2"></span> Available
            </span>
            <span className="flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full mr-2"></span> Unavailable
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDetails;
