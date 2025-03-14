import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, PlusCircle, Search, X } from "lucide-react";

const ProposalTracking = () => {
  // Initial data
  const initialProposals = [
    { title: "React Workshop", price: "$4,500", status: "Proposal Sent", statusColor: "bg-status-info", institution: "ABC University", schedule: "Mar 15, 2023", description: "3-day intensive React workshop covering fundamentals to advanced concepts with hands-on projects.", daysLeft: "2 days left" },
    { title: "UI/UX Design Workshop", price: "$7,200", status: "Lead Acquired", statusColor: "bg-primary", institution: "XYZ College", schedule: "Mar 20, 2023", description: "5-day workshop on UI/UX design principles, tools, and methodologies.", daysLeft: "7 days left" },
    { title: "Machine Learning Workshop", price: "$9,800", status: "Accepted", statusColor: "bg-status-success", institution: "Tech Institute", schedule: "Apr 5, 2023", description: "7-day in-depth machine learning workshop with practical applications and projects.", daysLeft: "10 days left" },
    { title: "Web Development Workshop", price: "$5,600", status: "Proposal Sent", statusColor: "bg-status-info", institution: "Digital Academy", schedule: "Apr 12, 2023", description: "4-day web development workshop covering HTML, CSS, JavaScript, and responsive design.", daysLeft: "5 days left" },
    { title: "Cloud Computing Workshop", price: "$4,200", status: "Rejected", statusColor: "bg-status-error", institution: "Future University", schedule: "Apr 18, 2023", description: "3-day workshop on cloud platforms, deployment, and management.", daysLeft: "1 day left" },
    { title: "Blockchain Workshop", price: "$3,500", status: "Accepted", statusColor: "bg-status-success", institution: "Innovation College", schedule: "Apr 25, 2023", description: "2-day introduction to blockchain technology and smart contracts.", daysLeft: "12 days left" }
  ];

  // State variables
  const [proposals, setProposals] = useState(initialProposals);
  const [filteredProposals, setFilteredProposals] = useState(initialProposals);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    price: "",
    status: "Lead Acquired",
    statusColor: "bg-primary",
    institution: "",
    schedule: "",
    description: "",
    daysLeft: "14 days left"
  });

  // Simple filter function that runs whenever search or filter changes
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setProposals([...proposals, newProposal]);
    setShowNewProposalForm(false);
    setNewProposal({
      title: "",
      price: "",
      status: "Lead Acquired",
      statusColor: "bg-primary",
      institution: "",
      schedule: "",
      description: "",
      daysLeft: "14 days left"
    });
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
      <div className="bg-background-card p-4 rounded-lg shadow-card border border-border">
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
        
        {/* Proposals grid */}
        {filteredProposals.length === 0 ? (
          <div className="p-8 text-center text-text-muted">
            No matching proposals found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredProposals.map((proposal, index) => (
              <motion.div
                key={index}
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
                  <span className="text-lg font-semibold text-text">{proposal.price}</span>
                </div>
                <p className="text-text-muted text-sm">{proposal.institution}</p>
                <p className="text-text-muted text-xs mt-1">{proposal.description}</p>
                <div className="flex justify-between items-center text-text-muted text-sm mt-2">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" /> {proposal.schedule}
                  </div>
                  <span className="text-status-error text-sm font-semibold">{proposal.daysLeft}</span>
                </div>
                <div className="flex justify-between items-center text-text mt-3">
                  <button className="text-sm flex items-center gap-2 text-text-muted hover:text-text">
                    <FileText size={16} /> View proposal details
                  </button>
                  <motion.button 
                    className="px-3 py-1 bg-background rounded-lg text-text border border-border hover:bg-background-hover" 
                    whileHover={{ scale: 1.05 }}
                  >
                    Open
                  </motion.button>
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
                  name="schedule"
                  value={newProposal.schedule}
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