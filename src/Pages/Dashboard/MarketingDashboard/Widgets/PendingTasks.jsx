export default function PendingTasks() {
    return (
      <div className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96">
        <h2 className="text-lg font-semibold text-status-info mb-3">Pending Tasks</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 flex items-center justify-center bg-status-info text-white text-xs font-bold rounded-full">
              1
            </span>
            <p className="text-text-muted">Finalize React workshop proposal for Tech University</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 flex items-center justify-center bg-status-info text-white text-xs font-bold rounded-full">
              2
            </span>
            <p className="text-text-muted">Assign teacher for Data Science workshop</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 flex items-center justify-center bg-status-info text-white text-xs font-bold rounded-full">
              3
            </span>
            <p className="text-text-muted">Review feedback from UI/UX workshop</p>
          </li>
        </ul>
      </div>
    );
  }
  