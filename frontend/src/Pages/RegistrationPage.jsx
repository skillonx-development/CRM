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
    team: "", // Changed from "Sales" to empty string
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.team) {
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
        team: formData.team,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      console.log('Attempting registration with data:', {
        ...registrationData,
        password: '***hidden***',
        confirmPassword: '***hidden***'
      });

      const response = await fetch(`https://crm-383e.onrender.com/api/auth/register/${userType}`, {
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
        team: "",
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
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter Your Name"
            className="w-full p-2 rounded bg-gray-1200 border border-border-default text-text-default mb-4"
          />

          <label className="block mb-2">Contact number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder="Enter Your Contact Number"
            className="w-full p-2 rounded bg-gray-1200 border border-border-default text-text-default mb-4"
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Your Email"
            className="w-full p-2 rounded bg-gray-1200 border border-border-default text-text-default mb-4"
          />

          <label className="block mb-2">Team</label>
          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-1200 border border-border-default text-text-default mb-4"
          >
            <option value="" disabled>Select a team</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Tech">Tech</option>
          </select>

          <label className="block mb-2">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter Your Password"
              className="w-full p-2 rounded bg-gray-1200 border border-border-default text-text-default pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          <label className="block mb-2">Confirm Password</label>
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Your Password"
              className="w-full p-2 rounded bg-gray-1200 border border-border-default text-text-default pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-status-success text-white"}`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <p className="mt-4">Already a member? <a className="text-primary" href="/login">Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;