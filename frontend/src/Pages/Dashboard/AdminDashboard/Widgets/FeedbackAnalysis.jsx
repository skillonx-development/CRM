import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const data = [
    { name: 'Excellent', value: 65, color: '#10b981' },
    { name: 'Good', value: 20, color: '#8b5cf6' },
    { name: 'Average', value: 10, color: '#eab308' },
    { name: 'Poor', value: 5, color: '#ef4444' },
];

const FeedbackAnalysis = () => {
    return (
        <motion.div
            className="bg-background-card rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
        >
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-white text-xl font-semibold flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                        Feedback Analysis
                    </h3>
                    <p className="text-gray-400">Workshop satisfaction ratings</p>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
                    <span className="text-gray-400 text-sm">value</span>
                </div>
            </div>

            <motion.div
                className="h-64 flex justify-center items-center"
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
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
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + (index * 0.1) }}
                    >
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <div className="flex justify-between w-full">
                            <span className="text-gray-400 text-sm">{item.name}</span>
                            <span className="text-white text-sm font-medium">{item.value}%</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FeedbackAnalysis;