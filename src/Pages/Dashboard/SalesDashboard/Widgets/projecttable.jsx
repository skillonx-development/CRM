"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg",
    name: "Chakra Soft UI Version",
    members: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/1.jpg",
      "https://randomuser.me/api/portraits/lego/1.jpg",
    ],
    budget: "$14,000",
    completion: 60,
  },
  {
    id: 2,
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Jira_Logo.svg",
    name: "Add Progress Track",
    members: [
      "https://randomuser.me/api/portraits/men/2.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
    ],
    budget: "$3,000",
    completion: 10,
  },
  {
    id: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png",
    name: "Fix Platform Errors",
    members: ["https://randomuser.me/api/portraits/men/3.jpg"],
    budget: "Not set",
    completion: 100,
  },
  {
    id: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    name: "Launch our Mobile App",
    members: [
      "https://randomuser.me/api/portraits/women/4.jpg",
      "https://randomuser.me/api/portraits/men/5.jpg",
      "https://randomuser.me/api/portraits/lego/2.jpg",
    ],
    budget: "$32,000",
    completion: 100,
  },
];

const ProjectTable = () => {
  return (
    <div className="bg-background-card text-text shadow-card p-6 rounded-2xl border border-border">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center justify-between"
      >
        <h2 className="text-lg font-semibold flex items-center">
          ✅ <span className="ml-2 text-text-muted">30 done this month</span>
        </h2>
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-text-muted text-sm border-b border-border-dark">
              <th className="text-left py-3">COMPANIES</th>
              <th className="text-left py-3">MEMBERS</th>
              <th className="text-left py-3">BUDGET</th>
              <th className="text-left py-3">COMPLETION</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="border-b border-border-dark last:border-none hover:bg-background-hover transition-colors duration-300"
              >
                <td className="flex items-center py-4">
                  <img src={project.logo} alt={project.name} className="w-6 h-6 mr-3" />
                  {project.name}
                </td>
                <td>
                  <div className="flex -space-x-2">
                    {project.members.map((avatar, i) => (
                      <img
                        key={i}
                        src={avatar}
                        alt="Member"
                        className="w-7 h-7 rounded-full border-2 border-background-card shadow-md"
                      />
                    ))}
                  </div>
                </td>
                <td className="text-text-muted">{project.budget}</td>
                <td className="text-text-muted text-sm">{project.completion}%</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
