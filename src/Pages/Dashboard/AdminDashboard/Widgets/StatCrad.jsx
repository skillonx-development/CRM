import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, percentChange, isPositive }) => {
    return (
        <motion.div
            className="bg-[#0f1123] rounded-lg p-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-gray-400 font-medium">{title}</h3>
                <motion.div
                    className="bg-[#1a1c31] p-3 rounded-lg"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {icon}
                </motion.div>
            </div>
            <div className="flex items-end gap-3">
                <motion.h2
                    className="text-white text-3xl font-bold"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                    {value}
                </motion.h2>
                <motion.span
                    className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {isPositive ? '↑' : '↓'} {Math.abs(percentChange)}%
                </motion.span>
            </div>
        </motion.div>
    );
};

export default StatCard;