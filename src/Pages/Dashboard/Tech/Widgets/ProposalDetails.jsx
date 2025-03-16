import React, { useState } from "react";

const teachers = [
  "Sarah Kim",
  "David Chen",
  "Aisha Patel",
  "John Doe",
  "Emily Wong",
  "Michael Scott",
];

const ProposalDetails = ({ proposal }) => {
  const [draft, setDraft] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  if (!proposal) {
    return (
      <p className="text-text-muted text-center py-4">
        Select a proposal to view details
      </p>
    );
  }

  return (
    <div className="bg-background-card p-6 shadow-card rounded-lg text-text-default">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Proposal Details
      </h2>

      <div className="space-y-2">
        <p><strong>Client:</strong> {proposal.client}</p>
        <p><strong>Type:</strong> {proposal.type}</p>
        <p><strong>Requirements:</strong> {proposal.requirements}</p>
        <p><strong>Budget:</strong> {proposal.budget}</p>
      </div>

      {/* Teacher Dropdown */}
      <div className="mt-4">
        <label htmlFor="teacher" className="block text-text-muted mb-1">Assign Teacher:</label>
        <select
          id="teacher"
          className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="">Select a Teacher</option>
          {teachers.map((teacher, index) => (
            <option key={index} value={teacher}>{teacher}</option>
          ))}
        </select>
      </div>

      {/* Draft textarea */}
      <textarea
        className="w-full p-3 border border-border-dark mt-4 rounded bg-background-hover text-text-default focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Draft your plan here..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        aria-label="Draft proposal"
      />

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark transition focus:outline-none focus:ring-2 focus:ring-primary-light">
          Save Draft
        </button>
        <button className="bg-status-info text-white px-5 py-2 rounded-md hover:bg-status-success transition focus:outline-none focus:ring-2 focus:ring-status-info">
          Send to Marketing
        </button>
      </div>
    </div>
  );
};

export default ProposalDetails;
