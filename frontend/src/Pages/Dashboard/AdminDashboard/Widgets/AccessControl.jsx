import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, UserCheck, UserX, Edit, Save, ChevronDown, ChevronUp, Search, Lock, Key, UserPlus } from 'lucide-react';

const AccessControl = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedUser, setExpandedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // Sample user data with roles and permissions
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            department: 'Management',
            status: 'active',
            lastLogin: '2023-08-15 09:30 AM',
            permissions: {
                dashboard: true,
                users: true,
                billing: true,
                reports: true,
                settings: true
            }
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'Sales Manager',
            department: 'Sales',
            status: 'active',
            lastLogin: '2023-08-14 02:15 PM',
            permissions: {
                dashboard: true,
                users: true,
                billing: true,
                reports: true,
                settings: false
            }
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'Tech Lead',
            department: 'Tech',
            status: 'active',
            lastLogin: '2023-08-13 11:45 AM',
            permissions: {
                dashboard: true,
                users: false,
                billing: false,
                reports: true,
                settings: false
            }
        },
        {
            id: 4,
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            role: 'Marketing Specialist',
            department: 'Marketing',
            status: 'inactive',
            lastLogin: '2023-08-10 10:20 AM',
            permissions: {
                dashboard: true,
                users: false,
                billing: false,
                reports: true,
                settings: false
            }
        }
    ]);

    // Predefined roles with their permissions
    const roles = [
        {
            name: 'Admin',
            permissions: {
                dashboard: true,
                users: true,
                billing: true,
                reports: true,
                settings: true
            }
        },
        {
            name: 'Sales Manager',
            permissions: {
                dashboard: true,
                users: true,
                billing: true,
                reports: true,
                settings: false
            }
        },
        {
            name: 'Tech Lead',
            permissions: {
                dashboard: true,
                users: false,
                billing: false,
                reports: true,
                settings: false
            }
        },
        {
            name: 'Marketing Specialist',
            permissions: {
                dashboard: true,
                users: false,
                billing: false,
                reports: true,
                settings: false
            }
        },
        {
            name: 'Viewer',
            permissions: {
                dashboard: true,
                users: false,
                billing: false,
                reports: false,
                settings: false
            }
        }
    ];

    const toggleUserExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
        setEditingUser(null);
    };

    const startEditing = (user) => {
        setEditingUser({ ...user });
    };

    const saveUserChanges = () => {
        if (editingUser) {
            setUsers(users.map(user =>
                user.id === editingUser.id ? editingUser : user
            ));
            setEditingUser(null);
        }
    };

    const togglePermission = (permission) => {
        if (editingUser) {
            setEditingUser({
                ...editingUser,
                permissions: {
                    ...editingUser.permissions,
                    [permission]: !editingUser.permissions[permission]
                }
            });
        }
    };

    const applyRole = (user, roleName) => {
        const role = roles.find(r => r.name === roleName);
        if (role) {
            setUsers(users.map(u =>
                u.id === user.id
                    ? { ...u, role: roleName, permissions: { ...role.permissions } }
                    : u
            ));
        }
        setShowRoleModal(false);
        setSelectedRole(null);
    };

    const toggleUserStatus = (userId) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
                : user
        ));
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDepartmentColor = (department) => {
        switch (department.toLowerCase()) {
            case 'sales': return 'bg-purple-500';
            case 'tech': return 'bg-blue-500';
            case 'marketing': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

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
                    <Shield size={20} className="text-purple-500 mr-2" />
                    <h3 className="text-white text-xl font-semibold">Access Control</h3>
                </div>
                <div className="flex items-center">
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                        {users.filter(u => u.status === 'active').length} Active
                    </span>
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                        {users.filter(u => u.status === 'inactive').length} Inactive
                    </span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search users by name, email, role or department..."
                    className="w-full bg-gray-700 text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Users List */}
            <div className="space-y-4">
                {filteredUsers.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No users found matching your search.</p>
                ) : (
                    filteredUsers.map((user, index) => (
                        <motion.div
                            key={user.id}
                            className="bg-gray-800/50 rounded-lg overflow-hidden"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + (index * 0.1) }}
                        >
                            {/* User Header */}
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => toggleUserExpand(user.id)}
                            >
                                <div className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getDepartmentColor(user.department)} mr-3`}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium flex items-center">
                                            {user.name}
                                            {user.status === 'inactive' && (
                                                <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Inactive</span>
                                            )}
                                        </h4>
                                        <div className="flex items-center text-gray-400 text-xs">
                                            <span>{user.email}</span>
                                            <span className="mx-2">•</span>
                                            <span className="font-medium">{user.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className={`px-2 py-1 rounded-md text-xs mr-2 ${getDepartmentColor(user.department)} bg-opacity-20 text-white`}>
                                        {user.department}
                                    </span>
                                    {expandedUser === user.id ? (
                                        <ChevronUp size={18} className="text-gray-400" />
                                    ) : (
                                        <ChevronDown size={18} className="text-gray-400" />
                                    )}
                                </div>
                            </div>

                            {/* Expanded User Details */}
                            {expandedUser === user.id && (
                                <motion.div
                                    className="p-4 border-t border-gray-700"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div className="flex justify-between mb-4">
                                        <div>
                                            <p className="text-gray-400 text-sm">
                                                <span className="font-medium text-white">Last Login:</span> {user.lastLogin}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <motion.button
                                                className={`px-3 py-1 rounded-md text-xs flex items-center ${user.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                                    } text-white`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleUserStatus(user.id)}
                                            >
                                                {user.status === 'active' ? (
                                                    <>
                                                        <UserX size={14} className="mr-1" />
                                                        Deactivate
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserCheck size={14} className="mr-1" />
                                                        Activate
                                                    </>
                                                )}
                                            </motion.button>
                                            {!editingUser || editingUser.id !== user.id ? (
                                                <motion.button
                                                    className="px-3 py-1 rounded-md text-xs flex items-center bg-blue-500 hover:bg-blue-600 text-white"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => startEditing(user)}
                                                >
                                                    <Edit size={14} className="mr-1" />
                                                    Edit
                                                </motion.button>
                                            ) : (
                                                <motion.button
                                                    className="px-3 py-1 rounded-md text-xs flex items-center bg-green-500 hover:bg-green-600 text-white"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={saveUserChanges}
                                                >
                                                    <Save size={14} className="mr-1" />
                                                    Save
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Permissions Section */}
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="text-white font-medium flex items-center">
                                                <Lock size={16} className="mr-1 text-purple-500" />
                                                Permissions
                                            </h5>
                                            {editingUser && editingUser.id === user.id && (
                                                <motion.button
                                                    className="px-3 py-1 rounded-md text-xs flex items-center bg-purple-500 hover:bg-purple-600 text-white"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        setShowRoleModal(true);
                                                        setSelectedRole(null);
                                                    }}
                                                >
                                                    <Key size={14} className="mr-1" />
                                                    Apply Role Template
                                                </motion.button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            {Object.entries(user.permissions).map(([key, value]) => (
                                                <div
                                                    key={key}
                                                    className={`p-2 rounded-md border ${editingUser && editingUser.id === user.id
                                                        ? 'cursor-pointer hover:bg-gray-700'
                                                        : ''
                                                        } ${(editingUser && editingUser.id === user.id ? editingUser.permissions[key] : value)
                                                            ? 'border-purple-500 bg-purple-500/20'
                                                            : 'border-gray-600 bg-gray-700/30'
                                                        }`}
                                                    onClick={() => {
                                                        if (editingUser && editingUser.id === user.id) {
                                                            togglePermission(key);
                                                        }
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm capitalize text-white">
                                                            {key}
                                                        </span>
                                                        <div className={`w-3 h-3 rounded-full ${(editingUser && editingUser.id === user.id ? editingUser.permissions[key] : value)
                                                            ? 'bg-green-500'
                                                            : 'bg-red-500'
                                                            }`}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* User Details Edit Form */}
                                    {editingUser && editingUser.id === user.id && (
                                        <motion.div
                                            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                                                    value={editingUser.name}
                                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                                                    value={editingUser.email}
                                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Role</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                                                    value={editingUser.role}
                                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Department</label>
                                                <select
                                                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                                                    value={editingUser.department}
                                                    onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                                                >
                                                    <option value="Sales">Sales</option>
                                                    <option value="Tech">Tech</option>
                                                    <option value="Marketing">Marketing</option>
                                                    <option value="Management">Management</option>
                                                </select>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {/* Role Template Modal */}
            {showRoleModal && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowRoleModal(false)}
                >
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white text-lg font-semibold">Select Role Template</h3>
                            <button
                                className="text-gray-400 hover:text-white"
                                onClick={() => setShowRoleModal(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {roles.map((role) => (
                                <motion.div
                                    key={role.name}
                                    className={`p-3 rounded-md cursor-pointer ${selectedRole === role.name
                                        ? 'bg-purple-500 bg-opacity-20 border border-purple-500'
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedRole(role.name)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">{role.name}</span>
                                        {selectedRole === role.name && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {Object.entries(role.permissions).map(([key, value]) => (
                                            value && (
                                                <span
                                                    key={key}
                                                    className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded"
                                                >
                                                    {key}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <motion.button
                                className="px-4 py-2 rounded-md text-sm bg-gray-600 hover:bg-gray-500 text-white"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowRoleModal(false)}
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                className={`px-4 py-2 rounded-md text-sm bg-purple-500 hover:bg-purple-600 text-white ${!selectedRole ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                whileHover={selectedRole ? { scale: 1.05 } : {}}
                                whileTap={selectedRole ? { scale: 0.95 } : {}}
                                onClick={() => selectedRole && applyRole(editingUser, selectedRole)}
                                disabled={!selectedRole}
                            >
                                Apply Role
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Access Control Summary */}
            <motion.div
                className="mt-6 bg-gray-800/50 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h4 className="text-white font-medium">Access Summary</h4>
                        <p className="text-gray-400 text-sm">
                            {users.length} total users across {Array.from(new Set(users.map(u => u.department))).length} departments
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        {Array.from(new Set(users.map(u => u.department))).map(dept => (
                            <div
                                key={dept}
                                className={`px-3 py-1 rounded-full text-xs text-white flex items-center ${getDepartmentColor(dept)}`}
                            >
                                <Users size={12} className="mr-1" />
                                <span>{dept}: {users.filter(u => u.department === dept).length}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.button
                    className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg flex flex-col items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <UserPlus size={20} className="mb-1" />
                    <span className="text-sm">Add User</span>
                </motion.button>
                <motion.button
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex flex-col items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Key size={20} className="mb-1" />
                    <span className="text-sm">Manage Roles</span>
                </motion.button>
                <motion.button
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg flex flex-col items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Shield size={20} className="mb-1" />
                    <span className="text-sm">Security Audit</span>
                </motion.button>
                <motion.button
                    className="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-lg flex flex-col items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Lock size={20} className="mb-1" />
                    <span className="text-sm">Access Logs</span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default AccessControl;