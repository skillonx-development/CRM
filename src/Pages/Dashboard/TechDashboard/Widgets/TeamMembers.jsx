import { useState } from "react";
import { FaPlus, FaEllipsisV, FaTimes } from "react-icons/fa";

export default function TeamMembers() {
  const [members, setMembers] = useState([
    { name: "Jenner", role: "Designer", img: "/alexey.png" },
    { name: "Jackson", role: "Full Stack Developer", img: "anton.png" },
    { name: "Jolene", role: "Support Agent", img: "eddie.png" },
    { name: "Nisha Muyami", role: "Designer", img: "/alexey.png" },
    { name: "Lawrence", role: "Support Agent", img: "anton.png" },
    { name: "Robert", role: "Marketing Department", img: "eddie.png" },
    { name: "Reea", role: "Designer", img: "/alexey.png" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", img: "" });
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.img) return;

    setMembers([...members, newMember]);
    setShowForm(false);
    setNewMember({ name: "", role: "", img: "" });
  };

  return (
    <div className="p-4">
      <h2 className="text-white text-lg mb-4">Team</h2>
      <div className="grid grid-cols-4 gap-4">
        {members.map((member, index) => (
          <div key={index} className="bg-background-card p-4 rounded-lg text-center shadow-md relative">
            <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-2" />
            <h3 className="text-white font-semibold">{member.name}</h3>
            <p className="text-gray-400 text-sm">{member.role}</p>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <FaEllipsisV />
            </button>
            <button 
              className="bg-blue-600 text-white w-full mt-3 py-1 rounded-md hover:bg-blue-700"
              onClick={() => setSelectedMember(member)}
            >
              View Profile
            </button>
          </div>
        ))}

        {/* Add Member Button */}
        <button
          className="bg-background-card p-4 rounded-lg text-center shadow-md flex flex-col justify-center items-center hover:bg-gray-800 transition"
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="text-white text-3xl" />
          <span className="text-gray-400 mt-2">Add Member</span>
        </button>
      </div>

      {/* Add Member Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background-card p-6 rounded-lg w-96 text-white">
            <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-2 rounded-md bg-gray-800 border border-gray-600 text-white"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full p-2 mb-2 rounded-md bg-gray-800 border border-gray-600 text-white"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full p-2 mb-2 rounded-md bg-gray-800 border border-gray-600 text-white"
              value={newMember.img}
              onChange={(e) => setNewMember({ ...newMember, img: e.target.value })}
            />
            <button
              className="bg-green-500 px-4 py-2 rounded-md w-full hover:bg-green-700 transition"
              onClick={handleAddMember}
            >
              Add Member
            </button>
            <button
              className="mt-2 w-full text-center text-red-400 hover:text-red-600"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background-card p-6 rounded-lg w-96 text-white text-center relative">
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedMember(null)}
            >
              <FaTimes />
            </button>
            <img src={selectedMember.img} alt={selectedMember.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-bold">{selectedMember.name}</h2>
            <p className="text-gray-400 text-sm mb-4">{selectedMember.role}</p>
            <button
              className="bg-red-500 px-4 py-2 rounded-md w-full hover:bg-red-700 transition"
              onClick={() => setSelectedMember(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
