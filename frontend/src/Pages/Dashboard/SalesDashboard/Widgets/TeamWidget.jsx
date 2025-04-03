import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Mail, Phone, Trash, Settings, ArrowLeft, Database, PieChart, FileText, ShoppingCart, CreditCard } from "lucide-react";

// Sample data with status (no separation between pending/approved)
const teamMembers = [
  {
    initials: "DM",
    name: "David Miller",
    role: "Account Executive",
    status: "Active",
    isFavorite: true,
    isApproved: false
  },
  {
    initials: "ET",
    name: "Emma Thompson",
    role: "Account Manager",
    status: "Active",
    isFavorite: false,
    isApproved: true
  },
  {
    initials: "JA",
    name: "James Anderson",
    role: "Sales Executive",
    status: "Active",
    isFavorite: false,
    isApproved: true
  },
  {
    initials: "JD",
    name: "Jessica Davis",
    role: "Sales Coordinator",
    status: "Active",
    isFavorite: false,
    isApproved: true
  },
  {
    initials: "MB",
    name: "Michael Brown",
    role: "Sales Executive",
    status: "On Leave",
    isFavorite: false,
    isApproved: false
  },
  {
    initials: "SW",
    name: "Sarah Wilson",
    role: "Sales Manager",
    status: "Active",
    isFavorite: true,
    isApproved: false
  },
];

