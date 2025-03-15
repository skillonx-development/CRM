const FeedbackAnalysis = () => {
    return (
      <div className="p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-text">Review & Feedback Analysis</h2>
        <p className="text-text-muted mb-6">Analyze workshop performance and attendee feedback.</p>
  
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Feedback Collected */}
          <div className="bg-background-card p-6 rounded-lg shadow-card">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-text-muted">Total Feedback Collected</h3>
              <span className="text-chart-blue text-2xl">💬</span>
            </div>
            <p className="text-3xl font-bold text-text mt-2">142</p>
            <p className="text-status-success text-sm mt-1">↑ 18% from last month</p>
          </div>
  
          {/* Average Workshop Rating */}
          <div className="bg-background-card p-6 rounded-lg shadow-card">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-text-muted">Average Workshop Rating</h3>
              <span className="text-chart-blue text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-text mt-2">4.4</p>
            <p className="text-status-success text-sm mt-1">↑ 0.2% from last month</p>
          </div>
  
          {/* Satisfaction Index */}
          <div className="bg-background-card p-6 rounded-lg shadow-card">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-text-muted">Satisfaction Index</h3>
              <span className="text-chart-blue text-2xl">📈</span>
            </div>
            <p className="text-3xl font-bold text-text mt-2">87%</p>
            <p className="text-status-success text-sm mt-1">↑ 5% from last month</p>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default FeedbackAnalysis;
  