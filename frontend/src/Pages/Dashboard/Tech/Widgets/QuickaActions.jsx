export default function QuickActions() {
    const actions = [
      { text: "➕ Create Proposal", color: "bg-purple-600 hover:bg-purple-500" },
      { text: "📅 Schedule Workshop", color: "bg-blue-600 hover:bg-blue-500" },
      { text: "👨‍🏫 Assign Teacher", color: "bg-green-600 hover:bg-green-500" },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {actions.map((action, index) => (
          <button key={index} className={`${action.color} text-white p-4 rounded-lg shadow-lg`}>
            {action.text}
          </button>
        ))}
      </div>
    );
  }
  