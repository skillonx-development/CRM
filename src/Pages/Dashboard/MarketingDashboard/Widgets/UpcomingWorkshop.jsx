export default function UpcomingWorkshop() {
    return (
      <div className="space-y-4">
        {/* Upcoming Workshops */}
        <div className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-text">Upcoming Workshops</h2>
            <a href="#" className="text-sm text-status-info hover:underline">
              View all
            </a>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-md font-medium text-text">Advanced JavaScript</h3>
              <p className="text-sm text-text-muted">Code Institute</p>
              <p className="text-sm text-text-muted">June 5-7, 2023</p>
              <a href="#" className="text-sm text-primary hover:underline">
                Sarah Wilson
              </a>
            </div>
            <div className="border-t border-border-dark pt-3">
              <h3 className="text-md font-medium text-text">Mobile App Development</h3>
              <p className="text-sm text-text-muted">Tech University</p>
              <p className="text-sm text-text-muted">June 12-16, 2023</p>
              <a href="#" className="text-sm text-primary hover:underline">
                James Anderson
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  