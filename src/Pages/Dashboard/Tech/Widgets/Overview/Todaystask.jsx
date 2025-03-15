import React from 'react';

const TodaysTasks = () => {
  const tasks = [
    {
      id: 1,
      text: "Send workshop materials to MIT",
      completed: true
    },
    {
      id: 2,
      text: "Review Stanford workshop proposal",
      completed: false
    },
    {
      id: 3,
      text: "Update curriculum for React workshop",
      completed: false
    },
    {
      id: 4,
      text: "Coordinate with Dr. Sarah Johnson",
      completed: true
    }
  ];

  return (
    <div className="bg-background-card rounded-lg shadow-card p-6">
      <h2 className="text-xl font-bold text-text mb-6">Today's Tasks</h2>
      
      <div className="space-y-4 mb-6">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center">
            <div className={`w-6 h-6 rounded-full border ${task.completed ? 'bg-status-success border-status-success' : 'border-text-muted'} flex items-center justify-center mr-3`}>
              {task.completed && (
                <svg className="w-4 h-4 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <span className={`${task.completed ? 'line-through text-text-muted' : 'text-text'}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
      
      <button className="w-full py-3 border border-border-dark text-text hover:bg-background-hover rounded-full transition-colors">
        View All Tasks
      </button>
    </div>
  );
};

export default TodaysTasks;