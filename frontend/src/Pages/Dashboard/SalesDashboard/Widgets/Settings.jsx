import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

const AccountSettings = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for password visibility
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [userId, setUserId] = useState("");
  const [team, setTeam] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        name: storedUser.name || "",
        email: storedUser.email || "",
      });
      setUserId(storedUser._id);
      setTeam(storedUser.team);
      setUserRole(storedUser.userRole || "member");
    }
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field],
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/members/update-profile/${team}/${userId}/${userRole}`,
        {
          name: userData.name,
          email: userData.email,
        }
      );

      const updatedUser = response.data.user;

      // Save updated user data in localStorage
      localStorage.setItem("user", JSON.stringify({ ...updatedUser, team, userRole }));

      alert(response.data.message || "Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5001/api/members/update-password/${team}/${userId}/${userRole}`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );

      alert(response.data.message || "Password updated successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="space-y-6">
      {/* Account Information */}
      <div className="bg-background-card p-6 rounded-lg shadow-card border border-border-dark">
        <h3 className="text-lg font-semibold text-text-default">Account Information</h3>
        <p className="text-text-muted text-sm mb-4">Manage your account details and password.</p>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
        >
          Save Changes
        </button>
      </div>

      {/* Password Update */}
      <div className="bg-background-card p-6 rounded-lg shadow-card border border-border-dark">
        <h3 className="text-lg font-semibold text-text-default">Password</h3>
        <p className="text-text-muted text-sm mb-4">Change your password.</p>
        <div className="space-y-4">
          {/* Current Password with eye icon */}
          <div className="relative">
            <input
              type={passwordVisibility.currentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            >
              {passwordVisibility.currentPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>

          {/* New Password with eye icon */}
          <div className="relative">
            <input
              type={passwordVisibility.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            >
              {passwordVisibility.newPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>

          {/* Confirm Password with eye icon */}
          <div className="relative">
            <input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-border-dark rounded-lg bg-background-default text-text-default"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            >
              {passwordVisibility.confirmPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleUpdatePassword}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;