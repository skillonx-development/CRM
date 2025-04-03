import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("lead"); // Default role selection
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      console.log("Login successful:", data);

      // Store token if applicable
      localStorage.setItem("token", data.token);

      // Navigate to the respective dashboard based on the selected role
      if (role === "lead") {
        navigate("/lead-dashboard");
      } else if (role === "member") {
        navigate("/member-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md bg-background-card p-8 rounded-lg shadow-card">
        {/* Welcome Message */}
        <h2 className="text-3xl font-bold text-text text-center mb-2">Welcome Back</h2>
        <p className="text-text-muted text-center mb-6">
          Sign in to access your dashboard and manage your resources efficiently.
        </p>

        {/* Error Message */}
        {error && <p className="text-status-error text-sm text-center mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-text-muted font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background-hover text-text rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary-dark outline-none transition"
              aria-label="Email Address"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-text-muted font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background-hover text-text rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary-dark outline-none transition"
                aria-label="Password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-text-muted text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role Selection Radio Buttons */}
          <fieldset>
            <legend className="block text-text-muted font-medium mb-2">Select Role</legend>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="lead"
                  checked={role === "lead"}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-radio h-5 w-5 accent-purple-500"
                />
                <span className="ml-2 text-text">Lead</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="member"
                  checked={role === "member"}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-radio h-5 w-5 accent-purple-500"
                />
                <span className="ml-2 text-text">Member</span>
              </label>
            </div>
          </fieldset>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md font-semibold transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center space-y-2">
          <a href="#" className="text-text-muted hover:text-primary text-sm transition">
            Forgot Password?
          </a>
          <p className="text-text-muted text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
