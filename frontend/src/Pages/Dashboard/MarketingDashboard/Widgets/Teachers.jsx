import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Star, CheckCircle, UserCheck, X } from "lucide-react";
import axios from "axios";

const filters = ["All Teachers", "Available", "Busy", "Tentative"];

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Teachers");
  const [assignedWorkshops, setAssignedWorkshops] = useState({});
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [proposals, setProposals] = useState([]);

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/teachers");
        const fetchedTeachers = Array.isArray(res.data) ? res.data : res.data.teachers || [];
        setTeachers(fetchedTeachers);

        // Load assigned workshops into state
        const initialAssignments = {};
        fetchedTeachers.forEach((t) => {
          if (t.assignedWorkshop) {
            initialAssignments[t.name] = t.assignedWorkshop;
          }
        });
        setAssignedWorkshops(initialAssignments);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  // Fetch proposals when a teacher is selected
  useEffect(() => {
    const fetchProposals = async () => {
      if (!selectedTeacher) return;
      try {
        const res = await axios.get("http://localhost:5001/api/tech-proposals");
        setProposals(Array.isArray(res.data) ? res.data : res.data.proposals || []);
      } catch (err) {
        console.error("Failed to fetch proposals:", err);
        setProposals([]);
      }
    };

    fetchProposals();
  }, [selectedTeacher]);

  const filteredTeachers = Array.isArray(teachers)
    ? teachers.filter(
        (teacher) => activeFilter === "All Teachers" || teacher.status === activeFilter
      )
    : [];

  const handleAssignClick = (teacherName) => {
    setSelectedTeacher(teacherName);
  };

  const handleAssignToWorkshop = async (proposal) => {
    try {
      await axios.post(`http://localhost:5001/api/teachers/assign/${selectedTeacher}`, {
        workshopTitle: proposal.title,
      });

      setAssignedWorkshops((prev) => ({
        ...prev,
        [selectedTeacher]: proposal.title,
      }));
      setSelectedTeacher(null);
    } catch (error) {
      console.error("Failed to assign proposal:", error);
    }
  };

  return (
    <div className="p-6 bg-background rounded-2xl shadow-card">
      {/* Filters */}
      <div className="flex space-x-4 border-b border-border pb-4 mb-4">
        {filters.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeFilter === tab
                ? "bg-primary text-text shadow-md"
                : "bg-background-hover text-text-muted hover:bg-background"
            }`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Teacher Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {filteredTeachers.map((teacher, index) => (
          <motion.div
            key={index}
            className="bg-background-card border border-border rounded-2xl p-5 shadow-card flex flex-col gap-3 transition"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User size={36} className="text-text-muted" />
                <div>
                  <h3 className="text-lg font-semibold text-text">{teacher.name}</h3>
                  <p className="text-sm text-text-muted">{teacher.specialty}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${teacher.statusColor}`}
              >
                {teacher.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-text-muted flex items-center gap-1">
                <CheckCircle size={14} className="text-status-success" />
                {teacher.workshops} workshops conducted
              </p>
              <p className="text-sm text-text-muted flex items-center gap-1">
                <Star size={14} className="text-chart-yellow" />
                {teacher.rating}
              </p>
            </div>

            {assignedWorkshops[teacher.name] && (
              <p className="text-sm font-medium text-text-success">
                Assigned to: {assignedWorkshops[teacher.name]}
              </p>
            )}

            <div className="flex justify-between mt-2">
              <button className="px-4 py-2 text-sm font-medium text-text-muted border border-border rounded-lg hover:bg-background-hover transition">
                View Profile
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition flex items-center gap-2 ${
                  assignedWorkshops[teacher.name]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark"
                }`}
                onClick={() => handleAssignClick(teacher.name)}
                disabled={assignedWorkshops[teacher.name]}
              >
                <UserCheck size={16} />
                {assignedWorkshops[teacher.name] ? "Assigned" : "Assign"}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredTeachers.length === 0 && (
        <p className="text-center text-text-muted mt-4">
          No teachers found for this category.
        </p>
      )}

      {/* Assign Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-background-card p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Assign Proposal</h2>
              <button onClick={() => setSelectedTeacher(null)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-text-muted mb-4">
              Select a proposal to assign {selectedTeacher}:
            </p>
            <ul>
              {proposals.length > 0 ? (
                proposals.map((proposal, index) => (
                  <li
                    key={index}
                    className="p-3 bg-background-hover rounded-lg mb-2 cursor-pointer hover:bg-background transition"
                    onClick={() => handleAssignToWorkshop(proposal)}
                  >
                    <p className="font-medium">{proposal.title}</p>
                    <p className="text-xs text-text-muted">
                      {proposal.schedule} – {proposal.institution}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-sm text-text-muted">No proposals available</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
