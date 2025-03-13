import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempted with:", { email, password });
    // Add authentication logic here
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-background-card rounded-lg shadow-card">
        <h2 className="text-2xl font-semibold text-text text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-text-muted mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-background-sidebar text-text rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-text-muted mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-background-sidebar text-text rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>

        {/* Forgot Password & Register Links */}
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-primary-light text-sm">
            Forgot Password?
          </Link>
          <p className="text-text-muted text-sm mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-light">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
