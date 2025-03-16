import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 19000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 21000 },
    { month: 'May', revenue: 16000 },
    { month: 'Jun', revenue: 24000 },
    { month: 'Jul', revenue: 32000 },
];

const RevenueChart = () => {
    return (
        <motion.div
            className="bg-[#0f1123] rounded-lg p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <motion.div
                className="mb-4"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-white text-xl font-semibold">Revenue Overview</h3>
                <p className="text-gray-400">Monthly revenue from workshops</p>
            </motion.div>
            <motion.div
                className="h-72"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1c31', border: 'none', color: 'white' }} />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </motion.div>
    );
};

export default RevenueChart;