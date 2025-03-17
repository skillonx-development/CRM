import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, ExternalLink, Send } from 'lucide-react';

const RecentInvoices = () => {
    const invoices = [
        {
            id: 1,
            client: 'ABC University',
            invoiceNumber: 'INV-2023-001',
            amount: 18500,
            dueDate: '15 Aug 2023',
            status: 'Pending'
        },
        {
            id: 2,
            client: 'XYZ College',
            invoiceNumber: 'INV-2023-002',
            amount: 12750,
            dueDate: '10 Aug 2023',
            status: 'Overdue'
        }
    ];

    return (
        <motion.div
            className="bg-background-card rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
        >
            <h3 className="text-white text-xl font-semibold mb-4">Recent Invoices</h3>

            <div className="space-y-6">
                {invoices.map((invoice) => (
                    <motion.div
                        key={invoice.id}
                        className="border-b border-gray-700 pb-6 last:border-b-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (invoice.id * 0.1) }}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="text-white font-medium">{invoice.client}</h4>
                                <p className="text-gray-400 text-sm">Invoice #{invoice.invoiceNumber}</p>
                            </div>
                            {invoice.status === 'Pending' ? (
                                <div className="bg-amber-900/30 text-amber-500 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    {invoice.status}
                                </div>
                            ) : (
                                <div className="bg-red-900/30 text-red-500 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                    <AlertCircle size={12} className="mr-1" />
                                    {invoice.status}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <div className="text-3xl font-bold text-white">${invoice.amount.toLocaleString()}</div>
                            <div className="flex items-center text-gray-400 text-sm mt-1">
                                <Clock size={14} className="mr-1" />
                                Due: {invoice.dueDate}
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <motion.button
                                className="flex-1 bg-gray-700/50 hover:bg-gray-700/70 text-white py-2 rounded-md flex items-center justify-center"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <ExternalLink size={16} className="mr-1" />
                                View Details
                            </motion.button>
                            <motion.button
                                className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 rounded-md flex items-center justify-center"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Send size={16} className="mr-1" />
                                Send Reminder
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default RecentInvoices;