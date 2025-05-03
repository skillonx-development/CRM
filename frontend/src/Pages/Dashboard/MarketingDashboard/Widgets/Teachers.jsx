import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  User,
  Star,
  CheckCircle,
  UserCheck,
  X,
} from "lucide-react";

const filters = ["All Teachers", "Available", "Busy"];

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Teachers");
  const [assignedWorkshops, setAssignedWorkshops] = useState({});
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [viewTeacher, setViewTeacher] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("https://crm-383e.onrender.com/api/teachers");
        const fetchedTeachers = Array.isArray(res.data)
          ? res.data
          : res.data.teachers || [];
        setTeachers(fetchedTeachers);

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

  useEffect(() => {
    const fetchProposals = async () => {
      if (!selectedTeacher) return;
      try {
        const res = await axios.get("https://crm-383e.onrender.com/api/tech-proposals");
        const allProposals = Array.isArray(res.data) ? res.data : res.data.proposals || [];
  
        // Filter only accepted proposals
        const acceptedProposals = allProposals.filter(
          (proposal) => proposal.status === "Accepted"
        );
  
        setProposals(acceptedProposals);
      } catch (err) {
        console.error("Failed to fetch proposals:", err);
        setProposals([]);
      }
    };
  
    fetchProposals();
  }, [selectedTeacher]);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      activeFilter === "All Teachers" || teacher.status === activeFilter
  );

  const handleAssignClick = (teacherName) => {
    setSelectedTeacher(teacherName);
  };

  const handleAssignToWorkshop = async (proposal) => {
    try {
      // Sending the assignment request to the backend
      await axios.post(
        `https://crm-383e.onrender.com/api/teachers/assign/${selectedTeacher}`,
        {
          workshopTitle: proposal.title,
          status: "Busy",
        }
      );

      // Update the assigned workshops and statuses in the local state
      setAssignedWorkshops((prev) => ({
        ...prev,
        [selectedTeacher]: proposal.title,
      }));

      setTeachers((prev) =>
        prev.map((t) =>
          t.name === selectedTeacher
            ? { ...t, assignedWorkshop: proposal.title, status: "Busy" }
            : t
        )
      );

      // Reset selected teacher to null after assignment
      setSelectedTeacher(null);
    } catch (error) {
      console.error("Failed to assign proposal:", error);
    }
  };

  return (
    <div className="p-6 bg-background rounded-2xl shadow-card">
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
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted">
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
              <button
                className="px-4 py-2 text-sm font-medium text-text-muted border border-border rounded-lg hover:bg-background-hover transition"
                onClick={() => setViewTeacher(teacher)}
              >
                View Profile
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition flex items-center gap-2 ${
                  teacher.status === "Busy"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark"
                }`}
                onClick={() => handleAssignClick(teacher.name)}
                disabled={teacher.status === "Busy"}
              >
                <UserCheck size={16} />
                {teacher.status === "Busy" ? "Assigned" : "Assign"}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

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

      {/* View/Edit Modal with Unassign button */}
      {viewTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-background-card p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Teacher</h2>
              <button onClick={() => setViewTeacher(null)}>
                <X size={20} />
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(
                    `https://crm-383e.onrender.com/api/teachers/${viewTeacher._id}`,
                    viewTeacher
                  );
                  setTeachers((prev) =>
                    prev.map((t) => (t._id === viewTeacher._id ? viewTeacher : t))
                  );
                  setViewTeacher(null);
                } catch (err) {
                  console.error("Update failed", err);
                }
              }}
            >
              <input
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
                value={viewTeacher.name}
                onChange={(e) =>
                  setViewTeacher((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
                value={viewTeacher.specialty}
                onChange={(e) =>
                  setViewTeacher((prev) => ({ ...prev, specialty: e.target.value }))
                }
              />
              <input
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
                value={viewTeacher.assignedWorkshop || "No workshop selected"}
                onChange={(e) =>
                  setViewTeacher((prev) => ({ ...prev, assignedWorkshop: e.target.value }))
                }
              />
              <select
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
                value={viewTeacher.status || ""}
                onChange={(e) =>
                  setViewTeacher((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300  text-black px-4 py-2 rounded-lg"
                  onClick={() => setViewTeacher(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-purple-600 px-4 py-2 text-white rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded-lg"
                  onClick={async () => {
                    try {
                      const updatedTeacher = {
                        ...viewTeacher,
                        status: "Available",
                        assignedWorkshop: "",
                      };

                      await axios.put(
                        `https://crm-383e.onrender.com/api/teachers/${viewTeacher._id}`,
                        updatedTeacher
                      );

                      setTeachers((prev) =>
                        prev.map((t) =>
                          t._id === viewTeacher._id ? updatedTeacher : t
                        )
                      );
                      setViewTeacher(null);
                    } catch (err) {
                      console.error("Failed to unassign teacher", err);
                    }
                  }}
                >
                  Unassign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
