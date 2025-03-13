import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaPhone, FaEnvelope, FaRegLightbulb, FaTools } from "react-icons/fa";

const HelpCenter = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I navigate the dashboard?",
      answer:
        "Use the left sidebar to access key sections like Settings, Help, and Logout. The main menu provides additional features.",
    },
    {
      question: "How do I update my profile settings?",
      answer:
        "Click on the 'Settings' option (gear icon) to change your profile, security settings, and preferences.",
    },
    {
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click 'Forgot Password' on the login page and follow the instructions to reset your password.",
    },
    {
      question: "The dashboard is not loading properly. What should I do?",
      answer:
        "Try checking your internet connection, refreshing the page, or clearing your browser cache. If the issue persists, use another browser.",
    },
  ];

  return (
    <div className="bg-background-card text-text p-8 rounded-2xl shadow-card max-w-3xl mx-auto">
      <h2 className="text-primary text-3xl font-bold mb-6">Help Center</h2>

      {/* Getting Started Section */}
      <div className="mb-6 p-5 bg-background-hover rounded-xl shadow-sm">
        <h3 className="flex items-center text-text-muted text-xl font-semibold">
          <FaRegLightbulb className="text-primary mr-2" />
          Getting Started
        </h3>
        <p className="text-text-muted mt-2">
          Learn how to navigate the dashboard and configure your settings efficiently.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mb-6">
        <h3 className="flex items-center text-text-muted text-xl font-semibold mb-3">
          <FaQuestionCircle className="text-primary mr-2" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-background-hover p-4 rounded-lg transition-all duration-300">
              <button
                className="flex justify-between items-center w-full text-left text-text font-medium"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openFAQ === index && (
                <p className="mt-2 text-text-muted transition-opacity duration-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="mb-6 p-5 bg-background-hover rounded-xl shadow-sm">
        <h3 className="flex items-center text-text-muted text-xl font-semibold">
          <FaTools className="text-primary mr-2" />
          Troubleshooting
        </h3>
        <p className="text-text-muted mt-2">
          If you're experiencing issues, check your internet connection, clear cache, or try a different browser.
        </p>
      </div>

      {/* Contact Support Section */}
      <div className="p-5 bg-background-hover rounded-xl shadow-sm">
        <h3 className="flex items-center text-text-muted text-xl font-semibold">
          <FaPhone className="text-primary mr-2" />
          Contact Support
        </h3>
        <p className="text-text-muted mt-2">
          📧 Email:{" "}
          <a href="mailto:support@yourdashboard.com" className="text-primary">
            support@yourdashboard.com
          </a>
        </p>
        <p className="text-text-muted">💬 Live Chat: Available in the Help section.</p>
        <p className="text-text-muted">📞 Phone: +1-800-123-4567</p>
      </div>
    </div>
  );
};

export default HelpCenter;
