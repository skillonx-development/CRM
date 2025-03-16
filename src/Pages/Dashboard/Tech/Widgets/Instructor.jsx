import { useState } from "react";

const Instructor1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [instructors, setInstructors] = useState([
    { id: "ins-1", name: "Dr. Sarah Johnson", specialty: "React Development", availability: "Full-time", experience: "8 years", rating: 4.8, workshops: 24 },
    { id: "ins-2", name: "Prof. Michael Chen", specialty: "Data Science", availability: "Part-time", experience: "6 years", rating: 4.6, workshops: 18 },
    { id: "ins-3", name: "Jane Smith, MSc", specialty: "Cybersecurity", availability: "Weekends", experience: "5 years", rating: 4.7, workshops: 15 },
    { id: "ins-4", name: "Robert Wilson", specialty: "UX/UI Design", availability: "Full-time", experience: "7 years", rating: 4.5, workshops: 21 },
  ]);

  const [newInstructor, setNewInstructor] = useState({
    name: "",
    specialty: "",
    availability: "",
    experience: "",
  });

  const handleAddInstructor = () => {
    if (!newInstructor.name || !newInstructor.specialty || !newInstructor.availability || !newInstructor.experience) return;
    
    setInstructors([...instructors, {
      id: `ins-${instructors.length + 1}`,
      name: newInstructor.name,
      specialty: newInstructor.specialty,
      availability: newInstructor.availability,
      experience: newInstructor.experience,
      rating: 0, workshops: 0
    }]);
    
    setNewInstructor({ name: "", specialty: "", availability: "", experience: "" });
    setShowModal(false);
  };

  return (
    <div className="bg-background-default min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Instructor Roster</h2>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-primary px-4 py-2 rounded-md text-white shadow-card"
        >
          + Add Instructor
        </button>
      </div>

      {/* Instructor Table */}
      <div className="bg-background-card p-4 rounded-lg shadow-card">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-dark text-text-muted">
              <th className="py-2">Instructor</th>
              <th>Specialty</th>
              <th>Availability</th>
              <th>Experience</th>
              <th>Performance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((inst) => (
              <tr key={inst.id} className="border-b border-border-dark hover:bg-background-hover">
                <td className="py-3">{inst.name}</td>
                <td>{inst.specialty}</td>
                <td><span className={`px-2 py-1 rounded text-black ${inst.availability === "Full-time" ? "bg-status-success" : inst.availability === "Part-time" ? "bg-status-info" : "bg-status-warning"}`}>
                  {inst.availability}
                </span></td>
                <td>{inst.experience}</td>
                <td className="text-yellow-400">{inst.rating} ⭐ ({inst.workshops} workshops)</td>
                <td>
                  <button className="bg-primary-light px-3 py-1 rounded mr-2">Schedule</button>
                  <button className="bg-background-hover px-3 py-1 rounded">Assign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Instructor */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-background-card p-6 rounded-lg shadow-card w-1/3">
            <h3 className="text-lg font-semibold mb-4">Add New Instructor</h3>
            <input 
              type="text" 
              placeholder="Enter instructor name" 
              className="w-full p-2 mb-3 border border-border-dark bg-background-hover text-white rounded"
              value={newInstructor.name}
              onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Primary teaching specialty" 
              className="w-full p-2 mb-3 border border-border-dark bg-background-hover text-white rounded"
              value={newInstructor.specialty}
              onChange={(e) => setNewInstructor({ ...newInstructor, specialty: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="e.g. Full-time, Weekends only" 
              className="w-full p-2 mb-3 border border-border-dark bg-background-hover text-white rounded"
              value={newInstructor.availability}
              onChange={(e) => setNewInstructor({ ...newInstructor, availability: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="e.g. 5 years" 
              className="w-full p-2 mb-4 border border-border-dark bg-background-hover text-white rounded"
              value={newInstructor.experience}
              onChange={(e) => setNewInstructor({ ...newInstructor, experience: e.target.value })}
            />
            <div className="flex justify-between">
              <button 
                onClick={() => setShowModal(false)}
                className="bg-status-error px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddInstructor} 
                className="bg-status-success px-4 py-2 rounded"
              >
                Add Instructor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructor1;
