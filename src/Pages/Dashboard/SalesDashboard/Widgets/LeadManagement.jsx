  "use client";

  import { useState } from "react";
  import { motion } from "framer-motion";
  import { MapPin, Phone, Mail, X, Trash, Eye, ChevronDown } from "lucide-react";

  const initialLeads = [
    {
      name: "ABC University",
      location: "New York, NY",
      contactPerson: "John Smith",
      phone: "(123) 456-7890",
      email: "jsmith@abcuniversity.edu",
      interest: "React Workshop, 3 days",
      addedOn: "Today",
      status: "New Lead",
      statusColor: "bg-chart-indigo text-white",
    },
    {
      name: "XYZ College",
      location: "Boston, MA",
      contactPerson: "Sarah Johnson",
      phone: "(234) 567-8901",
      email: "sjohnson@xyzcollege.edu",
      interest: "UI/UX Workshop, 5 days",
      addedOn: "Yesterday",
    },
    {
      name: "Tech Institute",
      location: "San Francisco, CA",
      contactPerson: "Michael Brown",
      phone: "(345) 678-9012",
      email: "mbrown@techinstitute.edu",
      interest: "Machine Learning Workshop, 7 days",
      addedOn: "2 days ago",
    },
    {
      name: "Digital Academy",
      location: "Chicago, IL",
      contactPerson: "Emily Davis",
      phone: "(456) 789-0123",
      email: "edavis@digitalacademy.edu",
      interest: "Web Development Workshop, 4 days",
      addedOn: "3 days ago",
    },
    {
      name: "Future University",
      location: "Seattle, WA",
      contactPerson: "David Wilson",
      phone: "(567) 890-1234",
      email: "dwilson@futureuniversity.edu",
      interest: "Cloud Computing Workshop, 3 days",
      addedOn: "5 days ago",
    },
    {
      name: "Innovation College",
      location: "Austin, TX",
      contactPerson: "Lisa Miller",
      phone: "(678) 901-2345",
      email: "lmiller@innovationcollege.edu",
      interest: "Blockchain Workshop, 2 days",
      addedOn: "1 week ago",
    },

  ];
  const ModernButton = ({ onClick, children, color }) => {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-5 py-2 rounded-2xl text-white font-medium transition-all shadow-md ${
          color === "red"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {children}
      </motion.button>
    );
  };


  const LeadManagement = () => {
    const [leads, setLeads] = useState(initialLeads);
    const [selectedLead, setSelectedLead] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    
    const handleDeleteLead = (index) => {
      setLeads(leads.filter((_, i) => i !== index));
    };

    const filteredLeads = leads.filter((lead) =>
      (filterStatus === "All" || lead.status === filterStatus) &&
      lead.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleAddLead = () => {
      setLeads([...leads, newLead]);
      setShowModal(false);
      setNewLead({
        name: "",
        location: "",
        contactPerson: "",
        phone: "",
        email: "",
        interest: "",
        addedOn: "Today",
        status: "New Lead",
        statusColor: "bg-chart-indigo text-white",
      });
    };

    return (
      <div className="bg-background-card p-6 rounded-xl shadow-card border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Lead Management</h2>
            <button
            onClick={() => setShowModal(true)}
            className="bg-primary-dark text-white px-4 py-2 rounded-lg  gap-2 hover:bg-primary transition-all"
          >
            ➕ Add New Lead
          </button>
        </div>
        

        <div className="mb-4">
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Leads</option>
            <option value="New Lead">New Lead</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-background-hover p-4 rounded-lg shadow-card border border-border relative"
            >
              <div className="flex justify-between">
                <h3 className="text-white font-medium">{lead.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${lead.statusColor}`}>
                  {lead.status}
                </span>
              </div>
              <p className="text-text-muted text-sm flex items-center gap-2 mt-1">
                <MapPin size={14} /> {lead.location}
              </p>
              <p className="text-text-muted text-sm mt-2">
                <span className="font-medium text-white">Contact Person:</span> {lead.contactPerson}
              </p>
              <p className="text-text-muted text-sm flex items-center gap-2">
                <Phone size={14} /> {lead.phone}
              </p>
              <p className="text-text-muted text-sm flex items-center gap-2">
                <Mail size={14} /> {lead.email}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <button onClick={() => setSelectedLead(lead)} className="bg-blue-500 px-3 py-1 text-xs text-white rounded-lg flex items-center gap-2">
                  <Eye size={14} /> View Details
                </button>
                <button onClick={() => handleDeleteLead(index)} className="bg-red-500 px-3 py-1 text-xs text-white rounded-lg flex items-center gap-2">
                  <Trash size={14} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedLead && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-background-card p-6 rounded-xl shadow-card border border-border w-96 relative">
              <button onClick={() => setSelectedLead(null)} className="absolute top-3 right-3 text-white">
                <X size={20} />
              </button>
              <h3 className="text-white font-medium mb-4">Lead Details</h3>
              <p className="text-white"><strong>Name:</strong> {selectedLead.name}</p>
              <p className="text-white"><strong>Location:</strong> {selectedLead.location}</p>
              <p className="text-white"><strong>Contact:</strong> {selectedLead.contactPerson}</p>
              <p className="text-white"><strong>Phone:</strong> {selectedLead.phone}</p>
              <p className="text-white"><strong>Email:</strong> {selectedLead.email}</p>
              <p className="text-white"><strong>Interest:</strong> {selectedLead.interest}</p>
              <p className="text-white"><strong>Status:</strong> {selectedLead.status}</p>
            </div>
          </div>
        )}
        
      </div>
    );
  };

  export default LeadManagement;