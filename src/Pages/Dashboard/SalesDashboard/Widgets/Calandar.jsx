"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const Calendar = () => {
  const [selectedDates, setSelectedDates] = useState(["2025-01-15", "2025-02-10"]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const generateDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day).toISOString().split("T")[0]);
    }

    return days;
  };

  return (
    <div className="p-4">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {months.map((month, index) => (
          <div key={month} className="bg-background-card text-text shadow-card rounded-lg p-4">
            <h2 className="text-lg font-semibold text-center mb-2">{month} 2025</h2>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <span key={d} className="text-text-muted text-center">{d}</span>
              ))}
              {generateDays(2025, index).map((date, i) => (
                <motion.div
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    selectedDates.includes(date) ? "bg-status-success text-white" : "text-text-muted"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {date ? new Date(date).getDate() : ""}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Calendar;
