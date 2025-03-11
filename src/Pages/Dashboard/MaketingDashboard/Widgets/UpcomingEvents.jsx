import React from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from "date-fns";

const generateMonthData = (year, month) => {
  const start = startOfWeek(startOfMonth(new Date(year, month)));
  const end = endOfWeek(endOfMonth(new Date(year, month)));
  let date = start;
  const days = [];

  while (date <= end) {
    days.push(date);
    date = addDays(date, 1);
  }

  return days;
};

const Calendar = ({ year, month }) => {
  const days = generateMonthData(year, month);

  return (
    <div className="text-center text-text-default">
      <h2 className="text-lg font-semibold mb-2">{format(new Date(year, month), "MMMM yyyy")}</h2>
      <div className="grid grid-cols-7 gap-1 text-text-muted">
        {["S", "S", "M", "T", "W", "T", "F"].map((day) => (
          <span key={day} className="text-sm">{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {days.map((day, index) => (
          <span
            key={index}
            className={`text-sm p-1 ${
              isSameMonth(day, new Date(year, month)) ? "text-text-default" : "text-text-muted"
            }`}
          >
            {format(day, "d")}
          </span>
        ))}
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  return (
    <div className="bg-background-default p-10">
      <h1 className="text-text-default text-xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Calendar year={2025} month={0} /> {/* January */}
        <Calendar year={2025} month={1} /> {/* February */}
        <Calendar year={2025} month={2} /> {/* March */}
      </div>
    </div>
  );
};

export default UpcomingEvents;
