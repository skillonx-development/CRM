import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Edit, Trash2, X, Check, ChevronDown } from 'lucide-react';

const ManageTeam = () => {
    const [activeTeam, setActiveTeam] = useState('sales');
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [isEditingMember, setIsEditingMember] = useState(null);
    const [newMember, setNewMember] = useState({
        name: '',
        email: '',
        role: '',
        team: 'sales'
    });

    // Sample team members data
    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Team Lead', team: 'sales' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Sales Executive', team: 'sales' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Frontend Developer', team: 'tech' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Backend Developer', team: 'tech' },
        { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Marketing Specialist', team: 'marketing' },
    ]);

    const teamColors = {
        sales: 'bg-purple-500',
        tech: 'bg-blue-500',
        marketing: 'bg-green-500'
    };

    const handleAddMember = () => {
        if (newMember.name && newMember.email && newMember.role) {
            setTeamMembers([
                ...teamMembers,
                {
                    id: teamMembers.length + 1,
                    ...newMember,
                    team: activeTeam
                }
            ]);
            setNewMember({ name: '', email: '', role: '', team: activeTeam });
            setIsAddingMember(false);
        }
    };

    const handleUpdateMember = () => {
        if (isEditingMember && newMember.name && newMember.email && newMember.role) {
            setTeamMembers(teamMembers.map(member =>
                member.id === isEditingMember.id
                    ? { ...member, name: newMember.name, email: newMember.email, role: newMember.role }
                    : member
            ));
            setNewMember({ name: '', email: '', role: '', team: activeTeam });
            setIsEditingMember(null);
        }
    };

    const handleDeleteMember = (id) => {
        setTeamMembers(teamMembers.filter(member => member.id !== id));
    };

    const startEditMember = (member) => {
        setIsEditingMember(member);
        setNewMember({
            name: member.name,
            email: member.email,
            role: member.role,
            team: member.team
        });
    };

    const filteredMembers = teamMembers.filter(member => member.team === activeTeam);

    return (
        <motion.div
            className="bg-background-card rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Users size={20} className="text-purple-500 mr-2" />
                    <h3 className="text-white text-xl font-semibold">Manage Team</h3>
                </div>
                <motion.button
                    className="flex items-center bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setIsAddingMember(true);
                        setIsEditingMember(null);
                    }}
                >
                    <UserPlus size={16} className="mr-1" />
                    Add Member
                </motion.button>
            </div>

            {/* Team Selection Tabs */}
            <div className="flex space-x-2 mb-6">
                {['sales', 'tech', 'marketing'].map((team) => (
                    <motion.button
                        key={team}
                        className={`px-4 py-2 rounded-md text-white capitalize ${activeTeam === team ? teamColors[team] : 'bg-gray-700'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTeam(team)}
                    >
                        {team}
                    </motion.button>
                ))}
            </div>

            {/* Add/Edit Member Form */}
            {(isAddingMember || isEditingMember) && (
                <motion.div
                    className="mb-6 bg-gray-800 p-4 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-white font-medium">
                            {isEditingMember ? 'Edit Team Member' : 'Add New Team Member'}
                        </h4>
                        <motion.button
                            className="text-gray-400 hover:text-white"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setIsAddingMember(false);
                                setIsEditingMember(null);
                                setNewMember({ name: '', email: '', role: '', team: activeTeam });
                            }}
                        >
                            <X size={18} />
                        </motion.button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                                value={newMember.name}
                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                                value={newMember.email}
                                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                placeholder="Enter email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Role</label>
                            <input
                                type="text"
                                className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                                value={newMember.role}
                                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                placeholder="Enter role"
                            />
                        </div>
                        <div className="flex items-end">
                            <motion.button
                                className={`flex items-center ${isEditingMember ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'
                                    } text-white px-4 py-2 rounded-md`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={isEditingMember ? handleUpdateMember : handleAddMember}
                            >
                                <Check size={16} className="mr-1" />
                                {isEditingMember ? 'Update' : 'Add'}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Team Members List */}
            <div className="space-y-4">
                {filteredMembers.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No members in this team yet.</p>
                ) : (
                    filteredMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + (index * 0.1) }}
                        >
                            <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${teamColors[member.team]} mr-3`}>
                                    {member.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">{member.name}</h4>
                                    <div className="flex items-center text-gray-400 text-xs">
                                        <span>{member.email}</span>
                                        <span className="mx-2">•</span>
                                        <span className="font-medium">{member.role}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <motion.button
                                    className="p-1 text-gray-400 hover:text-blue-500"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => startEditMember(member)}
                                >
                                    <Edit size={16} />
                                </motion.button>
                                <motion.button
                                    className="p-1 text-gray-400 hover:text-red-500"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDeleteMember(member.id)}
                                >
                                    <Trash2 size={16} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Team Stats */}
            <motion.div
                className="mt-6 bg-gray-800/50 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-white font-medium capitalize">{activeTeam} Team</h4>
                        <p className="text-gray-400 text-sm">{filteredMembers.length} members</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs text-white ${teamColors[activeTeam]}`}>
                        Active
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ManageTeam;