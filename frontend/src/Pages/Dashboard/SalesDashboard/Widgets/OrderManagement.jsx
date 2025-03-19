import { useState } from "react";
import { motion } from "framer-motion";

const ordersData = [
  { id: "ORD-2023-001", title: "AI & Machine Learning", status: "Accepted", school: "Tech Institute", schedule: "Apr 10 - Apr 14", participants: 35, price: 8750 },
  { id: "ORD-2023-002", title: "Web Development", status: "Pending", school: "Digital Academy", schedule: "Apr 18 - Apr 20", participants: 28, price: 5600 },
  { id: "ORD-2023-003", title: "UI/UX Design", status: "Completed", school: "Creative College", schedule: "Apr 25 - Apr 29", participants: 22, price: 6600 },
  { id: "ORD-2023-004", title: "React & Redux", status: "Accepted", school: "ABC University", schedule: "May 2 - May 5", participants: 30, price: 7500 },
  { id: "ORD-2023-005", title: "Cloud Computing", status: "Rejected", school: "Future Tech", schedule: "May 15 - May 18", participants: 0, price: 0 },
  { id: "ORD-2023-006", title: "Blockchain Fundamentals", status: "Pending", school: "Innovation College", schedule: "May 22 - May 24", participants: 25, price: 5000 }
];

const statusColors = {
  Accepted: "bg-status-success",
  Pending: "bg-status-warning",
  Completed: "bg-status-info",
  Rejected: "bg-status-error"
};

const filters = ["All", "Pending", "Accepted", "Completed", "Rejected"];

export default function OrderManagement() {
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [newOrder, setNewOrder] = useState({
    title: "", school: "", schedule: "", participants: "", price: "", status: "Pending"
  });

  const handleCreateOrder = () => {
    setOrders([...orders, { id: `ORD-${Date.now()}`, ...newOrder }]);
    setShowForm(false);
    setNewOrder({ title: "", school: "", schedule: "", participants: "", price: "", status: "Pending" });
  };

  const handleManageOrder = (order) => {
    console.log("Managing order:", order);
  };

  const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="p-6 bg-background min-h-screen text-text">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <button className="bg-primary hover:bg-primary-dark px-4 py-2 rounded text-white" onClick={() => setShowForm(true)}>Create New Order</button>
      </div>
      <div className="mb-4 flex space-x-2">
        {filters.map((status) => (
          <button key={status} className={`px-4 py-2 rounded ${filter === status ? "bg-primary text-white" : "bg-background-hover"}`} onClick={() => setFilter(status)}>
            {status}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredOrders.map(order => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-background-card shadow-card p-4 rounded-lg border border-border">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-text">{order.title}</h2>
                <span className={`text-xs text-white px-3 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
              </div>
              <p className="text-sm text-text-muted">{order.school}</p>
              <div className="flex justify-between bg-background-hover p-2 rounded-lg mt-2">
                <p className="text-sm text-text">📅 {order.schedule}</p>
                <p className="text-sm text-text">👥 {order.participants} students</p>
              </div>
              <p className="text-lg font-bold mt-3 text-text">${order.price}</p>
              <button className="w-full bg-primary hover:bg-primary-dark mt-4 px-4 py-2 rounded text-white" onClick={() => handleManageOrder(order)}>Manage Order</button>
            </div>
          </motion.div>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-background-card p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-text">Create New Order</h2>
            <input placeholder="Title" className="w-full p-2 mb-2 bg-background-hover rounded text-text" value={newOrder.title} onChange={e => setNewOrder({ ...newOrder, title: e.target.value })} />
            <input placeholder="School" className="w-full p-2 mb-2 bg-background-hover rounded text-text" value={newOrder.school} onChange={e => setNewOrder({ ...newOrder, school: e.target.value })} />
            <input placeholder="Schedule" className="w-full p-2 mb-2 bg-background-hover rounded text-text" value={newOrder.schedule} onChange={e => setNewOrder({ ...newOrder, schedule: e.target.value })} />
            <input placeholder="Participants" type="number" className="w-full p-2 mb-2 bg-background-hover rounded text-text" value={newOrder.participants} onChange={e => setNewOrder({ ...newOrder, participants: e.target.value })} />
            <input placeholder="Price" type="number" className="w-full p-2 mb-2 bg-background-hover rounded text-text" value={newOrder.price} onChange={e => setNewOrder({ ...newOrder, price: e.target.value })} />
            <div className="flex justify-between mt-4">
              <button className="bg-border px-4 py-2 rounded text-white" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="bg-primary hover:bg-primary-dark px-4 py-2 rounded text-white" onClick={handleCreateOrder}>Create</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
