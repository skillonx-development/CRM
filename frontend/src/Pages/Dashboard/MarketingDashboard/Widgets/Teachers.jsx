import { useState } from "react";
import { motion } from "framer-motion";
import { User, Star, CheckCircle, UserCheck, X } from "lucide-react";

const filters = ["All Teachers", "Available", "Busy", "Tentative"];

const teachers = [
  {
    name: "Dr. Sarah Wilson",
    specialty: "React & Frontend Development",
    status: "Available",
    statusColor: "bg-status-success/10 text-status-success",
    workshops: 24,
    rating: 4.9,
  },
  {
    name: "Prof. Michael Chen",
    specialty: "UI/UX Design",
    status: "Busy",
    statusColor: "bg-status-error/10 text-status-error",
    workshops: 18,
    rating: 4.7,
  },
  {
    name: "Dr. James Anderson",
    specialty: "Data Science & Machine Learning",
    status: "Available",
    statusColor: "bg-status-success/10 text-status-success",
    workshops: 15,
    rating: 4.8,
  },
  {
    name: "Emily Rodriguez",
    specialty: "Mobile App Development",
    status: "Tentative",
    statusColor: "bg-status-warning/10 text-status-warning",
    workshops: 12,
    rating: 4.6,
  },
  {
    name: "Dr. Robert Johnson",
    specialty: "Cloud Computing & DevOps",
    status: "Available",
    statusColor: "bg-status-success/10 text-status-success",
    workshops: 10,
    rating: 4.5,
  },
  {
    name: "Lisa Thompson",
    specialty: "Artificial Intelligence",
    status: "Busy",
    statusColor: "bg-status-error/10 text-status-error",
    workshops: 14,
    rating: 4.8,
  },
];

const upcomingWorkshops = [
  { title: "Advanced JavaScript", date: "June 5-7, 2023", location: "Tech University" },
  { title: "UI/UX Masterclass", date: "June 15-16, 2023", location: "Design Academy" },
  { title: "Data Science Fundamentals", date: "June 20-24, 2023", location: "Analytics College" },
];

export default function TeacherManagement() {
  const [activeFilter, setActiveFilter] = useState("All Teachers");
  const [assignedWorkshops, setAssignedWorkshops] = useState({});
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      activeFilter === "All Teachers" || teacher.status === activeFilter
  );

  const handleAssignClick = (teacherName) => {
    setSelectedTeacher(teacherName);
  };

  const handleAssignToWorkshop = (workshop) => {
    setAssignedWorkshops({
      ...assignedWorkshops,
      [selectedTeacher]: workshop.title,
    });
    setSelectedTeacher(null);
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

      {/* Teacher Cards Grid */}
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
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User size={36} className="text-text-muted" />
                <div>
                  <h3 className="text-lg font-semibold text-text">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-text-muted">{teacher.specialty}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${teacher.statusColor}`}
              >
                {teacher.status}
              </span>
            </div>

            {/* Details */}
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

            {/* Assigned Workshop */}
            {assignedWorkshops[teacher.name] && (
              <p className="text-sm font-medium text-text-success">
                Assigned to: {assignedWorkshops[teacher.name]}
              </p>
            )}

            {/* Actions */}
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

      {/* No Teachers Found */}
      {filteredTeachers.length === 0 && (
        <p className="text-center text-text-muted mt-4">
          No teachers found for this category.
        </p>
      )}

      {/* Assign Workshop Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-background-card p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Assign Workshop</h2>
              <button onClick={() => setSelectedTeacher(null)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-text-muted mb-4">
              Select a workshop to assign {selectedTeacher}:
            </p>
            <ul>
              {upcomingWorkshops.map((workshop, index) => (
                <li
                  key={index}
                  className="p-3 bg-background-hover rounded-lg mb-2 cursor-pointer hover:bg-background transition"
                  onClick={() => handleAssignToWorkshop(workshop)}
                >
                  <p className="font-medium">{workshop.title}</p>
                  <p className="text-xs text-text-muted">
                    {workshop.date} - {workshop.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

