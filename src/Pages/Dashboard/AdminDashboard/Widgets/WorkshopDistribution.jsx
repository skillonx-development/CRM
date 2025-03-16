import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Web Development', value: 35, color: '#8884d8' },
    { name: 'Data Science', value: 25, color: '#82ca9d' },
    { name: 'UI/UX Design', value: 20, color: '#ffc658' },
    { name: 'Mobile Development', value: 15, color: '#ff8042' },
    { name: 'DevOps', value: 5, color: '#0088FE' },
];

const WorkshopDistribution = () => {
    return (
        <motion.div
            className="bg-[#0f1123] rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
        >
            <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-white text-xl font-semibold">Popular Workshops</h3>
                        <p className="text-gray-400">Distribution by subject</p>
                    </div>
                    <motion.div
                        className="flex items-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                    >
                        <div className="w-3 h-3 rounded-full bg-[#8884d8] mr-2"></div>
                        <span className="text-gray-400 text-sm">value</span>
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                className="h-72 flex justify-center"
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1a1c31', border: 'none' }}
                            formatter={(value) => [`${value}%`, 'Percentage']}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </motion.div>
        </motion.div>
    );
};

export default WorkshopDistribution;