import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const data = [
    { name: 'Jan', workshops: 5, proposals: 12 },
    { name: 'Feb', workshops: 8, proposals: 15 },
    { name: 'Mar', workshops: 7, proposals: 10 },
    { name: 'Apr', workshops: 6, proposals: 8 },
    { name: 'May', workshops: 9, proposals: 16 },
    { name: 'Jun', workshops: 10, proposals: 12 },
    { name: 'Jul', workshops: 12, proposals: 18 },
];

const MonthlyPerformance = () => {
    const [activeMonth, setActiveMonth] = useState(null);

    const handleMouseOver = (data) => {
        setActiveMonth(data);
    };

    const handleMouseLeave = () => {
        setActiveMonth(null);
    };

    return (
        <motion.div
            className="bg-background-card rounded-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
        >
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-white text-xl font-semibold">Monthly Performance</h3>
                    <p className="text-gray-400">Workshops, proposals, and revenue</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#8b5cf6] mr-2"></div>
                        <span className="text-gray-400 text-sm">workshops</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-2"></div>
                        <span className="text-gray-400 text-sm">proposals</span>
                    </div>
                </div>
            </div>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        onMouseMove={(e) => {
                            if (e.activePayload) {
                                handleMouseOver(e.activePayload[0].payload);
                            }
                        }}
                        onMouseLeave={handleMouseLeave}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            domain={[0, 'dataMax + 5']}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-gray-800 p-3 rounded-md border border-gray-700 shadow-lg">
                                            <p className="text-white font-medium mb-1">{payload[0].payload.name}</p>
                                            <p className="text-[#8b5cf6] text-sm">
                                                workshops : {payload[0].payload.workshops}
                                            </p>
                                            <p className="text-[#3b82f6] text-sm">
                                                proposals : {payload[0].payload.proposals}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="workshops" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="proposals" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {activeMonth && (
                <motion.div
                    className="absolute bg-gray-800 p-4 rounded-md shadow-lg border border-gray-700"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                    <div className="flex items-center mb-2">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <h4 className="text-white font-medium">{activeMonth.name}</h4>
                    </div>
                    <p className="text-[#8b5cf6]">workshops : {activeMonth.workshops}</p>
                    <p className="text-[#3b82f6]">proposals : {activeMonth.proposals}</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default MonthlyPerformance;