import { useState } from "react";

export default function KanbanBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");

  const columns = [
    {
      title: "To Do",
      count: 2,
      tasks: [
        { title: "Landing page design", description: "Lorem ipsum.", team: ["A", "B"], tags: ["Wireframe"], category: "UI" },
        { title: "Career page update", description: "Lorem ipsum.", team: ["C"], tags: ["UX"], category: "Development" },
      ],
    },
    {
      title: "In Progress",
      count: 3,
      tasks: [
        { title: "Fix homepage bugs", description: "Lorem ipsum.", team: ["D", "E"], tags: ["Bugfix"], category: "Frontend" },
        { title: "New marketing plan", description: "Lorem ipsum.", team: ["F", "G", "H"], tags: ["Marketing"], category: "Strategy" },
        { title: "Mobile app redesign", description: "Lorem ipsum.", team: ["I", "J"], tags: ["UI/UX"], category: "Design" },
      ],
    },
    {
      title: "Completed",
      count: 3,
      tasks: [
        { title: "SEO campaign", description: "Lorem ipsum.", team: ["K", "L"], tags: ["Marketing"], category: "SEO" },
        { title: "Product launch", description: "Lorem ipsum.", team: ["M"], tags: ["Promotion"], category: "Sales" },
        { title: "Customer support update", description: "Lorem ipsum.", team: ["N", "O"], tags: ["Support"], category: "Operations" },
      ],
    },
  ];

  // Filtering & Sorting Logic
  const getFilteredTasks = (tasks) => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "title-asc") return a.title.localeCompare(b.title);
        if (sortBy === "title-desc") return b.title.localeCompare(a.title);
        if (sortBy === "team-size") return b.team.length - a.team.length;
        return 0;
      });
  };

  return (
    <div className="p-4">
      {/* Search & Sort Controls */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 rounded-md bg-background-card text-white placeholder-gray-400 border border-border-dark w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="p-2 rounded-md bg-background-card text-white border border-border-dark"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title-asc">Sort: Title (A-Z)</option>
          <option value="title-desc">Sort: Title (Z-A)</option>
          <option value="team-size">Sort: Team Size</option>
        </select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column, index) => {
          const filteredTasks = getFilteredTasks(column.tasks);
          return (
            <div key={index} className="bg-background-card rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold">
                  {column.title} <span className="text-text-muted">({filteredTasks.length})</span>
                </h3>
                <button className="text-text-muted text-lg">+</button>
              </div>

              {filteredTasks.length === 0 ? (
                <p className="text-text-muted">No tasks found</p>
              ) : (
                filteredTasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="bg-background-sidebar rounded-lg p-3 mb-3 shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {task.team.map((member, i) => (
                          <div
                            key={i}
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-600 text-white text-xs border-2 border-background-card"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                      <button className="text-text-muted">⋮</button>
                    </div>

                    <h4 className="text-white font-medium mt-2">{task.title}</h4>
                    <p className="text-text-muted text-sm">{task.description}</p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {task.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-border-dark text-text-muted px-2 py-1 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs text-blue-400 mt-2 block">{task.category}</span>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
