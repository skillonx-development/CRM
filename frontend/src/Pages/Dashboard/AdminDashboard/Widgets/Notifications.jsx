import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Calendar } from 'lucide-react';

const Notifications = () => {
    const notifications = [
        {
            id: 1,
            type: 'alert',
            title: 'Budget Approval Required',
            message: 'React Workshop Budget requires your approval',
            time: '2 hours ago',
            icon: <AlertTriangle size={18} className="text-red-500" />
        },
        {
            id: 2,
            type: 'info',
            title: 'New Workshop Scheduled',
            message: 'Angular Workshop scheduled for ABC University on 20 Aug',
            time: '1 day ago',
            icon: <Calendar size={18} className="text-blue-500" />
        },
        {
            id: 3,
            type: 'success',
            title: 'Payment Received',
            message: 'Payment of $5,000 received from DEF Institute',
            time: '2 days ago',
            icon: <Bell size={18} className="text-green-500" />
        }
    ];

    return (
        <motion.div
            className="bg-background-card rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-semibold">Notifications</h3>
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.length} new
                </span>
            </div>

            <div className="space-y-4">
                {notifications.map((notification, index) => (
                    <motion.div
                        key={notification.id}
                        className="flex items-start p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (index * 0.1) }}
                    >
                        <div className="mr-3 mt-1">
                            {notification.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h4 className="text-white font-medium">{notification.title}</h4>
                                <span className="text-gray-400 text-xs">{notification.time}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{notification.message}</p>
                        </div>
                        <motion.button
                            className="ml-2 text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Mark as read
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Notifications;