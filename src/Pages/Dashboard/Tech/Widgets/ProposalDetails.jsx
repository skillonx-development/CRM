import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUpload,
  FaSave,
  FaPaperPlane,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const teachers = ["Sarah Kim", "David Chen", "Aisha Patel", "John Doe", "Emily Wong", "Michael Scott"];

const availableResources = [
  { title: "React Crash Course", type: "Video", link: "#" },
  { title: "React Documentation", type: "PDF", link: "#" },
  { title: "Build a Todo App", type: "Tutorial", link: "#" },
  { title: "Python Basics", type: "PDF", link: "#" },
  { title: "Advanced Java Programming", type: "Video", link: "#" },
];

const ProposalDetails = ({ proposal }) => {
  const [draft, setDraft] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedResources, setSelectedResources] = useState([]);
  const [file, setFile] = useState(null);
  const [timeline, setTimeline] = useState([]);

  if (!proposal) {
    return <p className="text-text-muted text-center py-4">Select a proposal to view details</p>;
  }

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleResourceToggle = (resource) => {
    setSelectedResources((prev) =>
      prev.includes(resource) ? prev.filter((r) => r !== resource) : [...prev, resource]
    );
  };

  const handleAddTimelineStep = () => {
    setTimeline([...timeline, { step: "", date: "", description: "" }]);
  };

  const handleTimelineChange = (index, field, value) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[index][field] = value;
    setTimeline(updatedTimeline);
  };

  const handleRemoveTimelineStep = (index) => {
    setTimeline(timeline.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-background-card p-6 shadow-card rounded-lg text-text-default">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Proposal Details</h2>

      {/* Proposal Details */}
      <div className="space-y-2">
        <p><strong>Client:</strong> {proposal.client}</p>
        <p><strong>Type:</strong> {proposal.type}</p>
        <p><strong>Requirements:</strong> {proposal.requirements}</p>
        <p><strong>Budget:</strong> {proposal.budget}</p>
      </div>

      {/* Date & Time Scheduling */}
      <div className="flex gap-4 mt-4">
        <div className="w-1/2">
          <label className="block text-text-muted mb-1 flex items-center gap-2">
            <FaCalendarAlt /> Schedule Date:
          </label>
          <input
            type="date"
            className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-text-muted mb-1 flex items-center gap-2">
            <FaClock /> Schedule Time:
          </label>
          <input
            type="time"
            className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
          />
        </div>
      </div>

      {/* Resources Selection */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-primary">Available Resources</h3>
        <ul className="mt-2 space-y-2">
          {availableResources.map((resource, index) => (
            <li key={index} className="flex items-center gap-3 p-3 bg-background-hover rounded-md">
              <input
                type="checkbox"
                checked={selectedResources.includes(resource)}
                onChange={() => handleResourceToggle(resource)}
                className="accent-primary"
              />
              <strong>{resource.type}:</strong> 
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-status-info hover:underline">
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* File Upload */}
      <div className="mt-6">
        <label className="block text-text-muted mb-1 flex items-center gap-2">
          <FaUpload /> Upload Additional Resource:
        </label>
        <input
          type="file"
          className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={handleFileUpload}
        />
        {file && <p className="mt-2 text-status-success">Uploaded: {file.name}</p>}
      </div>

      {/* Timeline Inputs */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-primary">Proposal Timeline</h3>
        {timeline.map((item, index) => (
          <div key={index} className="p-3 bg-background-hover rounded-md mt-2">
            <input
              type="text"
              placeholder="Step Title (e.g., Proposal Review)"
              className="w-full p-2 mb-2 border border-border-dark rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
              value={item.step}
              onChange={(e) => handleTimelineChange(index, "step", e.target.value)}
            />
            <input
              type="date"
              className="w-full p-2 mb-2 border border-border-dark rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
              value={item.date}
              onChange={(e) => handleTimelineChange(index, "date", e.target.value)}
            />
            <textarea
              placeholder="Description of this step..."
              className="w-full p-2 border border-border-dark rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
              value={item.description}
              onChange={(e) => handleTimelineChange(index, "description", e.target.value)}
            />
            <button
              className="mt-2 text-status-error flex items-center gap-2"
              onClick={() => handleRemoveTimelineStep(index)}
            >
              <FaTrash /> Remove Step
            </button>
          </div>
        ))}
        <button
          className="mt-3 bg-status-info text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-status-success transition"
          onClick={handleAddTimelineStep}
        >
          <FaPlus /> Add Timeline Step
        </button>
      </div>

      {/* Draft Textarea */}
      <textarea
        className="w-full p-3 border border-border-dark mt-4 rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Draft your plan here..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        aria-label="Draft proposal"
      />

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark transition focus:outline-none focus:ring-2 focus:ring-primary-light">
          <FaSave /> Save Draft
        </button>
        <button className="flex items-center gap-2 bg-status-info text-white px-5 py-2 rounded-md hover:bg-status-success transition focus:outline-none focus:ring-2 focus:ring-status-info">
          <FaPaperPlane /> Send to Marketing
        </button>
      </div>
    </div>
  );
};

export default ProposalDetails;
