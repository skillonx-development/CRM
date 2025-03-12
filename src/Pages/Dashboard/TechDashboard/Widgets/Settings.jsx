import { useState } from "react";
import { Bell, BarChart, Lock, KeyRound, X } from "lucide-react";

export default function DashboardSettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!"); // Replace with actual API call
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="p-6 bg-background min-h-screen text-text">
      {/* Breadcrumb */}
      <nav className="text-text-muted text-sm mb-4">
        <span className="text-white font-medium">Account Setting</span> &gt; Security Settings
      </nav>

      {/* Header */}
      <div className="flex justify-between items-center bg-background-card p-4 rounded-lg shadow-card">
        <div className="flex items-center space-x-2">
          <img src="./src/Pages/Dashboard/SalesDashboard/Assets/logo.png" alt="CRM Logo" className="h-8" />
          <h1 className="text-xl font-bold text-white">Security Settings</h1>
        </div>
        <div className="flex space-x-4">
          <Bell className="text-text-muted hover:text-white cursor-pointer" />
          <BarChart className="text-text-muted hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Security Options */}
      <div className="mt-6 space-y-6">
        {/* Change Password */}
        <div className="bg-background-card p-4 rounded-lg shadow-card border border-border">
          <div className="flex items-center space-x-3">
            <KeyRound className="text-primary" />
            <h2 className="text-lg font-semibold text-white">Change Password</h2>
          </div>
          <p className="text-text-muted mt-1">Set a unique password to protect your account.</p>
          <button
            className="mt-3 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Change Password
          </button>
        </div>

        {/* Two-Step Verification (2FA) */}
        <div className="bg-background-card p-4 rounded-lg shadow-card border border-border">
          <div className="flex items-center space-x-3">
            <Lock className="text-status-error" />
            <h2 className="text-lg font-semibold text-white">2 Step Verification</h2>
          </div>
          <p className="text-text-muted mt-1">
            Secure your account with 2 Step security. You will need to enter a special code from a mobile app.
          </p>
          <button
            className={`mt-3 px-4 py-2 rounded-md ${
              is2FAEnabled ? "bg-status-error text-white" : "bg-background-hover text-text-muted"
            }`}
            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
          >
            {is2FAEnabled ? "Enabled" : "Enable"}
          </button>
        </div>
      </div>

      {/* Activity Log */}
      <div className="mt-8 bg-background-card p-4 rounded-lg shadow-card border border-border">
        <h2 className="text-lg font-semibold text-white mb-3">Activity Log</h2>
        <table className="w-full text-left border-collapse text-text">
          <thead>
            <tr className="border-b border-border-dark text-text-muted">
              <th className="py-2">Browser</th>
              <th className="py-2">IP Address</th>
              <th className="py-2">Date/Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2">Chrome on Windows</td>
              <td className="py-2">192.168.111.111</td>
              <td className="py-2">1/04/2025</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">Mozilla on Windows</td>
              <td className="py-2">192.168.154.111</td>
              <td className="py-2">1/03/2025</td>
            </tr>
            <tr>
              <td className="py-2">Safari on Mac</td>
              <td className="py-2">192.168.895.111</td>
              <td className="py-2">1/05/2025</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-background-card p-6 rounded-lg shadow-card w-96 border border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Change Password</h2>
              <X
                className="text-text-muted cursor-pointer hover:text-white"
                onClick={() => setIsPasswordModalOpen(false)}
              />
            </div>

            <label className="text-text-muted block mb-2">New Password</label>
            <input
              type="password"
              className="w-full bg-background-hover text-white p-2 rounded-md border border-border-dark mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-text-muted block mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full bg-background-hover text-white p-2 rounded-md border border-border-dark mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
              onClick={handleChangePassword}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
