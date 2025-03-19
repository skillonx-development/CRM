import React from "react";

const InstagramBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-orange-400 text-white flex justify-between items-center px-6 py-3 rounded-lg shadow-md">
      {/* Left Side: Icon & Text */}
      <div className="flex items-center">
        <span className="text-xl mr-3">📷</span>
        <div>
          <p className="font-semibold">Instagram Business Account Connected</p>
          <p className="text-sm opacity-80">Your account is properly configured for ad campaigns</p>
        </div>
      </div>

      {/* Right Side: Manage Connection Button */}
      <button className="bg-white text-purple-600 px-4 py-1.5 rounded-full font-medium shadow-md hover:bg-gray-100 transition">
        Manage Connection
      </button>
    </div>
  );
};

export default InstagramBanner;
