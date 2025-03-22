import React from 'react';
import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WorkshopPerformance = () => {
  // Sample data based on the image
  const data = [
    { month: 'Jan', workshops: 4, proposals: 6 },
    { month: 'Feb', workshops: 6, proposals: 8 },
    { month: 'Mar', workshops: 5, proposals: 10 },
    { month: 'Apr', workshops: 8, proposals: 12 },
    { month: 'May', workshops: 10, proposals: 15 },
    { month: 'Jun', workshops: 9, proposals: 13 },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background-card p-4 border border-border-dark rounded shadow-md">
          <p className="text-lg font-medium text-text mb-2">{label}</p>
          <p className="text-text-muted">
            workshops : <span className="text-text">{payload[0].value}</span>
          </p>
          <p className="text-primary-light">
            proposals : <span className="text-primary">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-background-card rounded-lg p-6 shadow-card w-full max-w-4xl border border-border">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-text">Workshop Performance</h2>
          <p className="text-text-muted">Number of proposals and executed workshops</p>
        </div>
        <button className="text-primary flex items-center text-sm font-medium hover:text-primary-light">
          View details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center mb-4 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-chart-indigo mr-2"></div>
          <span className="text-text-muted">Workshops</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-chart-blue mr-2"></div>
          <span className="text-text-muted">Proposals</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af' }}
              domain={[0, 16]}
              ticks={[0, 4, 8, 12, 16]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="workshops" 
              stroke="#6366f1" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2, fill: "#111827" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#6366f1" }}
            />
            <Line 
              type="monotone" 
              dataKey="proposals" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2, fill: "#111827" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkshopPerformance;