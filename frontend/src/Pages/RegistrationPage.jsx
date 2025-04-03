import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegistrationPage = () => {
  const [role, setRole] = useState("Member");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract user type from URL
  const userType = location.pathname.includes("lead") ? "lead" : "member";

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    team: "Sales",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:5001/api/auth/register/${userType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful!");
      navigate("/dashboard"); // Redirect after successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-default text-text-default">
      <h2 className="text-2xl font-bold mb-4">Register as</h2>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg ${role === "Lead" ? "bg-background-card text-text-muted border border-purple-500" : "bg-primary-default text-white"}`}
          onClick={() => {
            setRole("Lead");
            navigate("/register/lead");
          }}
        >
          Lead
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${role === "Member" ? "bg-background-card text-text-muted border border-purple-500" : "bg-primary-default text-white"}`}
          onClick={() => {
            setRole("Member");
            navigate("/register/member");
          }}
        >
          Member
        </button>
      </div>

      <div className="bg-background-card p-6 rounded-lg shadow-card w-96">
        <h3 className="text-xl font-semibold mb-4">{role} Registration</h3>
        
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />
          
          <label className="block mb-2">Contact number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter Contact Number"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />
          
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />
          
          <label className="block mb-2">Team:</label>
          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          >
            <option>Sales</option>
            <option>Marketing</option>
            <option>Tech</option>
          </select>

          <label className="block mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />
          
          <label className="block mb-2">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />
          
          <button type="submit" className="w-full p-2 rounded bg-status-success text-white">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
