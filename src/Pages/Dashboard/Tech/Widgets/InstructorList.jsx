import React from "react";
import InstructorCard from "./InstructorCard";

const InstructorList = ({ instructors, onSelectInstructor }) => {
  return (
    <div className="w-full md:w-1/3 bg-background-sidebar p-6 rounded-lg shadow-card">
      <h2 className="text-xl font-semibold text-primary">Available Instructors</h2>
      {instructors.map((instructor) => (
        <InstructorCard 
          key={instructor.id} 
          instructor={instructor} 
          onSelectInstructor={onSelectInstructor} 
        />
      ))}
    </div>
  );
};

export default InstructorList;
