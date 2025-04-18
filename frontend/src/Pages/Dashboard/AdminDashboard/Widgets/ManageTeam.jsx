import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Users,
  Settings,
  Star,
  ArrowLeft,
  Database,
  PieChart,
  FileText,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

// Modal Component for Managing Member Permissions
const ManageMemberModal = ({ isOpen, onClose, member, permissions, setPermissions }) => {
  if (!isOpen || !member) return null;

  const modules = [
    { key: "overview", title: "Overview", icon: <PieChart className="w-4 h-4 text-blue-400" />, desc: "Dashboard overview" },
    { key: "leads", title: "Leads", icon: <Database className="w-4 h-4 text-blue-400" />, desc: "Track sales leads" },
    { key: "proposals", title: "Proposals", icon: <FileText className="w-4 h-4 text-blue-400" />, desc: "Manage proposals" },
    { key: "orders", title: "Orders", icon: <ShoppingCart className="w-4 h-4 text-blue-400" />, desc: "Order management" },
    { key: "billing", title: "Billing", icon: <CreditCard className="w-4 h-4 text-blue-400" />, desc: "Billing access" },
  ];

  const handleTogglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl h-full md:h-auto max-h-screen overflow-auto">
        <div className="p-4">
          <button onClick={onClose} className="flex items-center text-gray-400 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>

          <div className="flex items-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold mr-3">
              {member.name?.split(" ").map((w) => w[0]).join("").toUpperCase()}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg flex items-center">
                {member.name}
                {member.isFavorite && <Star className="w-4 h-4 text-yellow-400 ml-1" />}
              </h2>
              <p className="text-gray-400 capitalize">{member.team}</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mb-2">Manage Dashboard Access</h3>
          <p className="text-gray-400 text-sm mb-6">Select which dashboard modules this member can access.</p>

          <div className="space-y-4">
            {modules.map(({ key, title, desc, icon }) => (
              <div key={key} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center mr-3">{icon}</div>
                  <div>
                    <h4 className="font-medium text-white">{title}</h4>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs mr-2 ${permissions[key] ? "text-green-400" : "text-red-400"}`}>
                    {permissions[key] ? "✓ Granted" : "✕ No access"}
                  </span>
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions[key] ? "bg-blue-600" : "bg-gray-700"}`}
                    onClick={() => handleTogglePermission(key)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${
                        permissions[key] ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ManageTeam = () => {
  const [activeTeam, setActiveTeam] = useState("Sales");
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [approvedLeads, setApprovedLeads] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [permissions, setPermissions] = useState({});

  const teamColors = {
    Sales: "bg-purple-500",
    Tech: "bg-blue-500",
    Marketing: "bg-green-500",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, leadsRes] = await Promise.all([
          axios.get(`http://localhost:5001/api/members/getMembers/${activeTeam}`),
          axios.get(`http://localhost:5001/api/members/getLeads/${activeTeam}`),
        ]);

        setTeamMembers(membersRes.data || []);
        setTeamLeads(leadsRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [activeTeam]);

  const handleToggle = async (leadId) => {
    console.log(leadId);
    const newApprovalStatus = !approvedLeads[leadId];
  
    // Update the local state first
    setApprovedLeads((prev) => ({ ...prev, [leadId]: newApprovalStatus }));
  
    try {
      // Send the request to the backend to update the approval status
      const response = await axios.put(
        `http://localhost:5001/api/members/updateLeadApproval/${leadId}`,
        { approve: newApprovalStatus }
      );
  
      if (response.status === 200) {
        console.log(`Lead ${leadId} approval status updated successfully.`);
      } else {
        console.error(`Failed to update lead ${leadId}.`);
      }
    } catch (error) {
      // Rollback the state update in case of an error
      setApprovedLeads((prev) => ({ ...prev, [leadId]: !newApprovalStatus }));
      console.error("Error updating lead approval:", error);
    }
  };
  

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setPermissions(member.permissions || {
      overview: true,
      leads: true,
      proposals: false,
      orders: false,
      billing: false,
    });
    setModalOpen(true);
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

      {/* Tabs */}
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

      {/* Leads */}
      {teamLeads.length > 0 && (
        <div className="mb-4">
          <h4 className="text-white font-medium text-lg mb-3">Team Leads</h4>
          {teamLeads.map((lead) => (
            <motion.div
              key={lead._id}
              className="bg-gray-800/60 rounded-lg p-4 mb-4 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold ${teamColors[lead.team]} mr-4`}
                >
                  {lead.name?.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{lead.name}</h4>
                  <p className="text-gray-400 text-sm">{lead.email}</p>
                  <span className="text-xs text-green-400 font-medium">{lead.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={approvedLeads[lead._id] || false}
                      onChange={() => handleToggle(lead._id)}
                    />
                    <div className="block w-10 h-6 rounded-full bg-gray-600"></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                        approvedLeads[lead._id] ? "translate-x-4" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-white">
                    {approvedLeads[lead._id] ? "Approved" : "Approve"}
                  </span>
                </label>

                <button
                  className={`py-1 px-3 rounded-lg ${
                    approvedLeads[lead._id]
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                  }`}
                  onClick={() => approvedLeads[lead._id] && handleOpenModal(lead)}
                  disabled={!approvedLeads[lead._id]}
                >
                  Manage Access
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Divider */}
      {teamLeads.length > 0 && teamMembers.length > 0 && (
        <div className="border-t border-gray-700 my-6"></div>
      )}

      {/* Regular Members */}
      {teamMembers.length > 0 && (
        <div>
          <h4 className="text-white font-medium text-lg mb-3">Team Members</h4>
          {teamMembers
            .filter((member) => member.team?.toLowerCase() === activeTeam.toLowerCase())
            .map((member) => (
              <motion.div
                key={member._id}
                className="bg-gray-800/60 rounded-lg p-4 mb-4 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold ${teamColors[member.team]} mr-4`}
                  >
                    {member.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{member.name}</h4>
                    <p className="text-gray-400 text-sm">{member.email}</p>
                    <span className="text-xs text-gray-400">{member.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      )}

      <ManageMemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        member={selectedMember}
        permissions={permissions}
        setPermissions={setPermissions}
      />
    </motion.div>
  );
};

export default ManageTeam;
