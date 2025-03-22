const InstructorAvailability = () => {
    return (
      <div className="bg-background-card p-6 rounded-lg shadow-card border border-border-dark w-full md:w-1/2 text-text-default">
        <h2 className="text-xl font-semibold flex items-center mb-2">
          📅 Instructor Availability Calendar
        </h2>
        <p className="text-text-muted mb-3">
          Overview of instructor schedules for the month
        </p>
        <div className="flex flex-col items-center justify-center border border-border-dark rounded-lg py-6 bg-background-hover">
          <span className="text-text-muted text-3xl">📆</span>
          <p className="text-text-muted mt-1">Calendar view goes here</p>
          <button className="mt-3 bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded">
            Sync with Google Calendar
          </button>
        </div>
      </div>
    );
  };
  
  export default InstructorAvailability;
  