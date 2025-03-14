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
  Accepted: "bg-green-500",
  Pending: "bg-yellow-500",
  Completed: "bg-blue-500",
  Rejected: "bg-red-500"
};

export default function OrderManagement() {
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    title: "", school: "", schedule: "", participants: "", price: "", status: "Pending"
  });

  const handleCreateOrder = () => {
    setOrders([...orders, { id: `ORD-${Date.now()}`, ...newOrder }]);
    setShowForm(false);
    setNewOrder({ title: "", school: "", schedule: "", participants: "", price: "", status: "Pending" });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded" onClick={() => setShowForm(true)}>Create New Order</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gray-800 shadow-lg p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">{order.title}</h2>
                <span className={`text-xs text-white px-3 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
              </div>
              <p className="text-sm text-gray-400">{order.school}</p>
              <p className="text-sm text-gray-400">Schedule: {order.schedule}</p>
              <p className="text-sm text-gray-400">Participants: {order.participants}</p>
              <p className="text-lg font-bold mt-2">${order.price}</p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 mt-4 px-4 py-2 rounded">Manage Order</button>
            </div>
          </motion.div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Order</h2>
            <input placeholder="Title" className="w-full p-2 mb-2 bg-gray-700 rounded" value={newOrder.title} onChange={e => setNewOrder({ ...newOrder, title: e.target.value })} />
            <input placeholder="School" className="w-full p-2 mb-2 bg-gray-700 rounded" value={newOrder.school} onChange={e => setNewOrder({ ...newOrder, school: e.target.value })} />
            <input placeholder="Schedule" className="w-full p-2 mb-2 bg-gray-700 rounded" value={newOrder.schedule} onChange={e => setNewOrder({ ...newOrder, schedule: e.target.value })} />
            <input placeholder="Participants" type="number" className="w-full p-2 mb-2 bg-gray-700 rounded" value={newOrder.participants} onChange={e => setNewOrder({ ...newOrder, participants: e.target.value })} />
            <input placeholder="Price" type="number" className="w-full p-2 mb-2 bg-gray-700 rounded" value={newOrder.price} onChange={e => setNewOrder({ ...newOrder, price: e.target.value })} />
            <div className="flex justify-between mt-4">
              <button className="bg-gray-600 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded" onClick={handleCreateOrder}>Create</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
