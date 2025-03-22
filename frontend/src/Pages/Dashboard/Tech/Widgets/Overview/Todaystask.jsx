import React, { useState } from 'react';

const TodaysTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Send workshop materials to MIT", completed: true },
    { id: 2, text: "Review Stanford workshop proposal", completed: false },
    { id: 3, text: "Update curriculum for React workshop", completed: false },
    { id: 4, text: "Coordinate with Dr. Sarah Johnson", completed: true }
  ]);
  
  const [newTask, setNewTask] = useState('');

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Add new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask(''); // Clear input field
  };

  // Remove task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="bg-background-card rounded-lg shadow-card p-6">
      <h2 className="text-xl font-bold text-text mb-6">Today's Tasks</h2>

      {/* Task List */}
      <div className="space-y-4 mb-6">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Toggle Completion */}
              <button 
                onClick={() => toggleTask(task.id)} 
                className={`w-6 h-6 rounded-full border ${task.completed ? 'bg-status-success border-status-success' : 'border-text-muted'} flex items-center justify-center mr-3`}
              >
                {task.completed && (
                  <svg className="w-4 h-4 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>

              {/* Task Text */}
              <span className={`${task.completed ? 'line-through text-text-muted' : 'text-text'}`}>
                {task.text}
              </span>
            </div>

            {/* Remove Task Button */}
            <button 
              onClick={() => removeTask(task.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {/* Add New Task */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-md text-text bg-background"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button 
          onClick={addTask}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition"
        >
          Add
        </button>
      </div>

      {/* View All Tasks Button */}
      <button className="w-full py-3 border border-border-dark text-text hover:bg-background-hover rounded-full transition-colors">
        View All Tasks
      </button>
    </div>
  );
};

export default TodaysTasks;
