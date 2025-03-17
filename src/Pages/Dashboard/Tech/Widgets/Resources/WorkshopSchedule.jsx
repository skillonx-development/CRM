import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaChalkboardTeacher,
  FaEdit,
  FaTimes,
  FaCheck,
  FaMapMarkerAlt,
  FaDesktop,
} from "react-icons/fa";

// Sample Workshops Data
const workshopsData = [
  {
    id: 1,
    topic: "React Fundamentals",
    instructor: "Sarah Kim",
    date: "2025-03-25",
    time: "10:00 AM",
    duration: "2 Hours",
    mode: "Online",
    location: "Zoom Meeting",
    resources: ["React Basics.pdf", "React Video.mp4"],
    status: "Scheduled",
    timeline: [
      { time: "10:00 AM", event: "Introduction to React" },
      { time: "10:30 AM", event: "Components & Props" },
      { time: "11:00 AM", event: "Q&A Session" },
    ],
  },
  {
    id: 2,
    topic: "Advanced Python",
    instructor: "David Chen",
    date: "2025-03-20",
    time: "2:00 PM",
    duration: "3 Hours",
    mode: "Offline",
    location: "Room 204, TechHub",
    resources: ["Python Advanced.pdf", "Lecture Video.mp4"],
    status: "Ongoing",
    timeline: [
      { time: "2:00 PM", event: "Python Best Practices" },
      { time: "3:00 PM", event: "AI & ML with Python" },
      { time: "4:00 PM", event: "Workshop Wrap-up" },
    ],
  },
  {
    id: 3,
    topic: "Cybersecurity Basics",
    instructor: "Emily Wong",
    date: "2025-03-10",
    time: "3:30 PM",
    duration: "2.5 Hours",
    mode: "Online",
    location: "Google Meet",
    resources: ["Cybersecurity Guide.pdf", "Network Security.mp4"],
    status: "Completed",
    timeline: [
      { time: "3:30 PM", event: "Introduction to Cybersecurity" },
      { time: "4:30 PM", event: "Hacking Prevention Techniques" },
      { time: "5:30 PM", event: "Final Q&A Session" },
    ],
  },
];

const WorkshopSchedule = () => {
  const [filter, setFilter] = useState("All");
  const [workshops, setWorkshops] = useState(workshopsData);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // Filter workshops
  const filteredWorkshops = workshops.filter(
    (workshop) => filter === "All" || workshop.status === filter
  );

  // Update workshop status
  const updateWorkshopStatus = (id, newStatus) => {
    setWorkshops(
      workshops.map((workshop) =>
        workshop.id === id ? { ...workshop, status: newStatus } : workshop
      )
    );
  };

  return (
    <div className="bg-background-card p-6 shadow-card rounded-lg text-text-default">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Workshops</h2>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {["All", "Scheduled", "Ongoing", "Completed"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-md transition ${
              filter === status ? "bg-primary text-white" : "bg-background-hover text-text-muted"
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Workshops List */}
      <div className="space-y-4">
        {filteredWorkshops.length === 0 ? (
          <p className="text-text-muted">No workshops available.</p>
        ) : (
          filteredWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className="p-4 bg-background-hover rounded-md flex justify-between items-center cursor-pointer hover:bg-background-sidebar transition"
              onClick={() => setSelectedWorkshop(workshop)}
            >
              <div>
                <h3 className="text-lg font-semibold">{workshop.topic}</h3>
                <p className="text-text-muted flex items-center gap-2">
                  <FaChalkboardTeacher /> {workshop.instructor}
                </p>
                <p className="text-text-muted flex items-center gap-2">
                  <FaCalendarCheck /> {workshop.date} • {workshop.time}
                </p>
                <p className="text-text-muted flex items-center gap-2">
                  <FaClock /> Duration: {workshop.duration}
                </p>
                <p className="text-text-muted flex items-center gap-2">
                  {workshop.mode === "Online" ? <FaDesktop /> : <FaMapMarkerAlt />}
                  {workshop.location}
                </p>
                
                {/* Updated Status Display */}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      workshop.status === "Scheduled"
                        ? "bg-yellow-400"
                        : workshop.status === "Ongoing"
                        ? "bg-blue-400"
                        : "bg-green-400"
                    }`}
                  ></span>
                  <span className="text-text-muted">{workshop.status}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {workshop.status === "Scheduled" && (
                  <>
                    <button className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark">
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="flex items-center gap-1 bg-status-error text-white px-3 py-1 rounded-md hover:bg-red-700"
                      onClick={() => updateWorkshopStatus(workshop.id, "Cancelled")}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                )}
                {workshop.status === "Ongoing" && (
                  <button
                    className="flex items-center gap-1 bg-status-success text-white px-3 py-1 rounded-md hover:bg-green-700"
                    onClick={() => updateWorkshopStatus(workshop.id, "Completed")}
                  >
                    <FaCheck /> Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Workshop Timeline Modal */}
      {selectedWorkshop && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-background-card p-6 rounded-lg shadow-card w-96">
            <h3 className="text-xl font-semibold text-primary">{selectedWorkshop.topic} Timeline</h3>
            <ul className="mt-4 space-y-2">
              {selectedWorkshop.timeline.map((event, index) => (
                <li key={index} className="p-2 bg-background-hover rounded-md">
                  <strong>{event.time}:</strong> {event.event}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full bg-status-error text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={() => setSelectedWorkshop(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopSchedule;
