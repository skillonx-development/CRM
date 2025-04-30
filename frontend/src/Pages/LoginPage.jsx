import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";  // Import eye icons

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("lead");
  const [generalError, setGeneralError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      if (location.state.email) {
        setEmail(location.state.email);
      }
      window.history.replaceState({}, document.title); // Clear state on reload
    }
  }, [location]);

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    // Clear previous error messages
    setGeneralError("");
    setEmailError("");
    setPasswordError("");
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Determine the correct API endpoint
      const loginEndpoint = 'http://localhost:5001/api/auth/login';

      // Make the request to the backend
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, type: role }),
      });

      // Check if the response is empty or not valid JSON
      let data = {};
      try {
        const responseText = await response.text();
        if (responseText) {
          data = JSON.parse(responseText);
        } else {
          throw new Error("Empty response received from server");
        }
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        setGeneralError("Server error. Please try again or contact support.");
        setIsLoading(false);
        return;
      }
      
      if (!response.ok) {
        // Handle different error cases
        if (response.status === 401) {
          setGeneralError(data.message || "Invalid email or password");
        } else if (response.status === 403) {
          setGeneralError(data.message || "Account not approved yet");
        } else {
          setGeneralError(data.message || "Login failed. Please try again.");
        }
        return;
      }
      
      // If successful, update auth context and redirect
      if (data.success) {
        console.log("Login successful:", data);
        // Use the provided auth context login method
        try {
          await login(email, password, role); // Update auth context
          navigate(data.redirect || `/${role}/dashboard`);
        } catch (authError) {
          console.error("Auth context error:", authError);
          setGeneralError("Authentication error. Please try again.");
        }
      } else {
        setGeneralError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setGeneralError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md bg-background-card p-8 rounded-lg shadow-card">
        <h2 className="text-3xl font-bold text-text text-center mb-2">Welcome Back</h2>
        {generalError && <p className="text-red-600 text-sm text-center mb-4">{generalError}</p>}
        {success && <p className="text-status-success text-sm text-center mb-4">{success}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-text-muted font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 bg-gray-1200 text-text rounded-md border ${
                emailError ? "border-status-error" : "border-border"
              } focus:border-primary focus:ring-2 focus:ring-primary-dark outline-none transition`}
              placeholder="Enter your email"
            />
            {emailError && <p className="text-status-error text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-text-muted font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 bg-gray-1200 text-text rounded-md border ${
                  passwordError ? "border-status-error" : "border-border"
                } focus:border-primary focus:ring-2 focus:ring-primary-dark outline-none transition`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-text-muted"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && <p className="text-status-error text-sm mt-1">{passwordError}</p>}
          </div>

          <fieldset>
            <legend className="block text-text-muted font-medium mb-2">Select Role</legend>
            <div className="flex space-x-4">
              {["lead", "member", "admin"].map((r) => (
                <label className="flex items-center" key={r}>
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-radio h-5 w-5 accent-purple-500"
                  />
                  <span className="ml-2 text-text capitalize">{r}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md font-semibold transition duration-300 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link to="#" className="text-text-muted hover:text-primary text-sm transition">
            Forgot Password?
          </Link>
          <p className="text-text-muted text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register/member" className="text-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;