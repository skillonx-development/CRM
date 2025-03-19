"use client";
import { useState } from "react";

const CreateWorkshop = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background-card p-6 rounded-lg shadow-card w-96 border border-border-default">
        <h2 className="text-lg font-semibold text-text-default">Create New Workshop</h2>
        <p className="text-sm text-text-muted mb-4">
          Fill in the details to schedule a new workshop.
        </p>

        {/* Form Inputs */}
        {[
          { label: "Title", name: "title", type: "text", placeholder: "Workshop title" },
          { label: "Instructor", name: "instructor", type: "text", placeholder: "Instructor name" },
          { label: "Date", name: "date", type: "date", placeholder: "" },
          { label: "Time", name: "time", type: "text", placeholder: "e.g., 10:00 AM - 2:00 PM" },
          { label: "Location", name: "location", type: "text", placeholder: "Workshop location" },
          { label: "Capacity", name: "capacity", type: "number", placeholder: "Max participants" },
        ].map((field) => (
          <div key={field.name} className="mb-3">
            <label className="block text-sm font-medium text-text-muted">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              className="w-full p-2 border border-border-default rounded bg-background-hover text-text-default focus:ring-1 focus:ring-primary focus:border-primary"
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-background-hover hover:bg-background-sidebar text-text-default rounded transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary-dark hover:bg-primary text-text-default rounded transition">
            Create Workshop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkshop;