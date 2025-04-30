import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUpload,
  FaSave,
  FaPaperPlane,
  FaPlus,
  FaTrash,
} from "react-icons/fa";


const ProposalDetails = ({ proposal }) => {
  const [draft, setDraft] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedPDF, setSelectedPDF] = useState("");
  const [file, setFile] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("https://crm-383e.onrender.com/api/resources");
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        const resourceArray = Array.isArray(data) ? data : data.resources || [];
        setResources(resourceArray);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    if (proposal) {
      setScheduledDate(proposal.scheduledDate || "");
      setScheduledTime(proposal.scheduledTime || "");
      setSelectedTeacher(proposal.selectedTeacher || "");
      setSelectedVideo(proposal.selectedVideo || "");
      setSelectedPDF(proposal.selectedPDF || "");
      setDraft(proposal.draft || "");
      setTimeline(proposal.timeline || []);
    }
  }, [proposal]);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("institution", proposal.institution);
    formData.append("title", proposal.title);
    formData.append("price", proposal.price);
    formData.append("collegeEmail", proposal.collegeEmail);
    formData.append("draft", draft);
    formData.append("selectedTeacher", selectedTeacher);
    formData.append("scheduledDate", scheduledDate);
    formData.append("scheduledTime", scheduledTime);
    formData.append("selectedVideo", selectedVideo);
    formData.append("selectedPDF", selectedPDF);
    formData.append("timeline", JSON.stringify(timeline));
    if (file) formData.append("file", file);

    try {
      const response = await fetch("https://crm-383e.onrender.com/api/tech-proposals/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await response.json(); // Remove data assignment since it's not used
      alert("Proposal submitted successfully!");
    } catch (error) {
      console.error("Error submitting proposal:", error);
      alert("Submission failed. Please try again.");
    }
  };

  const videoOptions = resources.filter((res) => res.type === "Video");
  const pdfOptions = resources.filter((res) => res.type === "PDF");

  if (!proposal) {
    return <p className="text-text-muted text-center py-4">Select a proposal to view details</p>;
  }

  return (
    <div className="bg-background-card p-6 shadow-card rounded-lg text-text-default">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Proposal Details</h2>

      <div className="space-y-2">
        <p><strong>Client:</strong> {proposal.institution}</p>
        <p><strong>Type:</strong> {proposal.title}</p>
        <p><strong>Budget:</strong> ${proposal.price?.toLocaleString()}</p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-text-muted mb-1 flex items-center gap-2">
            <FaCalendarAlt /> Schedule Date:
          </label>
          <input
            type="date"
            className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-text-muted mb-1 flex items-center gap-2">
            <FaClock /> Schedule Time:
          </label>
          <input
            type="time"
            className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-text-muted mb-1">Select Video Resource:</label>
          <select
            value={selectedVideo}
            onChange={(e) => setSelectedVideo(e.target.value)}
            className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default"
          >
            <option value="">-- Select Video --</option>
            {videoOptions.map((video, index) => (
              <option key={index} value={video.title}>{video.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-text-muted mb-1">Select PDF Resource:</label>
          <select
            value={selectedPDF}
            onChange={(e) => setSelectedPDF(e.target.value)}
            className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default"
          >
            <option value="">-- Select PDF --</option>
            {pdfOptions.map((pdf, index) => (
              <option key={index} value={pdf.title}>{pdf.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-text-muted mb-1 flex items-center gap-2">
          <FaUpload /> Upload Additional Resource:
        </label>
        <input
          type="file"
          className="w-full p-3 border border-border-dark rounded bg-background-hover text-text-default"
          onChange={handleFileUpload}
        />
        {file && <p className="mt-2 text-status-success">Uploaded: {file.name}</p>}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-primary">Proposal Timeline</h3>
        {timeline.map((item, index) => (
          <div key={index} className="p-3 bg-background-hover rounded-md mt-2">
            <input
              type="text"
              placeholder="Step Title"
              className="w-full p-2 mb-2 border border-border-dark rounded bg-background-hover text-text-default"
              value={item.step}
              onChange={(e) => handleTimelineChange(index, "step", e.target.value)}
            />
            <input
              type="date"
              className="w-full p-2 mb-2 border border-border-dark rounded bg-background-hover text-text-default"
              value={item.date}
              onChange={(e) => handleTimelineChange(index, "date", e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border border-border-dark rounded bg-background-hover text-text-default"
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
          className="mt-3 bg-status-info text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={handleAddTimelineStep}
        >
          <FaPlus /> Add Timeline Step
        </button>
      </div>

      <textarea
        className="w-full p-3 border border-border-dark mt-4 rounded bg-background-hover text-text-default"
        placeholder="Draft your plan here..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md">
          <FaSave /> Save Draft
        </button>
        <button
          className="flex items-center gap-2 bg-status-info text-white px-5 py-2 rounded-md"
          onClick={handleSubmit}
        >
          <FaPaperPlane /> Send to Marketing
        </button>
      </div>
    </div>
  );
};

export default ProposalDetails;
