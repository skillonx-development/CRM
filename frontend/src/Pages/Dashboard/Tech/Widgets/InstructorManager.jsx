import React, { useState } from "react";
import InstructorList from "./InstructorList";
import InstructorDetails from "./InstructorDetails";


const InstructorManager = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const instructors = [
    {
      id: 1,
      name: "Dr. Alex Morgan",
      role: "Senior Web Developer",
      bio: "Full-stack developer with 8 years of experience specializing in React and Node.js ecosystems.",
      experience: "Senior",
      rating: 4.8,
      availability: 75,
      skills: ["Web Development", "UI/UX Design"],
      contact: "alex.morgan@techcrm.com",
      workshops: ["Advanced React Patterns", "Building Scalable APIs"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Data Science Specialist",
      bio: "Expert in AI and Machine Learning, helping businesses derive insights from data.",
      experience: "Principal",
      rating: 4.9,
      availability: 50,
      skills: ["Data Science", "AI/ML"],
      contact: "sarah.chen@techcrm.com",
      workshops: ["Deep Learning Fundamentals", "Data Science for Business"]
    }
  ];

  return (
    <div className="flex flex-col md:flex-row p-6 bg-background-default text-text-default">
      <InstructorList instructors={instructors} onSelectInstructor={setSelectedInstructor} />
      <InstructorDetails instructor={selectedInstructor} />
    </div>
  );
};

export default InstructorManager;
