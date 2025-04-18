import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Web Development', value: 35, color: '#8b5cf6' },
    { name: 'Data Science', value: 25, color: '#10b981' },
    { name: 'UI/UX Design', value: 20, color: '#eab308' },
    { name: 'Mobile Development', value: 15, color: '#3b82f6' },
    { name: 'DevOps', value: 5, color: '#6366f1' },
];

const WorkshopDistribution = () => {
    return (
        <motion.div
            className="bg-background-card rounded-lg p-6"
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
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const currentItem = payload[0];
                                    const dataItem = data.find(item => item.name === currentItem.name);

                                    return (
                                        <div
                                            style={{
                                                backgroundColor: dataItem?.color || '#8b5cf6',
                                                padding: '8px 12px',
                                                borderRadius: '4px',
                                                border: 'none',
                                                color: '#111',
                                                fontWeight: 500
                                            }}
                                        >
                                            <p className="font-medium">{currentItem.name}</p>
                                            <p>{`${currentItem.value}%`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </motion.div>
        </motion.div>
    );
};

export default WorkshopDistribution;