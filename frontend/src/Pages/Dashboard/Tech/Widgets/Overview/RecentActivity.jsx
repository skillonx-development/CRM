import React from 'react';
import { FileText, BookOpen, Users, Calendar, CheckCircle } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      icon: <FileText className="w-5 h-5 text-status-info" />,
      title: "New workshop proposal submitted",
      description: "React Advanced Workshop proposal for Stanford University",
      user: "Alex Chen",
      time: "30 minutes ago",
      avatar: "/api/placeholder/32/32"
    },
   
    {
      id: 3,
      icon: <Users className="w-5 h-5 text-status-success" />,
      title: "New instructor assigned",
      description: "Dr. Sarah Johnson assigned to React Workshop",
      user: "Alex Chen",
      time: "5 hours ago",
      avatar: "/api/placeholder/32/32"
    }
  ];

  return (
    <div className="bg-background-card rounded-lg p-6 shadow-card border border-border max-w-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text">Recent Activity</h2>
        <p className="text-text-muted">Latest actions and updates</p>
      </div>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex">
            <div className="mr-4 flex-shrink-0 flex items-center">
              {activity.icon}
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium text-text">{activity.title}</h3>
                <span className="text-sm text-text-muted">{activity.time}</span>
              </div>
              <p className="text-text-muted mb-2">{activity.description}</p>
              
              <div className="flex items-center">
                {activity.avatar ? (
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-background-hover text-text-muted flex items-center justify-center text-xs mr-2">
                    {activity.initials}
                  </div>
                )}
                <span className="text-sm text-text-muted">{activity.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;