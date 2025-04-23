import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import axios from 'axios';

const MonthlyPerformance = () => {
    const [data, setData] = useState([]);
    const [activeMonth, setActiveMonth] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://crm-5qj0.onrender.com/api/tech-proposals');
                const proposals = response.data;

                const monthlyStats = proposals.reduce((acc, item) => {
                    const date = new Date(item.createdAt);
                    const month = date.toLocaleString('default', { month: 'short' });

                    if (!acc[month]) {
                        acc[month] = { name: month, completed: 0, proposals: 0 };
                    }

                    acc[month].proposals += 1;
                    if (item.status === "Completed") acc[month].completed += 1;


                    return acc;
                }, {});

                const sortedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const chartData = sortedMonths.map((month) =>
                    monthlyStats[month] || { name: month, completed: 0, proposals: 0 }
                );

                setData(chartData);
            } catch (error) {
                console.error('Error fetching tech proposals:', error);
            }
        };

        fetchData();
    }, []);

    const handleMouseOver = (data) => setActiveMonth(data);
    const handleMouseLeave = () => setActiveMonth(null);

    return (
        <motion.div
            className="bg-background-card rounded-lg p-6 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
        >
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-white text-xl font-semibold">Monthly Performance</h3>
                    <p className="text-gray-400">Proposals and completions</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-2"></div>
                        <span className="text-gray-400 text-sm">proposals</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
                        <span className="text-gray-400 text-sm">completed</span>
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
                                            <p className="text-[#3b82f6] text-sm">
                                                proposals : {payload[0].payload.proposals}
                                            </p>
                                            <p className="text-[#10b981] text-sm">
                                                completed : {payload[0].payload.completed}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="proposals" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
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
                    <p className="text-[#3b82f6]">proposals : {activeMonth.proposals}</p>
                    <p className="text-[#10b981]">completed : {activeMonth.completed}</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default MonthlyPerformance;
