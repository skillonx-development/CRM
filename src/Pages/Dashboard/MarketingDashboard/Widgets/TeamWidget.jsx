import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Mail, Phone, MoreVertical, X, Pencil, Trash, Settings, ArrowLeft, Database, PieChart, FileText, ShoppingCart, CreditCard } from "lucide-react";

const MemberOptions = ({ onEdit, onDelete, onManage }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="text-text-muted">
          <MoreVertical className="w-5 h-5" />
        </button>
  
        {isOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-background-card border border-border-default rounded-lg shadow-lg z-10">
            <button
              className="flex items-center px-4 py-2 text-text-default hover:bg-background-hover w-full text-sm"
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
            >
              <Pencil className="w-4 h-4 mr-2" /> Edit 
            </button>
            <button
              className="flex items-center px-4 py-2 text-text-default hover:bg-background-hover w-full text-sm"
              onClick={() => {
                onManage();
                setIsOpen(false);
              }}
            >
              <Settings className="w-4 h-4 mr-2" /> Manage 
            </button>
            <button
              className="flex items-center px-4 py-2 text-red-500 hover:bg-background-hover w-full text-sm"
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
            >
              <Trash className="w-4 h-4 mr-2" /> Delete 
            </button>
          </div>
        )}
      </div>
    );
  };

