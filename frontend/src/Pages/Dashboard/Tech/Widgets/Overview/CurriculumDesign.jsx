import React from 'react';

const CurriculumDesign = () => {
  const workshopData = [
    {
      id: 1,
      title: "Advanced React Patterns",
      category: "React",
      institution: "Stanford",
      progress: 75,
      daysLeft: 5,
    },
    {
      id: 2,
      title: "AI & Machine Learning Basics",
      category: "AI",
      institution: "Harvard",
      description: "Intro-level workshop",
      progress: 45,
      daysLeft: 10,
    },
    {
      id: 3,
      title: "Backend Development with Node.js",
      category: "Backend",
      description: "Comprehensive backend workshop",
      progress: 30,
      daysLeft: 14,
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      category: "UI/UX",
      institution: "Berkeley",
      description: "Design workshop",
      progress: 60,
      daysLeft: 7,
    },
  ];


  const getCategoryColor = (category) => {
    switch (category) {
      case "React":
        return "text-chart-blue";
      case "AI":
        return "text-primary";
      case "Backend":
        return "text-chart-green";
      case "UI/UX":
        return "text-chart-pink";
      default:
        return "text-text-muted";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 70) return "bg-status-success";
    if (progress >= 40) return "bg-status-warning";
    return "bg-status-error";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
       

        <div className="bg-background-card rounded-lg shadow-card p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-text">Curriculum Design</h2>
              <p className="text-text-muted">Design and manage workshop curricula</p>
            </div>
            <div className="px-3 py-1 rounded-md bg-background-hover text-text-muted">
              AI Generator
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workshopData.map((workshop) => (
              <div key={workshop.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-text">{workshop.title}</h3>
                    <p className="text-sm text-text-muted">
                      {workshop.description || `Curriculum for ${workshop.institution} workshop`}
                    </p>
                  </div>
                  <span className={`text-sm ${getCategoryColor(workshop.category)}`}>
                    {workshop.category}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">Progress</span>
                    <span className="text-text">{workshop.progress}%</span>
                  </div>
                  <div className="w-full bg-border-dark rounded-full h-2 mb-3">
                    <div
                      className={`${getProgressColor(workshop.progress)} h-2 rounded-full`}
                      style={{ width: `${workshop.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-text-muted">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {workshop.daysLeft} days left
                    </div>
                    <button className="px-4 py-1 text-sm bg-background-hover border border-border-dark rounded-md text-text hover:bg-background-sidebar">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CurriculumDesign;