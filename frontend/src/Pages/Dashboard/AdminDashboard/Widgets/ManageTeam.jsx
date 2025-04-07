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

// Main Team Management Component
const ManageTeam = () => {
  const [activeTeam, setActiveTeam] = useState("sales");
  const [teamMembers, setTeamMembers] = useState([]);
  const [approvedLeads, setApprovedLeads] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [permissions, setPermissions] = useState({
    overview: true,
    leads: true,
    proposals: false,
    orders: false,
    billing: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, leadsRes] = await Promise.all([
          axios.get("http://localhost:5001/api/members/getMembers"),
          axios.get("http://localhost:5001/api/members/getLeads"),
        ]);

        const members = membersRes.data || [];
        const leads = leadsRes.data || [];

        console.log("Members:", members);
        console.log("Leads:", leads);

        const combined = [...members, ...leads];
        setTeamMembers(combined);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const teamColors = {
    sales: "bg-purple-500",
    tech: "bg-blue-500",
    marketing: "bg-green-500",
  };

  const filteredMembers = teamMembers.filter((m) => m.team?.toLowerCase() === activeTeam);
  const teamLead = filteredMembers.find((m) => m.role?.toLowerCase().includes("lead"));
  const teamOthers = filteredMembers.filter((m) => m._id !== teamLead?._id);
  const isApproved = approvedLeads[activeTeam] || false;

  const handleToggle = () => {
    setApprovedLeads((prev) => ({ ...prev, [activeTeam]: !isApproved }));
  };

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  return (
    <motion.div className="bg-background-card rounded-lg p-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Users size={20} className="text-purple-500 mr-2" />
          <h3 className="text-white text-xl font-semibold">Manage Team</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {["sales", "tech", "marketing"].map((team) => (
          <motion.button
            key={team}
            className={`px-4 py-2 rounded-md text-white capitalize ${
              activeTeam === team ? teamColors[team] : "bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTeam(team)}
          >
            {team}
          </motion.button>
        ))}
      </div>

      {/* Team Lead */}
      {teamLead && (
        <div className="mb-6">
          <motion.div className="bg-gray-800/60 rounded-lg p-4 flex items-center justify-between" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold ${teamColors[teamLead.team]} mr-4`}>
                {teamLead.name?.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-semibold">{teamLead.name}</h4>
                <p className="text-gray-400 text-sm">{teamLead.email}</p>
                <span className="text-xs text-green-400 font-medium">{teamLead.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={isApproved} onChange={handleToggle} />
                  <div className="block w-10 h-6 rounded-full bg-gray-600"></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isApproved ? "translate-x-4" : ""}`}></div>
                </div>
                <span className="ml-2 text-sm text-white">{isApproved ? "Approved" : "Approve"}</span>
              </label>

              <motion.button
                className={`text-white text-sm px-4 py-2 rounded flex items-center space-x-2 ${
                  isApproved ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!isApproved}
                whileHover={isApproved ? { scale: 1.05 } : {}}
                whileTap={isApproved ? { scale: 0.95 } : {}}
                onClick={() => handleOpenModal(teamLead)}
              >
                <Settings size={16} />
                <span>Manage Access</span>
              </motion.button>
            </div>
          </motion.div>
          <hr className="border-gray-700 my-4" />
        </div>
      )}

      {/* Members List */}
      <h4 className="text-white text-lg font-semibold mb-2">Team Members</h4>
      <div className="space-y-4">
        {teamOthers.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No members in this team yet.</p>
        ) : (
          teamOthers.map((member, index) => (
            <motion.div
              key={member._id || index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${teamColors[member.team]} mr-3`}>
                  {member.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-white font-medium">{member.name}</h4>
                  <div className="text-gray-400 text-xs">
                    {member.email} • <span className="font-medium">{member.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

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
