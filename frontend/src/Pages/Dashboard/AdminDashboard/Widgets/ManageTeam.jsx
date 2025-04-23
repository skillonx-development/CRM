import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

// Main Component
const ManageTeam = () => {
  const [activeTeam, setActiveTeam] = useState("Sales");
  const [teamLeads, setTeamLeads] = useState([]);
  const [approvedLeads, setApprovedLeads] = useState({});

  const teamColors = {
    Sales: "bg-purple-500",
    Tech: "bg-blue-500",
    Marketing: "bg-green-500",
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const leadsRes = await axios.get(`https://crm-5qj0.onrender.com/api/members/getLeads/${activeTeam}`);
        const leadsData = leadsRes.data || [];

        // Initialize approval state based on fetched data
        const approvalMap = {};
        leadsData.forEach((lead) => {
          approvalMap[lead._id] = lead.approve || false;
        });

        setTeamLeads(leadsData);
        setApprovedLeads(approvalMap);
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };

    fetchLeads();
  }, [activeTeam]);

  const handleToggle = async (leadId) => {
    const newApproval = !approvedLeads[leadId];

    try {
      await axios.put(`https://crm-5qj0.onrender.com/api/members/updateLeadApproval/${leadId}`, {
        approve: newApproval,
      });
      setApprovedLeads((prev) => ({ ...prev, [leadId]: newApproval }));
    } catch (err) {
      console.error("Failed to update approval status:", err);
    }
  };

  return (
    <motion.div
      className="bg-background-card rounded-lg p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Users size={20} className="text-purple-500 mr-2" />
          <h3 className="text-white text-xl font-semibold">Manage Team</h3>
        </div>
      </div>

      {/* Team Tabs */}
      <div className="flex space-x-2 mb-6">
        {["Sales", "Tech", "Marketing"].map((team) => (
          <motion.button
            key={team}
            className={`px-4 py-2 rounded-md text-white capitalize ${activeTeam === team ? teamColors[team] : "bg-gray-700"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTeam(team)}
          >
            {team}
          </motion.button>
        ))}
      </div>

      {/* Lead Cards */}
      {teamLeads.map((lead) => (
        <div key={lead._id} className="bg-gray-800/60 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold ${teamColors[lead.team]} mr-4`}>
              {lead.name?.charAt(0)}
            </div>
            <div>
              <h4 className="text-white font-semibold">{lead.name}</h4>
              <p className="text-gray-400 text-sm">{lead.email}</p>
              <span className="text-xs text-green-400 font-medium">{lead.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={approvedLeads[lead._id] || false}
                onChange={() => handleToggle(lead._id)}
              />
              <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                approvedLeads[lead._id] ? "bg-blue-600" : "bg-gray-600"
              }`}>
                <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${
                  approvedLeads[lead._id] ? "translate-x-7" : "translate-x-1"
                }`}></span>
              </div>
              <span className="ml-2 text-sm text-white">
                {approvedLeads[lead._id] ? "Approved" : "Approve"}
              </span>
            </label>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default ManageTeam;
