import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star, Mail, Phone, ArrowLeft,
  FileText, Users, MessageSquare
} from "lucide-react";

// =======================
// Member Card Component
// =======================
const MemberCard = ({ member, index, onManage, onToggleApprove }) => (
  <motion.div
    key={member._id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-5 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-700"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
          {member.name.split(" ").map(word => word[0]).join("").toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center">
            {member.name}
            {member.isFavorite && <Star className="w-4 h-4 text-yellow-400 ml-1" />}
          </h3>
          <p className="text-gray-400 text-sm">{member.team}</p>
        </div>
      </div>
      <div className="flex space-x-3 text-gray-400">
        <Mail className="w-5 h-5 cursor-pointer hover:text-blue-400" />
        <Phone className="w-5 h-5 cursor-pointer hover:text-green-400" />
      </div>
    </div>

    <div className="mt-4 flex justify-between items-center">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={member.approve}
          onChange={() => onToggleApprove(member._id)}
          className="sr-only"
        />
        <div className={`relative w-12 h-6 rounded-full transition-all ${member.approve ? "bg-green-500" : "bg-yellow-500"}`}>
          <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${member.approve ? "translate-x-6" : "translate-x-1"}`} />
        </div>
        <span className="ml-2 text-sm text-gray-300">{member.approve ? "Approved" : "Pending"}</span>
      </label>

      <button
        onClick={() => onManage(member)}
        className={`px-4 py-1 rounded-lg text-sm font-medium ${member.approve ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
        disabled={!member.approve}
      >
        Manage Access
      </button>
    </div>
  </motion.div>
);

// ===========================
// Permission Toggle Modal
// ===========================
const permissionOptions = [
  { key: "proposals", label: "Proposals", description: "Create and manage sales proposals", icon: FileText },
  { key: "resources", label: "Resources", description: "Provide and add resources", icon: Users },
  { key: "curriculum", label: "Curriculum", description: "Review and manage curriculum", icon: MessageSquare },
];

const ManageMemberModal = ({ isOpen, onClose, member, onSave }) => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    if (member) {
      setPermissions({
        proposals: member.permissions?.proposals || false,
        resources: member.permissions?.resources || false,
        curriculum: member.permissions?.curriculum || false,
      });
    }
  }, [member]);

  const handleTogglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSave(member._id, permissions, member.team);
    onClose();
  };

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl h-full md:h-auto max-h-screen overflow-auto">
        <div className="p-4">
          <button onClick={onClose} className="flex items-center text-gray-400 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all members
          </button>

          <div className="flex items-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold mr-3">
              {member.name.split(" ").map(word => word[0]).join("").toUpperCase()}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg flex items-center">
                {member.name}
                {member.isFavorite && <Star className="w-4 h-4 text-yellow-400 ml-1" />}
              </h2>
              <p className="text-gray-400">{member.team}</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mb-2">Manage Dashboard Access</h3>
          <p className="text-gray-400 text-sm mb-6">Select which dashboard modules this team member can access.</p>

          <div className="space-y-4 mb-6">
            {permissionOptions.map(({ key, label, description, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center mr-3">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{label}</h4>
                    <p className="text-xs text-gray-400">{description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs mr-2 ${permissions[key] ? 'text-green-400' : 'text-red-400'}`}>
                    {permissions[key] ? '✓ Granted' : '✕ No access'}
                  </span>
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions[key] ? 'bg-blue-600' : 'bg-gray-700'}`}
                    onClick={() => handleTogglePermission(key)}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions[key] ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ====================
// Main TeamWidget
// ====================
const TeamWidget = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/members/getMembers/Tech");
        if (!response.ok) throw new Error("Failed to fetch members");
        const data = await response.json();
        setMembers(data.filter(member => member.team === "Tech"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleToggleApprove = async (id) => {
    try {
      const memberToUpdate = members.find(member => member._id === id);
      const updatedApproveStatus = !memberToUpdate.approve;

      const response = await fetch(`http://localhost:5001/api/members/updateApproval/Tech/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approve: updatedApproveStatus }),
      });

      if (response.ok) {
        setMembers(prev =>
          prev.map(member =>
            member._id === id ? { ...member, approve: updatedApproveStatus } : member
          )
        );
      }
    } catch (error) {
      console.error("Error updating approval:", error);
    }
  };

  const handleManageAccess = (member) => {
    setSelectedMember(member);
    setIsManageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsManageModalOpen(false);
    setSelectedMember(null);
  };

  const handleSavePermissions = async (memberId, permissions, team) => {
    try {
      const response = await fetch(`http://localhost:5001/api/members/updatePermissions/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions, team }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update permissions");

      console.log("Permissions updated:", data);
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  if (loading) return <div className="text-white">Loading members...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <MemberCard
            key={member._id}
            member={member}
            index={index}
            onManage={handleManageAccess}
            onToggleApprove={handleToggleApprove}
          />
        ))}
      </div>

      <ManageMemberModal
        isOpen={isManageModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
        onSave={handleSavePermissions}
      />
    </>
  );
};

export default TeamWidget;
