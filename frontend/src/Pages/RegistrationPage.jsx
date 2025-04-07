import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine role from URL path
  const userType = location.pathname.includes("lead") ? "lead" : "member";

  const [role, setRole] = useState(userType === "lead" ? "Lead" : "Member");
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    team: "Sales",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update role on path change
  useEffect(() => {
    setRole(userType === "lead" ? "Lead" : "Member");
  }, [userType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Add validation checks
    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('All fields are required');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const registrationData = {
        name: formData.name.trim(),
        contactNumber: formData.contactNumber.trim(),
        email: formData.email.toLowerCase().trim(),
        team: formData.team, // Send team value as is, without transformation
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      console.log('Attempting registration with data:', {
        ...registrationData,
        password: '***hidden***',
        confirmPassword: '***hidden***'
      });

      const response = await fetch(`http://localhost:5001/api/auth/register/${userType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();

      // Log full response for debugging
      console.log('Server Response Status:', response.status);
      console.log('Server Response:', data);

      if (!response.ok) {
        throw new Error(data.message || `Registration failed with status ${response.status}`);
      }

      setSuccess('Registration successful! Redirecting to login...');

      // Clear form data
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        team: "Sales",
        password: "",
        confirmPassword: ""
      });

      // Redirect after successful registration
      setTimeout(() => {
        navigate('/login', {
          state: {
            message: 'Registration successful! Please login with your credentials.',
            email: registrationData.email
          }
        });
      }, 1500);

    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-default text-text-default">
      <h2 className="text-2xl font-bold mb-4">Register as</h2>

      {/* Role Selection */}
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

      {/* Form Card */}
      <div className="bg-background-card p-6 rounded-lg shadow-card w-96">
        <h3 className="text-xl font-semibold mb-4">{role} Registration</h3>

        {/* Status Messages */}
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter Name"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />

          <label className="block mb-2">Contact number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder="Enter Contact Number"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />

          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            required
            placeholder="Enter Password"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />

          <label className="block mb-2">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            className="w-full p-2 rounded bg-background-default border border-border-default text-text-default mb-4"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-status-success text-white"}`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
