import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const campaignsData = [
  { name: "Jane Cooper", budget: "$5,000", spent: "$3,250", roi: "245%", leads: "245", status: "Active" },
  { name: "Floyd Miles", budget: "$4,000", spent: "$2,250", roi: "187%", leads: "360", status: "Inactive" },
  { name: "Ronald Richards", budget: "$6,000", spent: "$3,250", roi: "187%", leads: "270", status: "Inactive" },
  { name: "Marvin McKinney", budget: "$8,000", spent: "$6,250", roi: "162%", leads: "300", status: "Active" },
  { name: "Jerome Bell", budget: "$9,000", spent: "$5,250", roi: "162%", leads: "200", status: "Active" },
  { name: "Kathryn Murphy", budget: "$5,000", spent: "$3,250", roi: "162%", leads: "245", status: "Active" },
  { name: "Jacob Jones", budget: "$6,000", spent: "$3,250", roi: "162%", leads: "245", status: "Active" },
  { name: "Kristin Watson", budget: "$7,000", spent: "$3,250", roi: "162%", leads: "245", status: "Inactive" },
];

const AllCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 bg-background-card text-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Campaigns</h2>
        
        {/* Search & Sort */}
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-lg bg-background-hover text-white focus:outline-none focus:ring-2 focus:ring-primary-dark"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select className="bg-background-hover px-4 py-2 rounded-lg text-white focus:outline-none">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-background-sidebar text-gray-300">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Budget</th>
              <th className="py-3 px-4">Dates</th>
              <th className="py-3 px-4">ROI</th>
              <th className="py-3 px-4">Leads</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaignsData
              .filter((campaign) =>
                campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((campaign, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-background-hover">
                  <td className="py-3 px-4">{campaign.name}</td>
                  <td className="py-3 px-4">
                    {campaign.budget}
                    <br />
                    <span className="text-gray-400">Spent: {campaign.spent}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="block">Start: Nov 15, 2023</span>
                    <span className="block">End: Dec 15, 2023</span>
                  </td>
                  <td className="py-3 px-4">{campaign.roi}</td>
                  <td className="py-3 px-4">{campaign.leads}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-4 py-1 rounded-lg text-white ${
                        campaign.status === "Active"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between text-gray-400">
        <p>Showing data 1 to 8 of 256K entries</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-background-hover text-white rounded-lg">&lt;</button>
          <button className="px-3 py-1 bg-primary text-white rounded-lg">1</button>
          <button className="px-3 py-1 bg-background-hover text-white rounded-lg">2</button>
          <button className="px-3 py-1 bg-background-hover text-white rounded-lg">3</button>
          <button className="px-3 py-1 bg-background-hover text-white rounded-lg">4</button>
          <button className="px-3 py-1 bg-background-hover text-white rounded-lg">...</button>
          <button className="px-3 py-1 bg-background-hover text-white rounded-lg">40</button>
          <button className="px-3 py-1 bg-background-hover text-white rounded-lg">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default AllCampaigns;
