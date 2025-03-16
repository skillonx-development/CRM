"use client";
import { FaTrophy, FaStar } from "react-icons/fa";

const workshops = [
  { name: "React Fundamentals", rating: 4.7, attendees: 42, completion: 95, top: true },
  { name: "JavaScript Basics", rating: 4.3, attendees: 36, completion: 88 },
  { name: "Node.js Backend", rating: 4.3, attendees: 28, completion: 82 },
  { name: "UI/UX Principles", rating: 4.0, attendees: 31, completion: 79 },
  { name: "Python for Data Science", rating: 4.5, attendees: 24, completion: 90 },
];

const TopWorkshops = () => {
  return (
    <div className="bg-background-card rounded-lg shadow-card p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border-dark pb-4 mb-4">
        <h2 className="text-lg font-semibold flex items-center text-text-default">
          <FaTrophy className="text-status-warning mr-2" /> Top Performing Workshops
        </h2>
        <a href="#" className="text-status-info text-sm hover:underline">View all →</a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-text-muted text-sm">
              <th className="pb-2">Workshop</th>
              <th className="pb-2">Rating</th>
              <th className="pb-2">Attendees</th>
              <th className="pb-2">Completion</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop, index) => (
              <tr key={index} className={`border-t border-border-dark ${workshop.top ? "bg-background-hover bg-opacity-30" : ""}`}>
                {/* Workshop Name */}
                <td className="py-3 flex items-center text-text-default">
                  {workshop.top && <FaTrophy className="text-status-warning mr-2" />}
                  {workshop.name}
                </td>

                {/* Rating */}
                <td className="py-3">
                  <span className="bg-chart-blue bg-opacity-20 text-chart-blue px-2 py-1 rounded-full text-sm flex items-center w-fit">
                    {workshop.rating} <FaStar className="ml-1" />
                  </span>
                </td>

                {/* Attendees */}
                <td className="py-3 text-text-default">{workshop.attendees}</td>

                {/* Completion Bar */}
                <td className="py-3">
                  <div className="flex flex-col gap-1">
                    <div className="relative w-full h-2 bg-border-dark rounded-full">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full ${
                          workshop.completion > 90 ? "bg-status-success" : 
                          workshop.completion > 80 ? "bg-status-info" : 
                          workshop.completion > 70 ? "bg-status-warning" : "bg-status-error"
                        }`}
                        style={{ width: `${workshop.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-text-muted text-xs">{workshop.completion}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopWorkshops;