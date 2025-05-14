import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="p-6 bg-background-default text-text-default min-h-screen">
      {/* Heading */}
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="text-text-muted">Manage your account settings and preferences.</p>

      {/* Tabs */}
      <div className="mt-4 flex border-b border-border-dark bg-background-card rounded-lg p-2">
        {["Account"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              activeTab === tab.toLowerCase()
                ? "border-b-2 border-primary text-primary"
                : "text-text-muted hover:text-text-default"
            }`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="mt-6 space-y-6">
        {activeTab === "account" && <AccountSettings />}
      </div>
    </div>
  );
};

// Account Settings Section
const AccountSettings = () => {
  return (
    <div className="space-y-6">
      {/* Account Information */}
      <div className="bg-background-card p-6 rounded-lg shadow-card border border-border-dark">
        <h3 className="text-lg font-semibold text-text-default">Account Information</h3>
        <p className="text-text-muted text-sm mb-4">Manage your account details and password.</p>
        <div className="space-y-4">
        <label>Email</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
            defaultValue="admin@example.com"
            disabled
          />
           <label>Password</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
            defaultValue="Admin@123"
            disabled
          />
        </div>
        
      </div>

      {/* Password Update */}
 
    </div>
  );
};

// Custom Tailwind Toggle
const toggleStyles = `
  .toggle-checkbox {
    width: 40px;
    height: 20px;
    appearance: none;
    background: #6b7280;
    border-radius: 9999px;
    position: relative;
    transition: background 0.2s;
  }
  .toggle-checkbox:checked {
    background: #8b5cf6;
  }
  .toggle-checkbox::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 9999px;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }
  .toggle-checkbox:checked::before {
    transform: translateX(20px);
  }
`;

export default () => (
  <>
    <style>{toggleStyles}</style>
    <Settings />
  </>
);