// Member Management Modal Component
const ManageMemberModal = ({ isOpen, onClose, member }) => {
  const [permissions, setPermissions] = useState({
    overview: true,
    leads: true,
    proposals: true,
    orders: false,
    billing: false
  });

  const handleTogglePermission = (key) => {
    setPermissions({
      ...permissions,
      [key]: !permissions[key]
    });
  };

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-background-card rounded-xl shadow-card w-full max-w-2xl h-full md:h-auto max-h-screen overflow-auto">
        <div className="p-4">
          <button 
            onClick={onClose}
            className="flex items-center text-text-muted hover:text-text-default mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all members
          </button>

          <div className="flex items-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-light text-text-default font-bold mr-3">
              {member.initials}
            </div>
            <div>
              <h2 className="text-text-default font-bold text-lg flex items-center">
                {member.name} {member.isFavorite && <Star className="w-4 h-4 text-status-warning ml-1" />}
              </h2>
              <p className="text-text-muted">{member.role}</p>
            </div>
          </div>

          <h3 className="text-text-default font-semibold mb-2">Manage Dashboard Access</h3>
          <p className="text-text-muted text-sm mb-6">Select which dashboard modules this team member can access.</p>

          <div className="space-y-4">
            {/* Overview */}
            <div className="flex items-center justify-between p-3 border border-border-default rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <PieChart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-default">Overview</h4>
                  <p className="text-xs text-text-muted">Dashboard overview with key metrics and KPIs</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-xs mr-2 ${permissions.overview ? 'text-status-success' : 'text-status-error'}`}>
                  {permissions.overview ? '✓ Granted' : '✕ No access'}
                </span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.overview ? 'bg-primary' : 'bg-background-hover'}`}
                  onClick={() => handleTogglePermission('overview')}
                >
                  <div 
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.overview ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </div>
              </div>
            </div>

            {/* Leads */}
            <div className="flex items-center justify-between p-3 border border-border-default rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <Database className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-default">Leads</h4>
                  <p className="text-xs text-text-muted">Manage and track sales leads</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-xs mr-2 ${permissions.leads ? 'text-status-success' : 'text-status-error'}`}>
                  {permissions.leads ? '✓ Granted' : '✕ No access'}
                </span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.leads ? 'bg-primary' : 'bg-background-hover'}`}
                  onClick={() => handleTogglePermission('leads')}
                >
                  <div 
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.leads ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </div>
              </div>
            </div>

            {/* Proposals */}
            <div className="flex items-center justify-between p-3 border border-border-default rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-default">Proposals</h4>
                  <p className="text-xs text-text-muted">Create and manage sales proposals</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-xs mr-2 ${permissions.proposals ? 'text-status-success' : 'text-status-error'}`}>
                  {permissions.proposals ? '✓ Granted' : '✕ No access'}
                </span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.proposals ? 'bg-primary' : 'bg-background-hover'}`}
                  onClick={() => handleTogglePermission('proposals')}
                >
                  <div 
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.proposals ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="flex items-center justify-between p-3 border border-border-default rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-default">Orders</h4>
                  <p className="text-xs text-text-muted">Track and manage customer orders</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-xs mr-2 ${permissions.orders ? 'text-status-success' : 'text-status-error'}`}>
                  {permissions.orders ? '✓ Granted' : '✕ No access'}
                </span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.orders ? 'bg-primary' : 'bg-background-hover'}`}
                  onClick={() => handleTogglePermission('orders')}
                >
                  <div 
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.orders ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </div>
              </div>
            </div>

            {/* Billing */}
            <div className="flex items-center justify-between p-3 border border-border-default rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <CreditCard className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-default">Billing</h4>
                  <p className="text-xs text-text-muted">Manage invoices and payment tracking</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-xs mr-2 ${permissions.billing ? 'text-status-success' : 'text-status-error'}`}>
                  {permissions.billing ? '✓ Granted' : '✕ No access'}
                </span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.billing ? 'bg-primary' : 'bg-background-hover'}`}
                  onClick={() => handleTogglePermission('billing')}
                >
                  <div 
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.billing ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modified Member Card Component
const MemberCard = ({ member, index, animate, onEdit, onDelete, onManage, onToggleApproval }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-4 rounded-2xl bg-background-card border border-border-default shadow-card border-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-light text-text-default font-bold">
            {member.initials}
          </div>
          <div>
            <h3 className="text-text-default font-semibold flex items-center">
              {member.name} {member.isFavorite && <Star className="w-4 h-4 text-status-warning ml-1" />}
            </h3>
            <p className="text-text-muted text-sm">{member.role}</p>
          </div>
        </div>
        
        <div className="flex space-x-3 text-text-muted">
          <Mail className="w-5 h-5 cursor-pointer" />
          <Phone className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      
      {/* Middle Section - Approval Toggle for all members */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-text-muted text-sm">Approval Status</p>
          <div 
            className={`w-12 h-6 rounded-full p-1 cursor-pointer ${member.isApproved ? 'bg-primary' : 'bg-background-hover'}`}
            onClick={() => onToggleApproval(index)}
          >
            <div 
              className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${member.isApproved ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </div>
        </div>
      </div>
      
      {/* Status & Actions - Modified to disable button when not approved */}
      <div className="mt-4 flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            member.status === "Active" ? "bg-status-success text-white" : 
            member.status === "On Leave" ? "bg-status-warning text-white" : 
            "bg-status-error text-white"
          }`}
        >
          {member.status}
        </span>
        
        <button
          onClick={() => member.isApproved && onManage(member)}
          className={`px-3 py-1 rounded-lg text-xs ${
            member.isApproved 
              ? "bg-primary-light text-text-default cursor-pointer" 
              : "bg-background-hover text-text-muted cursor-not-allowed opacity-60"
          }`}
          disabled={!member.isApproved}
        >
          Manage Access
        </button>
      </div>
    </motion.div>
  );
};

// Main TeamWidget Component
const TeamWidget = () => {
  const [animate, setAnimate] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [members, setMembers] = useState(teamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [approvalFilter, setApprovalFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  const handleEditMember = (member) => {
    console.log("Edit Member", member);
    // Implement edit logic here
  };

  const handleDeleteMember = (memberIndex) => {
    const updatedMembers = [...members];
    updatedMembers.splice(memberIndex, 1);
    setMembers(updatedMembers);
  };

  const handleToggleApproval = (memberIndex) => {
    const updatedMembers = [...members];
    updatedMembers[memberIndex].isApproved = !updatedMembers[memberIndex].isApproved;
    setMembers(updatedMembers);
  };

  const handleManageMember = (member) => {
    // Only allow managing members that are approved
    if (member.isApproved) {
      setSelectedMember(member);
      setIsManageModalOpen(true);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleApprovalFilter = (e) => {
    setApprovalFilter(e.target.value);
  };

  const handleApproveSelected = () => {
    const updatedMembers = members.map(member => {
      if (!member.isApproved) {
        return { ...member, isApproved: true };
      }
      return member;
    });
    setMembers(updatedMembers);
  };

  // Filter members based on search term, status, and approval status
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || member.status === statusFilter;
    const matchesApproval = approvalFilter === "All" || 
                            (approvalFilter === "Approved" && member.isApproved) || 
                            (approvalFilter === "Pending" && !member.isApproved);
    
    return matchesSearch && matchesStatus && matchesApproval;
  });

  return (
    <div className="p-6">
      {/* Header with title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-text-default">Team Members</h2>
        <button 
          className="px-4 py-2 rounded-lg bg-status-success text-white"
          onClick={handleApproveSelected}
        >
          Approve Selected
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 rounded-lg bg-background-hover text-text-muted flex-grow"
        />
        
        <select 
          className="px-4 py-2 rounded-lg bg-background-hover text-text-muted"
          value={statusFilter}
          onChange={handleStatusFilter}
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>On Leave</option>
          <option>Inactive</option>
        </select>
        
        <select 
          className="px-4 py-2 rounded-lg bg-background-hover text-text-muted"
          value={approvalFilter}
          onChange={handleApprovalFilter}
        >
          <option value="All">All Members</option>
          <option value="Approved">Approved Only</option>
          <option value="Pending">Pending Only</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member, index) => (
          <MemberCard 
            key={index}
            member={member}
            index={index}
            animate={animate}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
            onManage={handleManageMember}
            onToggleApproval={handleToggleApproval}
          />
        ))}
      </div>

      {/* Show message if no members found */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-8 text-text-muted">
          No team members found matching your criteria.
        </div>
      )}

      {/* Manage Member Modal */}
      <ManageMemberModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        member={selectedMember}
      />
    </div>
  );
};

export default TeamWidget;