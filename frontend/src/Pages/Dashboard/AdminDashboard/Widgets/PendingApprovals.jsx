import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock, FileText } from 'lucide-react';

const PendingApprovals = () => {
    const [selectedApproval, setSelectedApproval] = useState(null);

    const approvals = [
        {
            id: 1,
            title: 'React Workshop Budget',
            type: 'Budget Request',
            department: 'Tech Team',
            amount: 15000,
            deadline: '15 Aug 2023',
            submitted: '01 Aug 2023',
            status: 'Pending',
            notes: 'Budget request for upcoming React workshop series including instructor fees, materials, and venue costs.'
        },
        {
            id: 2,
            title: 'Instructor Payment',
            type: 'Payment Request',
            department: 'HR Department',
            amount: 3500,
            deadline: '20 Aug 2023',
            submitted: '05 Aug 2023',
            status: 'Pending',
            notes: 'Payment for guest instructor who conducted the advanced JavaScript workshop last month.'
        }
    ];

    // Card animation variants - removed scaling effects
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        hover: {
            boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
            transition: { duration: 0.2, ease: "easeInOut" }
        }
        // Removed tap: { scale: 0.99 } to prevent scaling
    };

    // Modal animation variants
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    // Button animation variants - keeping scale for buttons only
    const buttonVariants = {
        hover: { scale: 1.01, transition: { duration: 0.2 } },
        tap: { scale: 0.97 }
    };

    return (
        <>
            <motion.div
                className="bg-background-card rounded-lg p-6 shadow-lg"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
            // Removed whileHover and whileTap to prevent scaling
            >
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center">
                    <FileText className="mr-2 text-purple-400" size={20} />
                    Pending Approvals
                </h3>

                <div className="space-y-5">
                    {approvals.map((approval, index) => (
                        <motion.div
                            key={approval.id}
                            className="border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (index * 0.1) }}
                            whileHover="hover"
                            // Removed whileTap="tap" to prevent scaling
                            variants={cardVariants}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="text-white font-medium text-lg">{approval.title}</h4>
                                    <p className="text-gray-400 text-sm">{approval.type} • {approval.department}</p>
                                </div>
                                <div className="bg-amber-900/30 text-amber-500 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    {approval.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div>
                                    <p className="text-gray-400 text-xs">Amount</p>
                                    <p className="text-white font-medium">${approval.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Deadline</p>
                                    <p className="text-white font-medium">{approval.deadline}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Submitted on</p>
                                    <p className="text-white font-medium">{approval.submitted}</p>
                                </div>
                            </div>

                            <div className="relative">
                                <motion.button
                                    className="w-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 py-2 rounded-md flex items-center justify-center transition-colors"
                                    onClick={() => setSelectedApproval(approval)}
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    View Details
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedApproval && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedApproval(null)}
                    >
                        <motion.div
                            className="bg-background-card rounded-lg p-8 w-full max-w-md relative shadow-xl mx-4 lg:mx-auto"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white text-xl font-bold">{selectedApproval.title}</h3>
                                <motion.button
                                    className="text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-1"
                                    onClick={() => setSelectedApproval(null)}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 text-sm">Type</p>
                                        <p className="text-white font-medium">{selectedApproval.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Department</p>
                                        <p className="text-white font-medium">{selectedApproval.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Amount</p>
                                        <p className="text-white font-medium text-lg">${selectedApproval.amount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Status</p>
                                        <div className="bg-amber-900/30 text-amber-500 text-xs font-medium px-2 py-1 rounded-full inline-flex items-center mt-1">
                                            <Clock size={12} className="mr-1" />
                                            {selectedApproval.status}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Deadline</p>
                                        <p className="text-white font-medium">{selectedApproval.deadline}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Submitted on</p>
                                        <p className="text-white font-medium">{selectedApproval.submitted}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                    <p className="text-gray-400 text-sm mb-2">Additional Notes</p>
                                    <p className="text-white text-sm">
                                        {selectedApproval.notes}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-8">
                                <motion.button
                                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 px-5 rounded-md flex items-center font-medium transition-colors"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <X size={16} className="mr-2" />
                                    Reject
                                </motion.button>
                                <motion.button
                                    className="bg-green-500/10 hover:bg-green-500/20 text-green-500 py-2 px-5 rounded-md flex items-center font-medium transition-colors"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Check size={16} className="mr-2" />
                                    Approve
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PendingApprovals;