import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";

const COLORS = {
  available: "#10b981",
  busy: "#ef4444",
  tentative: "#eab308",
};

export default function TeacherDashboard() {
  const [availabilityData, setAvailabilityData] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/teachers");
        const teachers = res.data || [];

        // Prepare availability data
        const statusCount = { available: 0, busy: 0, tentative: 0 };

        teachers.forEach((teacher) => {
          const status = teacher.status?.toLowerCase();
          if (statusCount[status] !== undefined) {
            statusCount[status]++;
          }
        });

        const availabilityPie = Object.keys(statusCount).map((status) => ({
          name: status.charAt(0).toUpperCase() + status.slice(1),
          value: statusCount[status],
          color: COLORS[status],
        }));

        setAvailabilityData(availabilityPie);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      {/* Teacher Availability Widget */}
      <div className="bg-background-card p-6 rounded-2xl shadow-card">
        <h3 className="text-lg font-semibold text-text-default">
          Teacher Availability
        </h3>
        <p className="text-sm text-text-muted">Current status of all teachers</p>

        {/* Pie Chart */}
        <div className="flex justify-center my-4">
          <PieChart width={200} height={200}>
            <Pie
              data={availabilityData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {availabilityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4">
          {availabilityData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-background-hover p-2 rounded-lg shadow-sm w-20"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <p className="text-xs text-text-default mt-1">{item.name}</p>
              <p className="text-lg font-semibold text-text-default">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
