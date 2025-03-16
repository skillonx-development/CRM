import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Available", value: 18, color: "#10b981" }, // Green (Success)
  { name: "Busy", value: 12, color: "#ef4444" }, // Red (Error)
  { name: "Tentative", value: 8, color: "#eab308" }, // Yellow (Warning)
];

const assignments = [
  {
    teacher: "Sarah Wilson",
    workshop: "Advanced JavaScript",
    institution: "Tech University",
    date: "June 5-7, 2023",
  },
  {
    teacher: "Michael Chen",
    workshop: "UI/UX Masterclass",
    institution: "Design Academy",
    date: "June 15-16, 2023",
  },
  {
    teacher: "James Anderson",
    workshop: "Data Science Fundamentals",
    institution: "Analytics College",
    date: "June 20-24, 2023",
  },
];

export default function TeacherDashboard() {
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
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4">
          {data.map((item, index) => (
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

      {/* Upcoming Assignments Widget */}
      <div className="bg-background-card p-6 rounded-2xl shadow-card">
        <h3 className="text-lg font-semibold text-text-default">
          Upcoming Assignments
        </h3>
        <p className="text-sm text-text-muted">
          Teacher assignments for workshops
        </p>

        <div className="mt-4 space-y-4">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="p-4 bg-background-hover rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h4 className="text-base font-semibold text-text-default">
                  {assignment.teacher}
                </h4>
                <p className="text-sm text-text-muted">{assignment.workshop}</p>
                <p className="text-xs text-text-muted">{assignment.institution}</p>
                <p className="text-xs text-text-muted">{assignment.date}</p>
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                Assigned
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
