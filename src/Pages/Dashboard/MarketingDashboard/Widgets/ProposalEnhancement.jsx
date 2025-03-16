import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown, PlusCircle } from "lucide-react";

const workshops = [
  {
    title: "3-Day React Workshop",
    org: "Tech University",
    date: "Aug 15-17, 2023",
    duration: "3 days",
    instructor: "Dr. Jane Smith",
    status: "Enhancing",
    statusColor: "text-status-purple",
  },
  {
    title: "UI/UX Design Masterclass",
    org: "Design Academy",
    date: "July 10-11, 2023",
    duration: "2 days",
    instructor: "Prof. Robert Johnson",
    status: "Ready",
    statusColor: "text-status-green",
  },
  {
    title: "Data Science Fundamentals",
    org: "Analytics College",
    date: "Sept 20-24, 2023",
    duration: "5 days",
    instructor: "Dr. Mike Peterson",
    status: "Draft",
    statusColor: "text-status-yellow",
  },
  {
    title: "Cloud Computing Workshop",
    org: "IT Institute",
    date: "Oct 5-7, 2023",
    duration: "3 days",
    instructor: "Prof. Sarah Williams",
    status: "Sent",
    statusColor: "text-status-blue",
  },
  {
    title: "Artificial Intelligence Bootcamp",
    org: "Future Academy",
    date: "Nov 15-20, 2023",
    duration: "6 days",
    instructor: "Dr. Alex Johnson",
    status: "Draft",
    statusColor: "text-status-yellow",
  },
  {
    title: "Mobile App Development",
    org: "Digital University",
    date: "Dec 1-5, 2023",
    duration: "5 days",
    instructor: "Prof. Emily Brown",
    status: "Enhancing",
    statusColor: "text-status-purple",
  },
];

const filters = ["All Proposals", "Enhancing", "Ready", "Sent"];

export default function ProposalEnhancement() {
  const [activeFilter, setActiveFilter] = useState("All Proposals");
  const [searchQuery, setSearchQuery] = useState("");

  const handleNewEnhancement = () => alert("New Enhancement Clicked!");
  const handleFilter = () => alert("Filter Clicked!");
  const handleSort = () => alert("Sort Clicked!");
  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const filteredWorkshops = workshops
    .filter((w) =>
      activeFilter === "All Proposals" ? true : w.status === activeFilter
    )
    .filter((w) =>
      w.title.toLowerCase().includes(searchQuery) ||
      w.org.toLowerCase().includes(searchQuery) ||
      w.instructor.toLowerCase().includes(searchQuery)
    );

  return (
    <div className="p-6 bg-background rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text">
            Proposal Enhancement
          </h1>
          <p className="text-text-muted text-sm">
            Enhance workshop proposals with research and value additions.
          </p>
        </div>
        <button
          onClick={handleNewEnhancement}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition"
        >
          <PlusCircle size={16} />
          New Enhancement
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 text-text-muted" size={16} />
          <input
            type="text"
            placeholder="Search proposals..."
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-text bg-background-muted"
          />
        </div>

        <button
          onClick={handleSort}
          className="px-4 py-2 text-sm font-medium border border-border rounded-lg flex items-center gap-2 hover:bg-background-hover transition"
        >
          <ArrowUpDown size={16} />
          Sort
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        {filters.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium border border-border rounded-lg transition 
              ${
                activeFilter === tab
                  ? "bg-primary text-white"
                  : "bg-background-card text-text hover:bg-background-hover"
              }`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop, index) => (
            <motion.div
              key={index}
              className="bg-background-card border border-border rounded-2xl p-4 shadow-card"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-text">
                  {workshop.title}
                </h3>
                <span
                  className={`text-xs font-medium ${workshop.statusColor} bg-background-pill px-3 py-1 rounded-full`}
                >
                  {workshop.status}
                </span>
              </div>

              {/* Details */}
              <p className="text-sm text-text-muted">{workshop.org}</p>
              <p className="text-sm text-text-muted">
                {workshop.date} • {workshop.duration}
              </p>
              <p className="text-sm text-primary">{workshop.instructor}</p>

              {/* Actions */}
              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 text-sm font-medium text-text border border-border rounded-lg hover:bg-background-hover transition">
                  Edit
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-md hover:bg-accent-dark transition">
                  Enhance
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-text-muted col-span-2">
            No workshops found for this category.
          </p>
        )}
      </motion.div>
    </div>
  );
}
