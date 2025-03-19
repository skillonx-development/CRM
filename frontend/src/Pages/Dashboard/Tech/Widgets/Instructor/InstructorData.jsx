"use client";

import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaFileAlt, FaPlus, FaCalendarCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

// Sample teacher data
const teacherData = [
  {
    id: 1,
    name: "Sarah Kim",
    skills: ["React", "Next.js", "UI/UX"],
    availability: "Weekends",
    rating: 4.9,
    workshops: 15,
    status: "Available",
  },
  {
    id: 2,
    name: "David Chen",
    skills: ["Node.js", "Express", "MongoDB"],
    availability: "Evenings",
    rating: 4.7,
    workshops: 12,
    status: "Teaching",
  },
  {
    id: 3,
    name: "Aisha Patel",
    skills: ["DevOps", "AWS", "Docker"],
    availability: "Weekends",
    rating: 4.9,
    workshops: 10,
    status: "Teaching",
  },
  {
    id: 4,
    name: "John Doe",
    skills: ["Python", "Machine Learning", "AI"],
    availability: "Weekdays",
    rating: 4.6,
    workshops: 8,
    status: "Unavailable",
  },
  {
    id: 5,
    name: "Emily Wong",
    skills: ["Java", "Spring Boot", "Microservices"],
    availability: "Flexible",
    rating: 4.8,
    workshops: 20,
    status: "Available",
  },
  {
    id: 6,
    name: "Michael Scott",
    skills: ["Leadership", "Business", "Marketing"],
    availability: "Weekdays",
    rating: 4.5,
    workshops: 5,
    status: "Unavailable",
  },
];

// Sample proposal data
const proposalsData = [
  {
    id: 1,
    client: "Acme Corp",
    type: "Web Dev",
    budget: "$5,000",
    status: "New",
    received: "2023-03-10",
    requirements: "Advanced React workshop",
    assignedTeacherId: null
  },
  {
    id: 2,
    client: "TechGiant",
    type: "Data Science",
    budget: "$8,000",
    status: "Draft",
    received: "2023-03-08",
    requirements: "Machine Learning basics",
    assignedTeacherId: null
  },
  {
    id: 3,
    client: "Startup Hub",
    type: "UI/UX",
    budget: "$4,000",
    status: "Ready",
    received: "2023-03-05",
    requirements: "User Experience workshop",
    assignedTeacherId: null
  }
];

