"use client";

import { useState } from "react";
import { MoreHorizontal, Mail, Phone, Edit, Trash2, Settings } from "lucide-react";
import AddMemberModal from "./AddMemberModal";

const teamMembers = [
  { initials: "JS", name: "John Smith", role: "Software Engineer", performance: 85, projectsCompleted: 12, contributions: "120 commits", status: "Active" },
  { initials: "AE", name: "Alice Evans", role: "UI/UX Designer", performance: 78, projectsCompleted: 10, contributions: "95 commits", status: "Active" },
  { initials: "MR", name: "Michael Roberts", role: "DevOps Engineer", performance: 90, projectsCompleted: 15, contributions: "140 commits", status: "Active" },
  { initials: "CB", name: "Chris Brown", role: "Backend Developer", performance: 82, projectsCompleted: 9, contributions: "110 commits", status: "On Leave" },
  { initials: "LT", name: "Laura Thompson", role: "Frontend Developer", performance: 88, projectsCompleted: 11, contributions: "100 commits", status: "Active" },
  { initials: "DW", name: "David White", role: "QA Engineer", performance: 75, projectsCompleted: 8, contributions: "85 test cases", status: "Inactive" },
];

// Dashboard access management component included within this file
const ManageDashboardAccess = ({ member, onBack }) => {
  const [moduleAccess, setModuleAccess] = useState({
    dashboard: true,
    proposals: true,
    resources: true,
    curriculum: false,
    teamManagement: false
  });

  const toggleAccess = (moduleId) => {
    setModuleAccess({
      ...moduleAccess,
      [moduleId]: !moduleAccess[moduleId],
    });
  };

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background-card border border-border rounded-xl shadow-card max-w-2xl w-full p-6">
        <button 
          onClick={onBack} 
          className="flex items-center text-text-muted hover:text-text mb-6"
        >
          <span className="mr-1">←</span> Back to all members
        </button>

        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3 font-medium">
            {member.initials}
          </div>
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-text mr-2">{member.name}</h2>
              {member.isStarred && <span className="text-yellow-400">★</span>}
            </div>
            <p className="text-text-muted">{member.role}</p>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-text mb-2">Manage Dashboard Access</h3>
        <p className="text-text-muted mb-6">Select which dashboard modules this team member can access.</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                <span className="text-primary">D</span>
              </div>
              <div>
                <h4 className="font-medium text-text">Dashboard</h4>
                <p className="text-sm text-text-muted">Main dashboard with key metrics and KPIs</p>
              </div>
            </div>
            <div className="flex items-center">
              {moduleAccess.dashboard ? (
                <span className="text-status-success mr-2 flex items-center">
                  <span className="mr-1">✓</span> Granted
                </span>
              ) : (
                <span className="text-status-error mr-2 flex items-center">
                  <span className="mr-1">✕</span> No access
                </span>
              )}
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                  moduleAccess.dashboard ? "bg-status-success" : "bg-gray-300"
                }`}
                onClick={() => toggleAccess("dashboard")}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                    moduleAccess.dashboard ? "translate-x-6" : "translate-x-0"
                  }`} 
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                <span className="text-primary">P</span>
              </div>
              <div>
                <h4 className="font-medium text-text">Proposals</h4>
                <p className="text-sm text-text-muted">Create and manage proposals</p>
              </div>
            </div>
            <div className="flex items-center">
              {moduleAccess.proposals ? (
                <span className="text-status-success mr-2 flex items-center">
                  <span className="mr-1">✓</span> Granted
                </span>
              ) : (
                <span className="text-status-error mr-2 flex items-center">
                  <span className="mr-1">✕</span> No access
                </span>
              )}
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                  moduleAccess.proposals ? "bg-status-success" : "bg-gray-300"
                }`}
                onClick={() => toggleAccess("proposals")}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                    moduleAccess.proposals ? "translate-x-6" : "translate-x-0"
                  }`} 
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                <span className="text-primary">R</span>
              </div>
              <div>
                <h4 className="font-medium text-text">Resources</h4>
                <p className="text-sm text-text-muted">Access and manage resources</p>
              </div>
            </div>
            <div className="flex items-center">
              {moduleAccess.resources ? (
                <span className="text-status-success mr-2 flex items-center">
                  <span className="mr-1">✓</span> Granted
                </span>
              ) : (
                <span className="text-status-error mr-2 flex items-center">
                  <span className="mr-1">✕</span> No access
                </span>
              )}
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                  moduleAccess.resources ? "bg-status-success" : "bg-gray-300"
                }`}
                onClick={() => toggleAccess("resources")}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                    moduleAccess.resources ? "translate-x-6" : "translate-x-0"
                  }`} 
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                <span className="text-primary">C</span>
              </div>
              <div>
                <h4 className="font-medium text-text">Curriculum</h4>
                <p className="text-sm text-text-muted">View and manage curriculum materials</p>
              </div>
            </div>
            <div className="flex items-center">
              {moduleAccess.curriculum ? (
                <span className="text-status-success mr-2 flex items-center">
                  <span className="mr-1">✓</span> Granted
                </span>
              ) : (
                <span className="text-status-error mr-2 flex items-center">
                  <span className="mr-1">✕</span> No access
                </span>
              )}
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                  moduleAccess.curriculum ? "bg-status-success" : "bg-gray-300"
                }`}
                onClick={() => toggleAccess("curriculum")}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                    moduleAccess.curriculum ? "translate-x-6" : "translate-x-0"
                  }`} 
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                <span className="text-primary">T</span>
              </div>
              <div>
                <h4 className="font-medium text-text">Team Management</h4>
                <p className="text-sm text-text-muted">Manage team members and permissions</p>
              </div>
            </div>
            <div className="flex items-center">
              {moduleAccess.teamManagement ? (
                <span className="text-status-success mr-2 flex items-center">
                  <span className="mr-1">✓</span> Granted
                </span>
              ) : (
                <span className="text-status-error mr-2 flex items-center">
                  <span className="mr-1">✕</span> No access
                </span>
              )}
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                  moduleAccess.teamManagement ? "bg-status-success" : "bg-gray-300"
                }`}
                onClick={() => toggleAccess("teamManagement")}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                    moduleAccess.teamManagement ? "translate-x-6" : "translate-x-0"
                  }`} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMembers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Members");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [managingMember, setManagingMember] = useState(null);

  const handleManage = (member) => {
    setActiveDropdown(null);
    setManagingMember(member);
  };

  const handleBackToMembers = () => {
    setManagingMember(null);
  };

  return (
    <div className="p-6 bg-background">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-text">Tech Team</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-dark transition"
        >
          + Add Team Member
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-border rounded-md shadow-sm bg-background hover:bg-background-hover text-text focus:ring focus:ring-primary-light focus:border-primary"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full sm:w-1/4 p-2 border border-border rounded-md shadow-sm bg-background hover:bg-background-hover text-text focus:ring focus:ring-primary-light focus:border-primary"
        >
          <option>All Members</option>
          <option>UI/UX Designer</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>DevOps Engineer</option>
          <option>Software Engineer</option>
          <option>QA Engineer</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full sm:w-1/4 p-2 border border-border rounded-md shadow-sm bg-background hover:bg-background-hover text-text focus:ring focus:ring-primary-light focus:border-primary"
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-background-card p-4 shadow-card border border-border rounded-xl relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">{member.name}</h3>
                  <p className="text-sm text-text-muted">{member.role}</p>
                </div>
              </div>

              {/* More options (3 dots) */}
              <div className="relative">
                <MoreHorizontal
                  className="text-text-muted cursor-pointer hover:text-text"
                  size={18}
                  onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                />

                {/* Dropdown Menu */}
                {activeDropdown === index && (
                  <div className="absolute right-0 mt-2 w-36 bg-background-card border border-border shadow-card rounded-md z-10">
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-background-hover w-full"
                      onClick={() => alert(`Edit ${member.name}`)}
                    >
                      <Edit size={14} className="text-chart-purple" /> Edit
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm text-status-error hover:bg-background-hover w-full"
                      onClick={() => alert(`Delete ${member.name}`)}
                    >
                      <Trash2 size={14} className="text-status-error" /> Delete
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-background-hover w-full"
                      onClick={() => handleManage(member)}
                    >
                      <Settings size={14} className="text-chart-blue" /> Manage
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2">
              <p className="text-sm font-medium text-text">Performance: {member.performance}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-chart-purple h-2 rounded-full" style={{ width: `${member.performance}%` }}></div>
              </div>
            </div>
            <div className="mt-3 text-sm text-text">
              <p>Projects Completed: {member.projectsCompleted}</p>
              <p>Contributions: {member.contributions}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                member.status === "Active"
                  ? "bg-status-success text-white"
                  : member.status === "On Leave"
                  ? "bg-status-warning text-white"
                  : "bg-status-error text-white"
              }`}>
                {member.status}
              </span>
              <div className="flex gap-2">
                <Mail className="text-text-muted cursor-pointer hover:text-text" size={16} />
                <Phone className="text-text-muted cursor-pointer hover:text-text" size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Team Member Modal */}
      {isModalOpen && <AddMemberModal onClose={() => setIsModalOpen(false)} />}
      
      {/* Dashboard access management overlay */}
      {managingMember && (
        <ManageDashboardAccess 
          member={managingMember} 
          onBack={handleBackToMembers} 
        />
      )}
    </div>
  );
};

export default TeamMembers;