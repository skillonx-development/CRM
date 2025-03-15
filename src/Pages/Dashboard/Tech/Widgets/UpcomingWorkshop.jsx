const workshops = [
    {
      title: "Advanced React Patterns",
      instructor: "Dr. Sarah Johnson",
      client: "TechCorp Inc.",
      date: "June 15, 2023",
    },
    {
      title: "Data Visualization with Python",
      instructor: "Prof. Michael Chen",
      client: "Finance Solutions Ltd.",
      date: "June 18, 2023",
    },
    {
      title: "Network Security Essentials",
      instructor: "Jane Smith, MSc",
      client: "Healthcare Systems",
      date: "June 22, 2023",
    },
  ];
  
  const UpcomingWorkshops = () => {
    return (
      <div className="bg-background-card p-6 rounded-lg shadow-card border border-border-dark w-full md:w-1/2 text-text-default">
        <h2 className="text-xl font-semibold flex items-center mb-2">
          🎓 Upcoming Workshop Assignments
        </h2>
        <p className="text-text-muted mb-3">
          Workshops scheduled for this month
        </p>
        <div className="space-y-3">
          {workshops.map((workshop, index) => (
            <div key={index} className="flex justify-between border-b pb-2 border-border-dark">
              <div>
                <h3 className="text-lg font-semibold text-primary-light">
                  {workshop.title}
                </h3>
                <p className="text-xs text-text-muted">Instructor: {workshop.instructor}</p>
                <p className="text-xs text-text-muted">Client: {workshop.client}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-status-info">{workshop.date}</p>
                <button className="text-primary hover:underline text-xs">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default UpcomingWorkshops;
  