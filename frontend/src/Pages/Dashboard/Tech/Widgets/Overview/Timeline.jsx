import React from 'react';

const WorkshopTimeline = () => {
  const timelineEvents = [
    {
      id: 1,
      date: "Today",
      time: "9:00 AM",
      title: "MIT Workshop Begins",
      description: "Full-Stack Development Bootcamp kicks off with intro session"
    },
    {
      id: 2,
      date: "Tomorrow",
      time: "11:00 AM",
      title: "React Workshop Materials Due",
      description: "Final review of Stanford workshop materials"
    },
    {
      id: 3,
      date: "May 15",
      time: "9:00 AM",
      title: "Stanford Workshop Begins",
      description: "React JS Advanced Workshop at Stanford University"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-background-card rounded-lg shadow-card p-6">
          <h2 className="text-xl font-bold text-text mb-8">Workshop Timeline</h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border-dark"></div>
            
            {/* Timeline events */}
            <div className="space-y-8">
              {timelineEvents.map((event) => (
                <div key={event.id} className="relative pl-12">
                  {/* Circle marker */}
                  <div className="absolute left-0 top-1.5 w-8 flex justify-center">
                    <div className="w-3 h-3 bg-text-muted rounded-full"></div>
                  </div>
                  
                  {/* Event content */}
                  <div>
                    <p className="text-text-muted text-sm mb-1">{event.date}, {event.time}</p>
                    <h3 className="text-text font-medium text-lg mb-1">{event.title}</h3>
                    <p className="text-text-muted">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopTimeline;