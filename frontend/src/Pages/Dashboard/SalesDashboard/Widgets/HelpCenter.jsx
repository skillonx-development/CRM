import { useState } from "react";
import { Search, MessageSquare, FileText, LifeBuoy } from "lucide-react";

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState("FAQ");
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = [
    {
      question: "How does the lead scoring system work?",
      answer: "The lead scoring system assigns points to leads based on their interactions with your business, such as website visits, email opens, and form submissions. Higher scores indicate higher engagement."
    },
    {
      question: "Can I customize the scoring criteria?",
      answer: "Yes, you can customize the scoring criteria in the settings section of your dashboard. Adjust weights for different actions to match your sales strategy."
    },
    {
      question: "How do I generate a new proposal?",
      answer: "To generate a new proposal, navigate to the Proposal section, select 'Create New,' fill in the required details, and choose a template. Then, preview and send it to your client."
    },
    {
      question: "What do the different lead statuses mean?",
      answer: "Lead statuses help track the progress of a lead through your sales funnel. Common statuses include 'New,' 'Contacted,' 'Qualified,' 'Proposal Sent,' and 'Closed.' You can customize these in settings."
    },
    {
      question: "How can I track my sales performance?",
      answer: "You can track your sales performance using the Analytics & Reporting section. View key metrics such as conversion rates, revenue, and sales trends over time."
    }
  ];

  // Filter the FAQs based on the search query
  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background text-text p-6">
      <h1 className="text-2xl font-bold">Help Center</h1>
      <p className="text-text-muted mb-4">Find answers to common questions and learn how to use the dashboard.</p>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-text-muted" size={18} />
        <input 
          type="text" 
          placeholder="Search for help topics..." 
          className="w-full bg-background-card border border-border-dark rounded-lg pl-10 p-2 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
        />
      </div>
      
      <div className="flex border-b border-border-dark mb-6">
        {["FAQ", "Guides", "Support"].map((tab) => (
          <button
            key={tab}
            className={`p-3 font-medium ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-text-muted"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {activeTab === "FAQ" && (
        <div className="bg-background-card p-4 rounded-lg shadow-card">
          <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
          <p className="text-text-muted mb-4">Find answers to the most common questions about using the Sales Dashboard.</p>
          <div className="space-y-3">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <details key={index} className="border border-border-dark p-3 rounded-lg cursor-pointer">
                  <summary className="font-medium">{faq.question}</summary>
                  <p className="text-text-muted mt-2">{faq.answer}</p>
                </details>
              ))
            ) : (
              <p className="text-text-muted">No results found. Try a different search.</p>
            )}
          </div>
        </div>
      )}
      
      {activeTab === "Guides" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{title: "Getting Started Guide", desc: "Learn the basics of the Sales Dashboard"}, {title: "Lead Management", desc: "How to effectively manage and prioritize leads"}, {title: "Proposal Creation", desc: "Create effective proposals quickly"}, {title: "Analytics & Reporting", desc: "Understanding your sales performance"}].map((guide) => (
            <div key={guide.title} className="bg-background-card p-4 rounded-lg shadow-card">
              <FileText className="text-primary mb-2" />
              <h3 className="font-semibold text-lg">{guide.title}</h3>
              <p className="text-text-muted mb-2">{guide.desc}</p>
              <a
  href="https://drive.google.com/file/d/1uiYRc36UfoLatSGl_ORhE62euRwhtaCm/view?usp=drive_link"
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary underline"
>
              <button className="text-primary">
                Read Guide</button>
                </a>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === "Support" && (
        <div className="space-y-4">
          <div className="bg-background-card p-4 rounded-lg shadow-card flex items-center gap-4">
            <MessageSquare className="text-primary" />
            <div>
              <h3 className="font-semibold">For further support, contact admin</h3>
              <p className="text-text-muted">admin@example.com</p>
              <p className="text-text-muted">skillonx@example.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
