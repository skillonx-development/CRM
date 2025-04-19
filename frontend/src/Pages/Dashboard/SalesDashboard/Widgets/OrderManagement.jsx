import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const statusColors = {
  Accepted: "bg-green-500",
  Pending: "bg-yellow-500",
  Rejected: "bg-red-500",
  Sent: "bg-blue-500",
  Completed: "bg-emerald-600" // ✅ new status color
};

const statusOptions = ["Pending", "Sent", "Accepted", "Rejected", "Completed"]; // ✅ added "Completed"
const filters = ["All", ...statusOptions];

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [isSending, setIsSending] = useState(false);


  useEffect(() => {
    fetchSentProposals();
  }, []);

  const fetchSentProposals = async () => {
    try {
      const res = await axios.get("https://crm-r11b.onrender.com/api/tech-proposals/sent");
      const mapped = res.data.map((p) => ({
        id: p._id,
        title: p.title,
        status: p.status || "Pending",
        school: p.institution,
        collegeEmail: p.collegeEmail,
        schedule: p.scheduledDate || "N/A",
        price: p.price || 0,
        participants: p.expectedParticipants || 0
      }));
      setOrders(mapped);
    } catch (err) {
      console.error("Error fetching sent proposals:", err);
    }
  };

  const handleManageOrder = (order) => {
    setSelectedOrder(order);
    setEditData(order); // Set initial form data
    setIsModalOpen(true);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put(`https://crm-r11b.onrender.com/api/tech-proposals/${editData.id}`, {
        title: editData.title,
        status: editData.status,
        institution: editData.school,
        scheduledDate: editData.schedule,
        price: editData.price,
      });
      setIsModalOpen(false);
      fetchSentProposals();
      alert("Proposal updated successfully.");
    } catch (err) {
      console.error("Failed to update proposal:", err);
      alert("Failed to update proposal.");
    }
  };

  const sendEmail = async (order) => {
    try {
      setIsSending(true); // 🔄 Start sending
  
      await axios.put(`https://crm-r11b.onrender.com/api/tech-proposals/${order.id}`, {
        title: order.title,
        status: "Sent",
        institution: order.school,
        scheduledDate: order.schedule,
        price: order.price,
      });
  
      await axios.post(`https://crm-r11b.onrender.com/api/tech-proposals/send-email/${order.id}`);
  
      alert(`Email sent and status updated to 'Sent' for: ${order.title}`);
      fetchSentProposals();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email.");
    } finally {
      setIsSending(false); // ✅ Reset state
    }
  };
  

  const filteredOrders = orders.filter(order =>
    filter === "All" ? true : order.status === filter
  );

  return (
    <div className="p-6 bg-background min-h-screen text-text">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
      </div>

      <div className="mb-6 flex gap-2 flex-wrap">
        {filters.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl border shadow-sm text-sm transition ${
              filter === status
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredOrders.map(order => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-card border border-border shadow-md p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">{order.title}</h2>
                <span className={`text-xs text-white px-3 py-1 rounded-full ${statusColors[order.status] || "bg-gray-400"}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{order.school}</p>
              <p className="text-sm text-text-muted">{order.collegeEmail}</p>
              <div className="mt-2 text-sm bg-muted p-2 rounded-xl">
                📅 <span className="text-foreground">{order.schedule}</span>
              </div>
              <p className="text-xl font-bold mt-4 text-primary">₹{order.price}</p>
              {order.status === "Completed" && (
                <p className="text-xs mt-2 text-emerald-600 font-semibold">✅ This order is completed</p>
              )}
              <button
                className="w-full mt-4 bg-primary hover:bg-primary-dark px-4 py-2 rounded-xl text-white font-medium transition"
                onClick={() => handleManageOrder(order)}
              >
                Manage Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-background-card p-6 rounded-2xl shadow-xl w-full max-w-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-xl font-bold mb-4">Edit Proposal</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-xl bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-xl bg-background"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Institution</label>
                  <input
                    type="text"
                    value={editData.school}
                    onChange={(e) => handleChange("school", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-xl bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Scheduled Date</label>
                  <input
                    type="date"
                    value={editData.schedule}
                    onChange={(e) => handleChange("schedule", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-xl bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Price</label>
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="w-full p-2 mt-1 border rounded-xl bg-background"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-muted px-4 py-2 rounded-xl text-muted-foreground hover:bg-muted/70"
                >
                  Cancel
                </button>
                <button
  onClick={() => sendEmail(editData)}
  disabled={isSending}
  className={`px-4 py-2 rounded-xl text-white ${
    isSending ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
  }`}
>
  {isSending ? "Sending..." : "Send Email"}
</button>

                <button
                  onClick={saveChanges}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
