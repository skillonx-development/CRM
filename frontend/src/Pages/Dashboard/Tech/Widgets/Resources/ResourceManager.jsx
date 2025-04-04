import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";

const widgets = [
  { title: "Proposals Received", value: "12", description: "Scheduled for this month" },
  { title: "Proposals to Marketing", value: "4", description: "Currently in progress" },
  { title: "Workshops in Execution", value: "186", description: "Across all workshops" },
  { title: "Completed Workshops", value: "28", description: "In the past 3 months" },
];

const ResourceManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState({ videos: [], pdfs: [] });
  const [newResource, setNewResource] = useState({ type: "Video", title: "", description: "", link: "", file: null });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewResource({ ...newResource, file, link: URL.createObjectURL(file) });
    }
  };

  const addResource = () => {
    if (!newResource.title || (!newResource.file && !newResource.link)) {
      alert("Please provide a title and either upload a file or add a link.");
      return;
    }
    const updatedResources = { ...resources };
    if (newResource.type === "Video") {
      updatedResources.videos.push(newResource);
    } else {
      updatedResources.pdfs.push(newResource);
    }
    setResources(updatedResources);
    setIsModalOpen(false);
    setNewResource({ type: "Video", title: "", description: "", link: "", file: null });
  };

  return (
    <div className="p-6 bg-background-default text-text-default min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((widget, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
            <div className="bg-background-card text-text shadow-card border border-border rounded-xl p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-text-muted">{widget.title}</h3>
                <MoreHorizontal className="text-text-disabled" size={16} />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-semibold">{widget.value}</div>
                <span className="text-xs text-text-muted">{widget.description}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add Resource
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background-card p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-text-muted hover:text-text-default" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
            <select className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3" value={newResource.type} onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}>
              <option value="Video">Video</option>
              <option value="PDF">PDF</option>
            </select>
            <input className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3" placeholder="Enter title" value={newResource.title} onChange={(e) => setNewResource({ ...newResource, title: e.target.value })} />
            <textarea className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3" placeholder="Enter description" value={newResource.description} onChange={(e) => setNewResource({ ...newResource, description: e.target.value })} />
            <input type="url" className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3" placeholder="Paste the link here" value={newResource.link} onChange={(e) => setNewResource({ ...newResource, link: e.target.value, file: null })} disabled={newResource.file !== null} />
            <input type="file" className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3" onChange={handleFileUpload} disabled={newResource.link !== ""} />
            <button className="w-full bg-status-success text-white py-2 rounded-md hover:bg-status-success/90 transition" onClick={addResource}>Add Resource</button>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <h2 className="text-lg font-semibold">Videos</h2>
          <div className="space-y-4">
            {resources.videos.map((video, index) => (
              <div key={index} className="bg-background-card p-4 rounded-lg shadow">
                <h3 className="text-md font-medium">{video.title}</h3>
                <p className="text-sm text-text-muted">{video.description}</p>
                {video.link && <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Watch Video</a>}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-lg font-semibold">PDFs</h2>
          <div className="space-y-4">
            {resources.pdfs.map((pdf, index) => (
              <div key={index} className="bg-background-card p-4 rounded-lg shadow">
                <h3 className="text-md font-medium">{pdf.title}</h3>
                <p className="text-sm text-text-muted">{pdf.description}</p>
                {pdf.link && <a href={pdf.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View PDF</a>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceManager;