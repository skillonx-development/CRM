const Campaigns = () => {
    const campaigns = [
      { title: "Latest marketing activities and status", date: "22 DEC 7:20 PM" },
      { title: "Social media engagement campaign active", date: "21 DEC 9:28 PM" },
      { title: "Paid Advertising", date: "20 DEC 3:52 PM" },
      { title: "Email Marketing Campaigns", date: "19 DEC 11:35 PM" },
      { title: "International Campaigns", date: "18 DEC 4:41 PM" },
    ];
  
    return (
      <div className="min-h-screen bg-background-default text-text-default p-6 flex flex-col items-start">
        <h2 className="text-lg font-semibold flex items-center">
          Recent Campaigns <span className="ml-2 text-green-500">✔</span>
        </h2>
        <div className="mt-4 space-y-5">
          {campaigns.map((campaign, index) => (
            <div key={index} className="flex flex-col">
              <span className="flex items-center space-x-2">
                <span className="text-yellow-400">●</span>
                <span className="font-medium">{campaign.title}</span>
              </span>
              <span className="text-text-muted text-sm">{campaign.date}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Campaigns;
  