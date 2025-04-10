import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star, Mail, Phone, ArrowLeft, Database,
  PieChart, FileText, ShoppingCart, CreditCard
} from "lucide-react";

const API_BASE = "http://localhost:5001/api/members";

// MemberCard Component
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
        <div className={`relative w-12 h-6 bg-gray-600 rounded-full ${member.approve ? "bg-green-500" : "bg-yellow-500"}`}>
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

// ManageMemberModal Component
const ManageMemberModal = ({ isOpen, onClose, member, onSavePermissions }) => {
  const [permissions, setPermissions] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (member) {
      setPermissions({
        overview: false,
        leads: false,
        proposals: false,
        orders: false,
        billing: false,
        ...(member.permissions || {})
      });
    }
  }, [member]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleTogglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    try {
      await onSavePermissions(member._id, permissions);
      onClose();
    } catch (err) {
      setSaveError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !member) return null;

  const permissionItems = [
    { key: 'overview', icon: <PieChart />, label: 'Overview', desc: 'Dashboard overview with key metrics and KPIs' },
    { key: 'leads', icon: <Database />, label: 'Leads', desc: 'Manage and track sales leads' },
    { key: 'proposals', icon: <FileText />, label: 'Proposals', desc: 'Create and manage sales proposals' },
    { key: 'orders', icon: <ShoppingCart />, label: 'Orders', desc: 'Track and manage customer orders' },
    { key: 'billing', icon: <CreditCard />, label: 'Billing', desc: 'Manage invoices and payment tracking' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl max-h-screen overflow-auto">
        <div className="p-4">
          <button onClick={onClose} className="flex items-center text-gray-400 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all members
          </button>

          <div className="flex items-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold mr-3">
              {member.name.split(" ").map(w => w[0]).join("").toUpperCase()}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg flex items-center">
                {member.name} {member.isFavorite && <Star className="w-4 h-4 text-yellow-400 ml-1" />}
              </h2>
              <p className="text-gray-400">{member.team}</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mb-2">Manage Dashboard Access</h3>
          <p className="text-gray-400 text-sm mb-6">Select which dashboard modules this team member can access.</p>

          <div className="space-y-4 mb-6">
            {permissionItems.map(({ key, icon, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center mr-3">
                    {React.cloneElement(icon, { className: "w-4 h-4 text-blue-400" })}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{label}</h4>
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
                    <div className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${permissions[key] ? "translate-x-6" : "translate-x-0"}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {saveError && <p className="text-red-500 text-sm mb-4">{saveError}</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition-all"
          >
            {saving ? "Saving..." : "Save Permissions"}
          </button>
        </div>
      </div>
    </div>
  );
};

// TeamWidget Component
const TeamWidget = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_BASE}/getMembers`);
        if (!response.ok) throw new Error("Failed to fetch members");
        const data = await response.json();
        setMembers(data.filter(member => member.team === "Sales"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleManageMember = (member) => {
    if (!member.approve) return;
    setSelectedMember(member);
    setIsManageModalOpen(true);
  };

  const toggleApproval = async (id) => {
    const updatedMembers = members.map(member =>
      member._id === id ? { ...member, approve: !member.approve } : member
    );
    setMembers(updatedMembers);

    try {
      const toggledMember = updatedMembers.find(m => m._id === id);
      await fetch(`${API_BASE}/updateApproval/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approve: toggledMember.approve })
      });
    } catch (error) {
      console.error("Failed to update approval:", error);
    }
  };

  const handleSavePermissions = async (memberId, updatedPermissions) => {
    const response = await fetch(`${API_BASE}/updatePermissions/${memberId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ permissions: updatedPermissions })
    });

    if (!response.ok) throw new Error("Failed to update permissions");

    setMembers(prev =>
      prev.map(member =>
        member._id === memberId ? { ...member, permissions: updatedPermissions } : member
      )
    );
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Sales Team Members</h2>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 w-full bg-gray-700 animate-pulse rounded-2xl" />
          ))}
        </div>
      )}

      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && members.length === 0 && (
        <p className="text-gray-400">No team members found in Sales.</p>
      )}

      {!loading && !error && members.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, index) => (
            <MemberCard
              key={member._id}
              member={member}
              index={index}
              onManage={handleManageMember}
              onToggleApprove={toggleApproval}
            />
          ))}
        </div>
      )}

      <ManageMemberModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        member={selectedMember}
        onSavePermissions={handleSavePermissions}
      />
    </div>
  );
};

export default TeamWidget;
