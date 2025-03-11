import React from "react";

const Calendar = ({ month, year, highlightedDays }) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysArray = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <div className="bg-gray-900 p-4 rounded-lg w-64 text-white">
      <h2 className="text-lg font-semibold text-center mb-2">
        {new Date(year, month - 1).toLocaleString("default", { month: "long" })} {year}
      </h2>
      <div className="grid grid-cols-7 text-center text-gray-400 text-sm mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="p-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysArray.map((day, index) =>
          day ? (
            <div
              key={index}
              className={`p-2 w-8 h-8 flex items-center justify-center rounded-full 
                ${highlightedDays.includes(day) ? "bg-teal-500 text-black font-bold" : "text-gray-300"}`}
            >
              {day}
            </div>
          ) : (
            <div key={index} className="w-8 h-8"></div>
          )
        )}
      </div>
    </div>
  );
};

const ThreeMonthCalendar = () => {
  return (
    <div className="flex space-x-4 bg-gray-950 p-6 rounded-lg">
      <Calendar month={1} year={2025} highlightedDays={[15]} />
      <Calendar month={2} year={2025} highlightedDays={[10]} />
      <Calendar month={3} year={2025} highlightedDays={[]} />
      <Calendar month={4} year={2025} highlightedDays={[]} />
    </div>
  );
};

export default ThreeMonthCalendar;
