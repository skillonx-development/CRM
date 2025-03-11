"use client";

import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 space-y-6 text-white"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-gray-300">Settings</h1>

      {/* Dashboard Customization */}
      <div className="bg-background-card p-6 rounded-2xl shadow-card border border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Dashboard Customization</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400">Theme</label>
            <select className="w-full p-2 bg-gray-800 rounded-lg text-white border border-gray-600">
              <option>Dark Mode</option>
              <option>Light Mode</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400">Default View</label>
            <select className="w-full p-2 bg-gray-800 rounded-lg text-white border border-gray-600">
              <option>Overview</option>
              <option>Detailed Reports</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-background-card p-6 rounded-2xl shadow-card border border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <span>SMS Alerts</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Report Preferences */}
      <div className="bg-background-card p-6 rounded-2xl shadow-card border border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Report Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Auto-Generate Reports</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div>
            <label className="block text-gray-400">Default Export Format</label>
            <select className="w-full p-2 bg-gray-800 rounded-lg text-white border border-gray-600">
              <option>PDF</option>
              <option>CSV</option>
              <option>Excel</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-background-card p-6 rounded-2xl shadow-card border border-border-dark">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400">Update Profile</label>
            <input type="text" placeholder="Update profile name" className="w-full p-2 bg-gray-800 rounded-lg text-white border border-gray-600" />
          </div>
          <div className="flex items-center justify-between">
            <span>Enable Role-Based Access</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
      </div>

      <button className="w-full mt-4 bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-lg">
        Save Changes
      </button>
    </motion.div>
  );
}
