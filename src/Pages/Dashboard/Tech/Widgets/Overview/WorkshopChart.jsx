import React, { useState } from 'react';
import { Info } from 'lucide-react';

const WorkshopChart = () => {
  const [tooltipInfo, setTooltipInfo] = useState(null);
  
  // Chart data
  const categories = [
    { topic: 'React', count: 12 },
    { topic: 'NodeJs', count: 8 },
    { topic: 'AI/ML', count: 6 },
    { topic: 'UI/UX', count: 9 },
    { topic: 'DevOps', count: 5 }
  ];
  
  // Maximum value for scaling
  const maxValue = Math.max(...categories.map(cat => cat.count));
  
  // Handle mouse events for tooltip
  const showTooltip = (category) => {
    setTooltipInfo({
      topic: category.topic,
      value: category.count
    });
  };
  
  const hideTooltip = () => {
    setTooltipInfo(null);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-2xl">
      <div className="mb-4">
        <h2 className="text-white text-xl font-bold">Workshop Categories</h2>
        <p className="text-gray-400 text-sm">Distribution by topic</p>
      </div>
      
      <div className="relative h-72">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-400 text-xs">
          <span>12</span>
          <span>9</span>
          <span>6</span>
          <span>3</span>
          <span>0</span>
        </div>
        
        {/* Chart container */}
        <div className="ml-8 h-full flex items-end space-x-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              onMouseEnter={() => showTooltip(category)}
              onMouseLeave={hideTooltip}
            >
              <div
                className={`w-12 rounded-t-sm ${
                  category.topic === 'AI/ML' && tooltipInfo?.topic === 'AI/ML' 
                    ? 'bg-gray-300' 
                    : 'bg-purple-500'
                }`}
                style={{
                  height: `${(category.count / maxValue) * 100}%`,
                  minHeight: '4px'
                }}
              ></div>
              <span className="mt-2 text-gray-300 text-sm">{category.topic}</span>
            </div>
          ))}
        </div>
        
        {/* Tooltip */}
        {tooltipInfo && (
          <div 
            className="absolute bg-gray-800 border border-gray-700 p-3 rounded shadow-md text-white"
            style={{
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium">{tooltipInfo.topic}</span>
              <Info size={12} className="text-gray-400" />
            </div>
            <div className="mt-1">
              <span className="text-sm">value: {tooltipInfo.value}</span>
            </div>
          </div>
        )}
        
        {/* Horizontal grid lines */}
        <div className="absolute left-8 right-0 top-0 h-full pointer-events-none">
          <div className="border-t border-gray-700 opacity-20 h-1/4"></div>
          <div className="border-t border-gray-700 opacity-20 h-1/4"></div>
          <div className="border-t border-gray-700 opacity-20 h-1/4"></div>
          <div className="border-t border-gray-700 opacity-20 h-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopChart;