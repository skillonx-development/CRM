import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpDown, PlusCircle, X } from "lucide-react";
import axios from "axios";

export default function ProposalEnhancement() {
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const res = await axios.get("https://crm-4xul.onrender.com/api/tech-proposals");
      setWorkshops(res.data);
    } catch (err) {
      console.error("Error fetching proposals:", err);
    }
  };

  const getStatusColor = (institution) => {
    switch (institution?.toLowerCase()) {
      case "nie mysuru":
        return "text-status-purple";
      case "nie":
        return "text-status-green";
      default:
        return "text-gray-400";
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
  const handleSendClick = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowDialog(true);
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleDialogSend = async () => {
    if (!selectedWorkshop) return;

    const formData = new FormData();
    formData.append("sent", true);
    if (file) formData.append("mou", file);

    try {
      await axios.patch(
        `https://crm-4xul.onrender.com/api/tech-proposals/send/${selectedWorkshop._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchWorkshops(); // Refresh proposals
      setShowDialog(false);
      setFile(null);
    } catch (err) {
      console.error("Error sending proposal:", err);
      alert("Failed to send proposal. Please try again.");
    }
  };

  const filteredWorkshops = workshops.filter(
    (w) =>
      w.title.toLowerCase().includes(searchQuery) ||
      w.institution.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-6 bg-background rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text">Proposal Enhancement</h1>
          <p className="text-text-muted text-base">
            Enhance workshop proposals with research and value additions.
          </p>
        </div>

      </div>

      {/* Search & Sort */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 text-text-muted" size={18} />
          <input
            type="text"
            placeholder="Search proposals..."
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base text-text bg-background-muted"
          />
        </div>
       
      </div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop, index) => (
            <motion.div
              key={index}
              className="bg-background-card border border-border rounded-2xl p-4 shadow-card"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-text">{workshop.title}</h3>
                <span
                  className={`text-sm font-medium ${getStatusColor(
                    workshop.institution
                  )} bg-background-pill px-3 py-1 rounded-full`}
                >
                  {workshop.institution}
                </span>
              </div>
              <p className="text-base text-text-muted">💰 ₹{workshop.price}</p>
              <p className="text-base text-text-muted mt-1">📅 {workshop.scheduledDate}</p>
              <p className="text-base text-text-muted">⏰ {workshop.scheduledTime}</p>
              {workshop.sent ? (
                <p className="text-green-600 font-medium mt-3">✅ Sales</p>
              ) : (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleSendClick(workshop)}
                    className="px-4 py-2 text-sm font-medium text-text border border-border rounded-lg hover:bg-background-hover transition"
                  >
                    Send
                  </button>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-text-muted col-span-2">No proposals found.</p>
        )}
      </motion.div>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background-card text-text rounded-xl shadow-lg p-6 w-full max-w-md relative border border-border">
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-3 right-3 text-text-muted hover:text-text"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Send to Sales</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-muted mb-1">
                MOU (optional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background-muted text-text file:text-sm file:mr-4 file:py-1 file:px-2 file:border-0 file:bg-primary file:text-white hover:file:bg-primary-dark transition"
              />
            </div>
            <button
              onClick={handleDialogSend}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
