export default function WorkshopCards() {
    return (
      <div className="flex gap-4">
        {/* Card 1 */}
        <div className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start">
            <h3 className="text-md font-medium text-text">3-Day React Workshop</h3>
            <span className="bg-primary-light text-primary-dark text-xs font-semibold px-2 py-1 rounded-lg">
              Enhancing
            </span>
          </div>
          <p className="text-sm text-text-muted flex items-center mt-1">
            📍 Tech University
          </p>
          <p className="text-sm text-text-muted flex items-center">
            📅 Aug. 15-17, 2023 &nbsp; ⏳ 3 days
          </p>
          <p className="text-sm text-text-muted flex items-center">
            👨‍🏫 Dr. Jane Smith
          </p>
  
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-background-hover text-text-muted rounded-lg hover:bg-primary-dark hover:text-text transition">
              Edit
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              Enhance
            </button>
          </div>
        </div>
  
        {/* Card 2 */}
        <div className="bg-background-card rounded-2xl shadow-card p-4 border border-border w-96 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start">
            <h3 className="text-md font-medium text-text">UI/UX Design Masterclass</h3>
            <span className="bg-status-success text-white text-xs font-semibold px-2 py-1 rounded-lg">
              Ready for Review
            </span>
          </div>
          <p className="text-sm text-text-muted flex items-center mt-1">
            📍 Design Academy
          </p>
          <p className="text-sm text-text-muted flex items-center">
            📅 July 10-11, 2023 &nbsp; ⏳ 2 days
          </p>
          <p className="text-sm text-text-muted flex items-center">
            👨‍🏫 Prof. Robert Johnson
          </p>
  
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-background-hover text-text-muted rounded-lg hover:bg-primary-dark hover:text-text transition">
              Edit
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              Enhance
            </button>
          </div>
        </div>
      </div>
    );
  }
  