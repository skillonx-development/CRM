import React from "react";

const InstructorCard = ({ instructor, onSelectInstructor }) => {
  return (
    <div 
      className="p-4 bg-background-card text-text-default shadow-card rounded-lg my-4 cursor-pointer hover:bg-background-hover transition"
      onClick={() => onSelectInstructor(instructor)}
    >
      <h3 className="text-lg font-semibold">{instructor.name}</h3>
      <p className="text-text-muted">{instructor.role}</p>
      <p className="text-status-success font-bold">⭐ {instructor.rating}</p>
      <p className="text-status-info">{instructor.availability}% Available</p>
      <div className="flex flex-wrap mt-2">
        {instructor.skills.map(skill => (
          <span key={skill} className="bg-primary text-white px-3 py-1 rounded-full text-xs mr-2 mb-2">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InstructorCard;
