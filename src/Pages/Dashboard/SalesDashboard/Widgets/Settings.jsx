import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-6 bg-background-default text-text-default min-h-screen">
      {/* Heading */}
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="text-text-muted">Manage your account settings and preferences.</p>

      {/* Tabs */}
      <div className="mt-4 flex border-b border-border-dark bg-background-card rounded-lg p-2">
        {["General", "Notifications", "Account"].map((tab) => (
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
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </div>
  );
};

// General Settings Section
const GeneralSettings = () => {
  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card border border-border-dark">
      <h3 className="text-lg font-semibold text-text-default">Appearance</h3>
      <p className="text-text-muted text-sm mb-4">Customize how the dashboard looks and feels.</p>
      <div className="space-y-4">
        {[
          { label: "Dark Mode", id: "dark-mode" },
          { label: "Compact View", id: "compact-view" }
        ].map((setting) => (
          <div key={setting.id} className="flex items-center justify-between">
            <span className="text-text-default">{setting.label}</span>
            <input type="checkbox" className="toggle-checkbox" />
          </div>
        ))}
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
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
            defaultValue="Sales Agent"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
            defaultValue="sales@example.com"
          />
        </div>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
          Save Changes
        </button>
      </div>

      {/* Password Update */}
      <div className="bg-background-card p-6 rounded-lg shadow-card border border-border-dark">
        <h3 className="text-lg font-semibold text-text-default">Password</h3>
        <p className="text-text-muted text-sm mb-4">Change your password.</p>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
          />
        </div>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
          Update Password
        </button>
      </div>
    </div>
  );
};

// Notification Settings Section
const NotificationSettings = () => {
  return (
    <div className="bg-background-card p-6 rounded-lg shadow-card border border-border-dark">
      <h3 className="text-lg font-semibold text-text-default">Notification Settings</h3>
      <p className="text-text-muted text-sm mb-4">Configure how you receive notifications.</p>
      <div className="space-y-4">
        {["Email Notifications", "SMS Notifications", "Automated Follow-ups"].map((setting, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-text-default">{setting}</span>
            <input type="checkbox" className="toggle-checkbox" defaultChecked={index !== 1} />
          </div>
        ))}
      </div>
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