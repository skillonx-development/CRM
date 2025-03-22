import { Calendar } from "lucide-react";

const InstructorCalendar = () => {
  return (
    <div className="bg-background-card shadow-card rounded-lg p-6 border border-border-dark">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-text-default">
          <Calendar size={20} className="text-primary" />
          Instructor Availability Calendar
        </h2>
        <p className="text-text-muted text-sm">Overview of instructor schedules for the month</p>
      </div>

      {/* Calendar Placeholder */}
      <div className="border border-border-dark rounded-lg p-8 flex flex-col items-center justify-center bg-background-hover text-text-muted">
        <Calendar size={48} className="mb-2 text-text-disabled" />
        <p>Calendar view goes here</p>
        <button className="mt-4 bg-status-info text-white px-4 py-2 rounded-md hover:bg-status-success transition focus:outline-none focus:ring-2 focus:ring-status-info">
          Sync with Google Calendar
        </button>
      </div>
    </div>
  );
};

export default InstructorCalendar;
