import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md bg-background-card p-8 rounded-lg shadow-card">
        {/* Title */}
        <h2 className="text-3xl font-bold text-text text-center mb-6">Welcome Back</h2>
        <p className="text-text-muted text-center mb-6">Sign in to continue</p>

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
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-text-muted font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background-hover text-text rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary-dark outline-none transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md font-semibold transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password & Sign Up Links */}
        <div className="mt-6 text-center space-y-2">
          <a href="#" className="text-text-muted hover:text-primary text-sm transition">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
