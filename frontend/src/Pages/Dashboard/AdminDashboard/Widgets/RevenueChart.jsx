import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import axios from 'axios';

const RevenueChart = () => {
    const [data, setData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [avgMonthlyRevenue, setAvgMonthlyRevenue] = useState(0);

    // Fetch data from the API on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://crm-4xul.onrender.com/api/invoice');
                const invoiceData = response.data; // Assuming the data structure is an array of invoices

                // Transform the data to monthly revenue format
                const monthlyRevenue = invoiceData.reduce((acc, invoice) => {
                    const month = new Date(invoice.createdAt).toLocaleString('default', { month: 'short' });
                    const revenue = invoice.amount;
                
                    // Group by month and accumulate revenue
                    if (acc[month]) {
                        acc[month] += revenue;
                    } else {
                        acc[month] = revenue;
                    }
                
                    return acc;
                }, {});
                

                // Prepare data for the chart
                const chartData = Object.keys(monthlyRevenue).map((month) => ({
                    month,
                    revenue: monthlyRevenue[month],
                }));

                setData(chartData);

                // Calculate total and average revenue
                const total = chartData.reduce((sum, item) => sum + item.revenue, 0);
                const avg = Math.round(total / chartData.length);

                setTotalRevenue(total);
                setAvgMonthlyRevenue(avg);
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        fetchData();
    }, []);

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
                                color: 'white',
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
