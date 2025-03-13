    export default function RecentActivity() {
        const activities = [
        {
            project: "Chakra Soft UI Version",
            status: "Active",
            team: "anton.png",
            progress: 60,
        },
        {
            project: "Add Progress Track",
            status: "Hold",
            team: "/mnt/data/Screenshot 2025-03-12 120430.png",
            progress: 10,
        },
        {
            project: "Fix Platform Errors",
            status: "Active",
            team: "/mnt/data/Screenshot 2025-03-12 115638.png",
            progress: 100,
        },
        {
            project: "Launch our Mobile App",
            status: "Active",
            team: "/mnt/data/Screenshot 2025-03-12 120430.png",
            progress: 100,
        },
        {
            project: "Add the New Pricing Page",
            status: "Hold",
            team: "/mnt/data/Screenshot 2025-03-12 115638.png",
            progress: 25,
        },
        {
            project: "Redesign New Online Shop",
            status: "Active",
            team: "/mnt/data/Screenshot 2025-03-12 120430.png",
            progress: 40,
        },
        ];
    
        return (
        <div className="bg-background-card rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-lg font-semibold">Recent Activity</h2>
            <span className="text-text-muted text-sm">📅 30 done this month</span>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-border-dark text-text-muted text-sm">
                    <th className="py-3 px-6 text-left">PROJECT</th>
                    <th className="py-3 px-6 text-center">STATUS</th>
                    <th className="py-3 px-6 text-center">TEAM</th>
                    <th className="py-3 px-6 text-center">PROGRESS</th>
                </tr>
                </thead>
                <tbody>
                {activities.map((activity, index) => (
                    <tr key={index} className="text-white border-b border-border-dark last:border-none">
                    <td className="py-4 px-6 text-left font-medium">{activity.project}</td>
                    <td className="py-4 px-6 text-center">
                        <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            activity.status === "Active"
                            ? "bg-green-500 text-black"
                            : "bg-yellow-500 text-black"
                        }`}
                        >
                        {activity.status}
                        </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                        <img
                        src={ 'eddie.png'}
                        alt="Team"
                        className="h-10 w-10 rounded-full mx-auto border-2 border-gray-700"
                        />
                    </td>
                    <td className="py-4 px-6 text-center">
                        <div className="flex items-center gap-3 justify-center">
                        <div className="w-32 h-2 bg-border-dark rounded-full">
                            <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${activity.progress}%` }}
                            ></div>
                        </div>
                        <span className="text-sm font-medium">{activity.progress}%</span>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        );
    }
    