const teamMembers = [
  {
    initials: "DM",
    name: "David Miller",
    role: "Digital Marketing Specialist",
    performance: 83,
    status: "Active",
    isFavorite: true,
    campaigns: 10,
    contentCreated: 45,
    skills: ["PPC", "Email Marketing", "Analytics"]
  },
  {
    initials: "ET",
    name: "Emma Thompson",
    role: "Social Media Manager",
    performance: 88,
    status: "Active",
    isFavorite: true,
    campaigns: 18,
    contentCreated: 124,
    skills: ["Social Media Strategy", "Community Management", "Analytics"]
  },
  {
    initials: "JA",
    name: "James Anderson",
    role: "Content Strategist",
    performance: 85,
    status: "Active",
    isFavorite: false,
    campaigns: 12,
    contentCreated: 64,
    skills: ["Content Strategy", "SEO", "Copywriting"]
  },
  {
    initials: "JD",
    name: "Jessica Davis",
    role: "Graphic Designer",
    performance: 91,
    status: "Active",
    isFavorite: false,
    campaigns: 14,
    contentCreated: 156,
    skills: ["Graphic Design", "UI/UX", "Animation"]
  },
  {
    initials: "MB",
    name: "Michael Brown",
    role: "SEO Specialist",
    performance: 79,
    status: "On Leave",
    isFavorite: false,
    campaigns: 8,
    contentCreated: 32,
    skills: ["SEO", "Content Optimization", "Keyword Research"]
  },
  {
    initials: "SW",
    name: "Sarah Wilson",
    role: "Marketing Manager",
    performance: 92,
    status: "Active",
    isFavorite: true,
    campaigns: 15,
    contentCreated: 87,
    skills: ["Strategy", "Team Leadership", "Analytics"]
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
                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <PieChart className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-default">Overview</h4>
                      <p className="text-xs text-gray-500">Dashboard overview with key metrics and KPIs</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs mr-2 ${permissions.overview ? 'text-green-600' : 'text-red-600'}`}>
                      {permissions.overview ? '✓ Granted' : '✕ No access'}
                    </span>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.overview ? 'bg-primary' : 'bg-background-hover '}`}
                      onClick={() => handleTogglePermission('overview')}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.overview ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Proposals */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-default">Proposals</h4>
                      <p className="text-xs text-gray-500">Create and manage marketing proposals</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs mr-2 ${permissions.proposals ? 'text-green-600' : 'text-red-600'}`}>
                      {permissions.proposals ? '✓ Granted' : '✕ No access'}
                    </span>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.proposals ? 'bg-primary' : 'bg-background-hover '}`}
                      onClick={() => handleTogglePermission('proposals')}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.proposals ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Teachers */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <div className="w-4 h-4 text-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-default">Teachers</h4>
                      <p className="text-xs text-gray-500">Manage teacher profiles and assignments</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs mr-2 ${permissions.teachers ? 'text-green-600' : 'text-red-600'}`}>
                      {permissions.teachers ? '✓ Granted' : '✕ No access'}
                    </span>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.teachers ? 'bg-primary' : 'bg-background-hover '}`}
                      onClick={() => handleTogglePermission('teachers')}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.teachers ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <div className="w-4 h-4 text-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3v18h18" />
                          <path d="M18 17V9" />
                          <path d="M13 17V5" />
                          <path d="M8 17v-3" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-default">Feedback</h4>
                      <p className="text-xs text-gray-500">View and manage student feedback</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs mr-2 ${permissions.feedback ? 'text-green-600' : 'text-red-600'}`}>
                      {permissions.feedback ? '✓ Granted' : '✕ No access'}
                    </span>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.feedback ? 'bg-primary' : 'bg-background-hover '}`}
                      onClick={() => handleTogglePermission('feedback')}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.feedback ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Promotion */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <div className="w-4 h-4 text-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-default">Promotion</h4>
                      <p className="text-xs text-gray-500">Manage promotional campaigns and events</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs mr-2 ${permissions.promotion ? 'text-green-600' : 'text-red-600'}`}>
                      {permissions.promotion ? '✓ Granted' : '✕ No access'}
                    </span>
                    <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${permissions.promotion ? 'bg-primary' : 'bg-background-hover '}`}
                      onClick={() => handleTogglePermission('promotion')}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${permissions.promotion ? 'translate-x-6' : 'translate-x-0'}`}
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

// Add Team Member Modal Component
const AddTeamMemberModal = ({ isOpen, onClose, onAddMember }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "Marketing Specialist",
    email: "",
    phone: "",
    password: "",
    status: "Active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate initials from full name
    const names = formData.fullName.split(" ");
    const initials = names.length > 1 
      ? `${names[0][0]}${names[names.length - 1][0]}` 
      : names[0].substring(0, 2);
    
    // Create new team member object
    const newMember = {
      initials: initials.toUpperCase(),
      name: formData.fullName,
      role: formData.role,
      performance: 50, // Default starting performance
      status: formData.status,
      isFavorite: false,
      email: formData.email,
      phone: formData.phone,
      campaigns: 0,
      contentCreated: 0,
      skills: []
    };
    
    onAddMember(newMember);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-75 flex items-center justify-center z-50 border-none ">
      <div className="bg-background-card rounded-xl shadow-card w-full max-w-md">
        <div className="p-4 flex justify-between items-center border-b border-border-default">
          <div>
            <h2 className="text-text-default font-bold text-lg">Add Team Member</h2>
            <p className="text-text-muted text-sm">Add a new team member to your marketing team.</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-text-muted hover:text-text-default"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="fullName" className="block text-text-default text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full px-3 py-2 bg-background-hover text-text-default border border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label htmlFor="role" className="block text-text-default text-sm font-medium mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Marketing Specialist"
                className="w-full px-3 py-2 bg-background-hover text-text-default border border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="email" className="block text-text-default text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.smith@example.com"
                className="w-full px-3 py-2 bg-background-hover text-text-default border border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label htmlFor="phone" className="block text-text-default text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 bg-background-hover text-text-default border border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label htmlFor="password" className="block text-text-default text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background-hover text-text-default border border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="status" className="block text-text-default text-sm font-medium mb-1">
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background-hover text-text-default border border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-text-default bg-background-hover hover:bg-border-default transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main TeamWidget Component
const TeamWidget = () => {
  const [animate, setAnimate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [members, setMembers] = useState(teamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  const handleAddMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  const handleEditMember = (member) => {
    console.log("Edit Member", member);
    // Implement edit logic here
  };

  const handleDeleteMember = (memberIndex) => {
    const updatedMembers = [...members];
    updatedMembers.splice(memberIndex, 1);
    setMembers(updatedMembers);
  };

  const handleManageMember = (member) => {
    setSelectedMember(member);
    setIsManageModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter members based on search term and status
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-lg bg-primary-light text-text-default">All Members</button>
          <button className="px-4 py-2 rounded-lg bg-background-hover text-text-muted">Performance</button>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="px-4 py-2 bg-primary text-white rounded-lg flex items-center space-x-2"
        >
          <span>+ Add Team Member</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 w-1/3 rounded-lg bg-background-hover text-text-muted"
        />
        <div className="flex space-x-4">
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
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredMembers.map((member, index) => (
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
              <MemberOptions
                onEdit={() => handleEditMember(member)}
                onDelete={() => handleDeleteMember(index)}
                onManage={() => handleManageMember(member)}
              />
            </div>
            
            {/* Performance */}
            <div className="mt-4">
              <p className="text-text-muted text-sm">Performance</p>
              <div className="w-full h-2 bg-background-hover rounded-full mt-1">
                <div
                  className="h-2 bg-status-info rounded-full"
                  style={{ width: `${member.performance}%` }}
                ></div>
              </div>
              <p className="text-text-default text-sm font-bold mt-1">{member.performance}%</p>
            </div>
            
            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div>
                <p className="text-text-muted text-xs">Campaigns</p>
                <p className="text-text-default font-bold">{member.campaigns}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Content Created</p>
                <p className="text-text-default font-bold">{member.contentCreated}</p>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mt-3 flex flex-wrap gap-2">
              {member.skills && member.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 bg-background-hover rounded-md text-text-default text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Status & Actions */}
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
              <div className="flex space-x-3 text-text-muted">
                <Mail className="w-5 h-5 cursor-pointer" />
                <Phone className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Team Member Modal */}
      <AddTeamMemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddMember={handleAddMember}
      />

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