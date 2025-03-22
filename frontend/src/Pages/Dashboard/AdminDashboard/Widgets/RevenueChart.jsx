import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const RevenueChart = () => {
    // Sample data for the last 6 months
    const data = [
        { month: 'Jan', revenue: 12000 },
        { month: 'Feb', revenue: 19000 },
        { month: 'Mar', revenue: 18000 },
        { month: 'Apr', revenue: 21000 },
        { month: 'May', revenue: 16000 },
        { month: 'Jun', revenue: 24000 },
        { month: 'Jul', revenue: 32000 },
    ];

    // Calculate total revenue
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

    // Calculate average monthly revenue
    const avgMonthlyRevenue = Math.round(totalRevenue / data.length);

    return (
        <motion.div
            className="bg-background-card rounded-lg p-6 shadow-lg h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Revenue Overview</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(), 'MMM yyyy')}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Monthly</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">${avgMonthlyRevenue.toLocaleString()}</p>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: '#6B7280' }}
                            axisLine={{ stroke: '#374151', opacity: 0.2 }}
                        />
                        <YAxis
                            tick={{ fill: '#6B7280' }}
                            axisLine={{ stroke: '#374151', opacity: 0.2 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                            contentStyle={{
                                backgroundColor: '#374151',
                                border: 'none',
                                borderRadius: '0.375rem',
                                color: 'white'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default RevenueChart;