import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const widgets = [
  {
    title: "Proposals Recieved",
    value: "12",
    change: "N/A",
    positive: true,
    description: "Scheduled for this month"
  },
  {
    title: "Proposals to Marketing",
    value: "4",
    change: "N/A",
    positive: true,
    description: "Currently in progress"
  },
  {
    title: "Worshops in execution",
    value: "186",
    change: "N/A",
    positive: true,
    description: "Across all workshops"
  },
  {
    title: "Completed Workshops",
    value: "28",
    change: "N/A",
    positive: true,
    description: "In the past 3 months"
  },
];

const DashboardAnalytics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {widgets.map((widget, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="bg-background-card text-text shadow-card border border-border rounded-xl p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-text-muted">{widget.title}</h3>
              <MoreHorizontal className="text-text-disabled" size={16} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-semibold">{widget.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-md ${
                    widget.positive
                      ? "bg-status-success/20 text-status-success"
                      : "bg-status-error/20 text-status-error"
                  }`}
                >
                  {widget.change} {widget.positive ? "↑" : "↓"}
                </span>
                {widget.description && (
                  <span className="text-xs text-text-muted">{widget.description}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardAnalytics;
