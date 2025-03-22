import React, { useState } from "react";

const Calendar = ({ availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleDateClick = (day) => {
    if (availability.includes(day)) {
      setSelectedDate(day);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">March {year}</h3>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            className={`p-2 rounded-md text-center ${
              availability.includes(day)
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            } ${selectedDate === day ? "border-2 border-blue-500" : ""}`}
          >
            {day}
          </button>
        ))}
      </div>
      <p className="mt-4">
        {selectedDate ? `Selected Date: March ${selectedDate}, ${year}` : "Select a date"}
      </p>
    </div>
  );
};

export default Calendar;
