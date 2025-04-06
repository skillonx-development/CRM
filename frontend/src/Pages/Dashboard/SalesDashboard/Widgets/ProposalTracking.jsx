import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, PlusCircle, Search, X } from "lucide-react";
import axios from 'axios';

const api = {
  // Fetch all proposals from the database
  fetchProposals: async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/proposals'); 
      return response.data.proposals;
    } catch (error) {
      console.error("Error fetching proposals:", error);
      return [];
    }
  },
  // Create a new proposal in the database
  createProposal: async (proposal) => {
    try {
      const response = await axios.post('http://localhost:5001/api/proposals', proposal);
      return response.data.proposal;
    } catch (error) {
      console.error("Error creating proposal:", error);
      throw error;
    }
  }
};

const ProposalTracking = () => {
  const [proposals, setProposals] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

const [newProposal, setNewProposal] = useState({
  title: "",
  price: "",
  status: "Lead Acquired",
  statusColor: "bg-primary",
  institution: "",
  scheduleDate: "", 
  description: "",
});

  useEffect(() => {
    const loadProposals = async () => {
      setIsLoading(true);
      try {
        const data = await api.fetchProposals();
        setProposals(data);
        setFilteredProposals(data);
      } catch (err) {
        setError("Failed to load proposals");
      } finally {
        setIsLoading(false);
      }
    };

    loadProposals();
  }, []);

  // Filter function that runs whenever search or filter changes
  useEffect(() => {
    let results = [...proposals];
    
    // Apply status filter
    if (activeFilter !== "All") {
      const statusMap = {
        "Leads": "Lead Acquired",
        "Sent": "Proposal Sent",
        "Accepted": "Accepted",
        "Rejected": "Rejected"
      };
      results = results.filter(item => item.status === statusMap[activeFilter]);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.institution.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProposals(results);
  }, [activeFilter, searchQuery, proposals]);

  // Handle new proposal form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "status") {
      let statusColor = "bg-primary";
      if (value === "Proposal Sent") statusColor = "bg-status-info";
      else if (value === "Accepted") statusColor = "bg-status-success";
      else if (value === "Rejected") statusColor = "bg-status-error";
      
      setNewProposal({
        ...newProposal,
        [name]: value,
        statusColor
      });
    } else {
      setNewProposal({
        ...newProposal,
        [name]: value
      });
    }
  };

  // Handle form submission - save to database
  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const proposalToSave = {
        ...newProposal,
        scheduleDate: new Date(newProposal.scheduleDate).toISOString(),
      };

      const savedProposal = await api.createProposal(proposalToSave);
      setProposals((prev) => [...prev, savedProposal]);

      setShowNewProposalForm(false);
      setNewProposal({
        title: "",
        price: "",
        status: "Lead Acquired",
        statusColor: "bg-primary",
        institution: "",
        scheduleDate: "",
        description: "",
      });
    } catch (err) {
      alert("Failed to create proposal. Please try again.");
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl shadow-card border border-border w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-text">Proposal Tracking</h1>
        <button 
          className="bg-primary text-text px-4 py-2 rounded-lg flex items-center gap-2 shadow-card"
          onClick={() => setShowNewProposalForm(true)}
        >
          <PlusCircle size={18} /> Create New Proposal
        </button>
      </div>
      
      {/* Main content */}
      <div className="bg-background p-4 rounded-lg shadow-card border border-border">
        <h2 className="text-xl font-semibold text-text flex items-center gap-2 mb-4">
          <FileText size={20} /> Proposals
        </h2>
        
        {/* Filter and search */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {['All', 'Leads', 'Sent', 'Accepted', 'Rejected'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  activeFilter === tab 
                    ? 'bg-primary text-text' 
                    : 'bg-background-hover text-text-muted hover:bg-background-sidebar'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-border rounded-lg pl-3 pr-8 py-1 text-sm bg-background text-text shadow-sm"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text"
              >
                <X size={16} />
              </button>
            ) : (
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            )}
          </div>
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="p-8 text-center text-text-muted">
            Loading proposals...
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="p-8 text-center text-status-error">
            {error}. Please try again later.
          </div>
        )}
        
        {/* Empty state */}
        {!isLoading && !error && filteredProposals.length === 0 && (
          <div className="p-8 text-center text-text-muted">
            {searchQuery || activeFilter !== "All" 
              ? "No matching proposals found." 
              : "No proposals yet. Create your first proposal!"}
          </div>
        )}
        
        {/* Proposals grid */}
        {!isLoading && !error && filteredProposals.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredProposals.map((proposal, index) => (
              <motion.div
                key={proposal.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-background-card p-4 rounded-lg shadow-card border border-border flex flex-col"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-text flex items-center gap-2">
                    {proposal.title}
                    <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${proposal.statusColor} text-text`}>
                      {proposal.status}
                    </span>
                  </h3>
                  <span className="text-lg font-semibold text-text">₹{proposal.price}</span>
                </div>
                <p className="text-text-muted text-sm">{proposal.institution}</p>
                <div className="flex justify-between items-center text-text-muted text-sm mt-2">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" /> 
                     {new Date(proposal.scheduleDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                      })}
                  </div>
                </div>
                <div className="flex justify-between items-center text-text mt-3">
                  <button className="text-sm flex items-center gap-2 text-text-muted hover:text-text">
                    <FileText size={16} /> View proposal details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modal for new proposal */}
      {showNewProposalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background p-6 rounded-xl shadow-card border border-border w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text">Create New Proposal</h2>
              <button 
                onClick={() => setShowNewProposalForm(false)}
                className="text-text-muted hover:text-text"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Workshop Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newProposal.title}
                  onChange={handleInputChange}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background-card text-text shadow-sm"
                  placeholder="e.g. React Workshop"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={newProposal.price}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background-card text-text shadow-sm"
                    placeholder="e.g. $4,500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newProposal.status}
                    onChange={handleInputChange}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background-card text-text shadow-sm"
                    required
                  >
                    <option value="Lead Acquired">Lead Acquired</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={newProposal.institution}
                  onChange={handleInputChange}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background-card text-text shadow-sm"
                  placeholder="e.g. ABC University"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Schedule Date
                </label>
                <input
                  type="text"
                  name="scheduleDate"
                  value={newProposal.scheduleDate}
                  onChange={handleInputChange}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background-card text-text shadow-sm"
                  placeholder="e.g. Mar 15, 2023"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newProposal.description}
                  onChange={handleInputChange}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background-card text-text shadow-sm h-24"
                  placeholder="Enter workshop description..."
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProposalForm(false)}
                  className="px-4 py-2 border border-border rounded-lg text-text bg-background-hover hover:bg-background-sidebar"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-text rounded-lg shadow-card"
                >
                  Create Proposal
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProposalTracking;