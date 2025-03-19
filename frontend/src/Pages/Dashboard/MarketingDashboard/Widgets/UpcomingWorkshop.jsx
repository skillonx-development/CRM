import { motion } from "framer-motion";

export default function UpcomingWorkshop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Upcoming Workshops */}
      <div className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-text">Upcoming Workshops</h2>
          <a href="#" className="text-sm text-status-info hover:underline">
            View all
          </a>
        </div>
        <div className="space-y-3">
          {[
            {
              title: "Advanced JavaScript",
              org: "Code Institute",
              date: "June 5-7, 2023",
              instructor: "Sarah Wilson",
            },
            {
              title: "Mobile App Development",
              org: "Tech University",
              date: "June 12-16, 2023",
              instructor: "James Anderson",
            },
          ].map((workshop, index) => (
            <motion.div
              key={workshop.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={index > 0 ? "border-t border-border-dark pt-3" : ""}
            >
              <h3 className="text-md font-medium text-text">{workshop.title}</h3>
              <p className="text-sm text-text-muted">{workshop.org}</p>
              <p className="text-sm text-text-muted">{workshop.date}</p>
              <a href="#" className="text-sm text-primary hover:underline">
                {workshop.instructor}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