const InstructorData = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Teachers");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [teachers, setTeachers] = useState(teacherData);
  const [proposals, setProposals] = useState(proposalsData);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [schedulingNotes, setSchedulingNotes] = useState("");
  const [schedulingDate, setSchedulingDate] = useState("");

  const [newTeacher, setNewTeacher] = useState({
    id: teachers.length + 1,
    name: "",
    skills: "",
    availability: "Weekdays",
    rating: "",
    workshops: 0,
    status: "Available",
  });

  const filteredTeachers = teachers.filter(
    (teacher) => selectedFilter === "All Teachers" || teacher.status === selectedFilter
  );

  const handleAddTeacher = () => {
    const teacherToAdd = { 
      ...newTeacher, 
      skills: newTeacher.skills.split(",").map(skill => skill.trim()),
      id: Math.max(...teachers.map(t => t.id)) + 1
    };
    setTeachers([...teachers, teacherToAdd]);
    setShowModal(false);
    setNewTeacher({ 
      id: teachers.length + 2,
      name: "", 
      skills: "", 
      availability: "Weekdays", 
      rating: "", 
      workshops: 0, 
      status: "Available" 
    });
  };

  const handleSchedule = (teacher) => {
    setSelectedTeacher(teacher);
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = () => {
    if (!selectedTeacher || !selectedProposal || !schedulingDate) {
      alert("Please fill in all required fields");
      return;
    }

    // Update proposals with assigned teacher
    const updatedProposals = proposals.map(proposal => 
      proposal.id === selectedProposal.id 
        ? { ...proposal, assignedTeacherId: selectedTeacher.id, status: "Scheduled" } 
        : proposal
    );
    
    // Update teacher status and workshop count
    const updatedTeachers = teachers.map(teacher => 
      teacher.id === selectedTeacher.id 
        ? { 
            ...teacher, 
            status: "Teaching", 
            workshops: teacher.workshops + 1 
          } 
        : teacher
    );
    
    setProposals(updatedProposals);
    setTeachers(updatedTeachers);
    
    // Close modal and reset form
    setShowScheduleModal(false);
    setSelectedTeacher(null);
    setSelectedProposal(null);
    setSchedulingNotes("");
    setSchedulingDate("");
    
    // Show success notification
    alert(`Workshop scheduled successfully with ${selectedTeacher.name} for ${selectedProposal.client}`);
  };

  const getSkillMatchScore = (teacherSkills, proposalType) => {
    // Simple skill matching logic
    if (teacherSkills.some(skill => proposalType.toLowerCase().includes(skill.toLowerCase()))) {
      return "High";
    } else {
      return "Low";
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen text-text">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        {/* Dropdown Filter */}
        <div className="relative">
          <button
            className="px-4 py-2 bg-primary rounded-lg border border-border flex items-center text-white"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedFilter} <IoIosArrowDown className="ml-2" />
          </button>

          {showDropdown && (
            <div className="absolute mt-2 bg-background-card shadow-md rounded-lg w-48 z-10">
              {["All Teachers", "Available", "Unavailable", "Teaching"].map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 cursor-pointer hover:bg-background-hover text-text"
                  onClick={() => {
                    setSelectedFilter(option);
                    setShowDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="bg-primary-light text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="mr-2" /> Add Teacher
        </button>
      </div>

      {/* Teacher List */}
      <div className="bg-background-card p-4 rounded-lg shadow-card">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="flex justify-between items-center border-b border-border-dark py-3">
              {/* Name & Skills */}
              <div>
                <h3 className="text-lg font-semibold">{teacher.name}</h3>
                <div className="flex flex-wrap space-x-2 mt-1">
                  {teacher.skills.map((skill, i) => (
                    <span key={i} className="text-xs bg-border-dark px-2 py-1 rounded-lg text-text-muted">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability & Rating */}
              <div className="text-center">
                <p className="text-sm text-text-muted">Availability</p>
                <p className="font-semibold">{teacher.availability}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-muted">Rating</p>
                <p className="font-semibold">{teacher.rating} ⭐</p>
              </div>

              {/* Workshops */}
              <div className="text-center">
                <p className="text-sm text-text-muted">Workshops</p>
                <p className="font-semibold">{teacher.workshops}</p>
              </div>

              {/* Status */}
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  teacher.status === "Available"
                    ? "bg-status-success text-white"
                    : teacher.status === "Teaching"
                    ? "bg-status-warning text-black"
                    : "bg-gray-400 text-black"
                }`}
              >
                {teacher.status}
              </span>

              {/* Actions */}
              <div className="flex space-x-3">
                <FaEnvelope className="text-text-muted cursor-pointer" />
                <FaPhone className="text-text-muted cursor-pointer" />
                <FaFileAlt className="text-text-muted cursor-pointer" />
              </div>

              {/* Schedule Button */}
              <button
                className={`px-4 py-2 rounded-lg transition ${
                  teacher.status === "Available" 
                    ? "bg-primary text-white hover:bg-primary-dark" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => teacher.status === "Available" && handleSchedule(teacher)}
                disabled={teacher.status !== "Available"}
              >
                Schedule
              </button>
            </div>
          ))
        ) : (
          <p className="text-text-muted text-center py-4">No teachers found</p>
        )}
      </div>

      {/* Modal for Adding a Teacher */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-background-card p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Teacher</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-border p-2 rounded mb-3 bg-background hover:bg-background-hover"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              className="w-full border border-border p-2 rounded mb-3 bg-background hover:bg-background-hover"
              value={newTeacher.skills}
              onChange={(e) => setNewTeacher({ ...newTeacher, skills: e.target.value })}
            />
            <select
              className="w-full border border-border p-2 rounded mb-3 bg-background hover:bg-background-hover"
              value={newTeacher.availability}
              onChange={(e) => setNewTeacher({ ...newTeacher, availability: e.target.value })}
            >
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
              <option value="Flexible">Flexible</option>
            </select>
            <input
              type="number"
              placeholder="Rating (0-5)"
              className="w-full border border-border p-2 rounded mb-3 bg-background hover:bg-background-hover"
              value={newTeacher.rating}
              onChange={(e) => setNewTeacher({ ...newTeacher, rating: Math.min(5, Math.max(0, e.target.value)) })}
              min="0"
              max="5"
              step="0.1"
            />
            <div className="flex space-x-2 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded flex-1"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded flex-1"
                onClick={handleAddTeacher}
                disabled={!newTeacher.name || !newTeacher.skills}
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Scheduling Workshop */}
      {showScheduleModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-background-card p-6 rounded-lg shadow-lg w-1/2 max-w-2xl">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4">Schedule Workshop with {selectedTeacher.name}</h2>
              <button className="text-gray-500" onClick={() => setShowScheduleModal(false)}>✕</button>
            </div>

            <div className="mb-6 p-3 bg-background rounded border border-border">
              <h3 className="font-semibold">Teacher Information:</h3>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <p className="text-sm text-text-muted">Skills</p>
                  <p>{selectedTeacher.skills.join(", ")}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Availability</p>
                  <p>{selectedTeacher.availability}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Rating</p>
                  <p>{selectedTeacher.rating} ⭐</p>
                </div>
              </div>
            </div>

            {/* Select proposal */}
            <div className="mb-4">
              <label className="block text-text-muted mb-2">Select Proposal:</label>
              <select
                className="w-full border border-border p-2 rounded bg-background hover:bg-background-hover"
                value={selectedProposal ? selectedProposal.id : ""}
                onChange={(e) => {
                    const proposal = proposals.find(p => p.id === parseInt(e.target.value));
                    setSelectedProposal(proposal);
                  }}
                >
                  <option value="">-- Select a proposal --</option>
                  {proposals
                    .filter(p => !p.assignedTeacherId)
                    .map(proposal => (
                      <option key={proposal.id} value={proposal.id}>
                        {proposal.client} - {proposal.type} (Match: {getSkillMatchScore(selectedTeacher.skills, proposal.type)})
                      </option>
                    ))}
                </select>
              </div>
  
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Selected proposal details */}
                {selectedProposal && (
                  <div className="p-3 bg-background rounded border border-border">
                    <h3 className="font-semibold">Proposal Details:</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-sm text-text-muted">Client</p>
                        <p>{selectedProposal.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Budget</p>
                        <p>{selectedProposal.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Requirements</p>
                        <p>{selectedProposal.requirements}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Skill Match</p>
                        <p className={`font-semibold ${
                          getSkillMatchScore(selectedTeacher.skills, selectedProposal.type) === "High" 
                            ? "text-status-success" 
                            : "text-status-warning"
                        }`}>
                          {getSkillMatchScore(selectedTeacher.skills, selectedProposal.type)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
  
                {/* Date selection */}
                <div>
                  <label className="block text-text-muted mb-2">Select Date:</label>
                  <input
                    type="date"
                    className="w-full border border-border p-2 rounded bg-background hover:bg-background-hover"
                    value={schedulingDate}
                    onChange={(e) => setSchedulingDate(e.target.value)}
                  />
                </div>
              </div>
  
              {/* Notes */}
              <div className="mb-4">
                <label className="block text-text-muted mb-2">Notes:</label>
                <textarea
                  className="w-full border border-border p-2 rounded bg-background hover:bg-background-hover h-24"
                  value={schedulingNotes}
                  onChange={(e) => setSchedulingNotes(e.target.value)}
                  placeholder="Add any special requirements or notes..."
                ></textarea>
              </div>
  
              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary text-white px-4 py-2 rounded flex items-center"
                  onClick={handleScheduleSubmit}
                  disabled={!selectedProposal || !schedulingDate}
                >
                  <FaCalendarCheck className="mr-2" /> Schedule Workshop
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Proposals Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Proposals</h2>
          <div className="bg-background-card p-4 rounded-lg shadow-card">
            <div className="grid grid-cols-7 font-semibold text-text-muted border-b border-border-dark pb-2 mb-2">
              <div>Client</div>
              <div>Type</div>
              <div>Budget</div>
              <div>Received</div>
              <div>Status</div>
              <div>Teacher</div>
              <div></div> {/* Actions column */}
            </div>
  
            {proposals.map((proposal) => {
              const assignedTeacher = teachers.find(t => t.id === proposal.assignedTeacherId);
              
              return (
                <div key={proposal.id} className="grid grid-cols-7 items-center py-3 border-b border-border">
                  <div className="font-semibold">{proposal.client}</div>
                  <div>{proposal.type}</div>
                  <div>{proposal.budget}</div>
                  <div>{new Date(proposal.received).toLocaleDateString()}</div>
                  <div>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        proposal.status === "Scheduled"
                          ? "bg-status-success text-white"
                          : proposal.status === "Draft"
                          ? "bg-gray-400 text-black"
                          : "bg-status-warning text-black"
                      }`}
                    >
                      {proposal.status}
                    </span>
                  </div>
                  <div>
                    {assignedTeacher ? assignedTeacher.name : "Not assigned"}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <FaFileAlt className="text-text-muted cursor-pointer" />
                    {!proposal.assignedTeacherId && (
                      <button 
                        className="text-sm bg-primary text-white px-2 py-1 rounded"
                        onClick={() => {
                          // Find an available teacher with matching skills
                          const availableTeachers = teachers.filter(t => 
                            t.status === "Available" && 
                            getSkillMatchScore(t.skills, proposal.type) === "High"
                          );
                          
                          if (availableTeachers.length > 0) {
                            setSelectedTeacher(availableTeachers[0]);
                            setSelectedProposal(proposal);
                            setShowScheduleModal(true);
                          } else {
                            alert("No available teachers with matching skills found.");
                          }
                        }}
                      >
                        Assign
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  export default InstructorData;