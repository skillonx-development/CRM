import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google Icon (Requires `react-icons` package)

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, phone, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Account Created with:", formData);
    // Add registration logic here
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
    // Implement Firebase Google Authentication Here
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-background-card rounded-lg shadow-card">
        <h2 className="text-2xl font-semibold text-text text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-text-muted mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 bg-background-sidebar text-text rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-text-muted mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-background-sidebar text-text rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Number Input */}
          <div>
            <label className="block text-text-muted mb-1">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 bg-background-sidebar text-text rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-text-muted mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-background-sidebar text-text rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-text-muted mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 bg-background-sidebar text-text rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-4">
          <div className="w-full border-t border-border"></div>
          <span className="mx-2 text-text-muted">OR</span>
          <div className="w-full border-t border-border"></div>
        </div>

        {/* Continue with Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-background-sidebar border border-border rounded py-2 text-text-muted hover:bg-hover transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-text-muted text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-light">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
