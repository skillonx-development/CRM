import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [newResource, setNewResource] = useState({
    type: "Video",
    title: "",
    description: "",
    link: "",
    file: null,
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/resources", {
        withCredentials: true,
      });
      const allResources = Array.isArray(res.data.resources) ? res.data.resources : [];

      const videos = allResources.filter((res) => res.type === "Video");
      const pdfs = allResources.filter((res) => res.type === "PDF");

      setResources({ videos, pdfs });
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewResource({ ...newResource, file, link: "" });
    }
  };

  const addResource = async () => {
    if (!newResource.title || (!newResource.file && !newResource.link)) {
      alert("Please provide a title and either upload a file or add a link.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newResource.title);
    formData.append("description", newResource.description);
    formData.append("type", newResource.type);

    if (newResource.file) {
      formData.append("file", newResource.file);
    } else {
      formData.append("link", newResource.link);
    }

    try {
      await axios.post("http://localhost:5001/api/resources", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      fetchResources();
      setIsModalOpen(false);
      setNewResource({
        type: "Video",
        title: "",
        description: "",
        link: "",
        file: null,
      });
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const deleteResource = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/resources/${id}`, {
        withCredentials: true,
      });
      fetchResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((widget, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-gray-600 dark:text-gray-300">{widget.title}</h3>
                <MoreHorizontal className="text-gray-400" size={16} />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-semibold">{widget.value}</div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{widget.description}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Resource Button */}
      <div className="flex justify-center mt-6">
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add Resource
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative text-gray-900 dark:text-gray-100">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
            <select
              className="w-full p-2 rounded border mb-3 bg-white dark:bg-gray-700 dark:border-gray-600"
              value={newResource.type}
              onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
            >
              <option value="Video">Video</option>
              <option value="PDF">PDF</option>
            </select>
            <input
              className="w-full p-2 rounded border mb-3 bg-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter title"
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
            />
            <textarea
              className="w-full p-2 rounded border mb-3 bg-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter description"
              value={newResource.description}
              onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
            />
            <input
              type="url"
              className="w-full p-2 rounded border mb-3 bg-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Paste the link here"
              value={newResource.link}
              onChange={(e) => setNewResource({ ...newResource, link: e.target.value, file: null })}
              disabled={newResource.file !== null}
            />
            <input
              type="file"
              className="w-full p-2 rounded border mb-3 bg-white dark:bg-gray-700 dark:border-gray-600"
              onChange={handleFileUpload}
              disabled={newResource.link !== ""}
            />
            <button
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              onClick={addResource}
            >
              Add Resource
            </button>
          </div>
        </div>
      )}

      {/* Display Resources */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Videos */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-lg font-semibold mb-2">Videos</h2>
          <div className="space-y-4">
            {resources.videos.map((video) => (
              <div key={video._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-md font-medium">{video.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{video.description}</p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Watch Video
                </a>
                <button
                  className="text-red-500 mt-2 hover:underline"
                  onClick={() => deleteResource(video._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PDFs */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-lg font-semibold mb-2">PDFs</h2>
          <div className="space-y-4">
            {resources.pdfs.map((pdf, index) => (
              <div key={`${pdf._id}-${index}`} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-md font-medium">{pdf.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{pdf.description}</p>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-400 transition mr-2 mt-2"
                >
                  View PDF
                </a>
                <button
                  className="inline-block bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-400 transition mt-2"
                  onClick={() => deleteResource(pdf._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceManager;
