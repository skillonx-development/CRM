import { useState } from "react";
import { X } from "lucide-react";

const roles = [
  "Software Engineer",
  "UI/UX Designer",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "QA Engineer",
  "Project Manager",
];

const AddMemberModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    password: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background-card p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-text">Add Team Member</h2>
          <X className="text-text-muted cursor-pointer" onClick={onClose} />
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded-md bg-background hover:bg-background-hover text-text mb-3"
        />

        {/* Role Dropdown */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded-md bg-background hover:bg-background-hover text-text mb-3"
        >
          <option value="" disabled>Select Role</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded-md bg-background hover:bg-background-hover text-text mb-3"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded-md bg-background hover:bg-background-hover text-text mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded-md bg-background hover:bg-background-hover text-text mb-3"
        />

        <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition">
          Add Member
        </button>
      </div>
    </div>
  );
};

export default AddMemberModal;
