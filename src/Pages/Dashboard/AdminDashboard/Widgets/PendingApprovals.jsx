import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Clock } from 'lucide-react';

const PendingApprovals = () => {
    const approvals = [
        {
            id: 1,
            title: 'React Workshop Budget',
            type: 'Budget Request',
            department: 'Tech Team',
            amount: 15000,
            deadline: '15 Aug 2023',
            submitted: '01 Aug 2023',
            status: 'Pending'
        },
        {
            id: 2,
            title: 'Instructor Payment',
            type: 'Payment Request',
            department: 'HR Department',
            amount: 3500,
            deadline: '20 Aug 2023',
            submitted: '05 Aug 2023',
            status: 'Pending'
        }
    ];

    return (
        <motion.div
            className="bg-background-card rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
        >
            <h3 className="text-white text-xl font-semibold mb-4">Pending Approvals</h3>

            <div className="space-y-4">
                {approvals.map((approval, index) => (
                    <motion.div
                        key={approval.id}
                        className="border-b border-gray-700 pb-4 last:border-b-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-white font-medium">{approval.title}</h4>
                                <p className="text-gray-400 text-sm">{approval.type} • {approval.department}</p>
                            </div>
                            <div className="bg-amber-900/30 text-amber-500 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                <Clock size={12} className="mr-1" />
                                {approval.status}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
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

                        <div className="flex space-x-3">
                            <motion.button
                                className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 rounded-md flex items-center justify-center"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <X size={16} className="mr-1" />
                                Reject
                            </motion.button>
                            <motion.button
                                className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 py-2 rounded-md flex items-center justify-center"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Check size={16} className="mr-1" />
                                Approve
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default PendingApprovals;