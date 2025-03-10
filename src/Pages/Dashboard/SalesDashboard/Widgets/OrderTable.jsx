import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Edit, Trash, ChevronLeft, ChevronRight, Download } from "lucide-react";

const initialOrders = [
    { id: "021231", name: "ID Cards", customer: "Leslie Alexander", price: "$21.78", date: "04/17/23", status: "Paid" },
    { id: "021232", name: "IOT", customer: "Leslie Alexander", price: "$21.78", date: "04/17/23", status: "Pending" },
    { id: "021233", name: "English", customer: "Leslie Alexander", price: "$21.78", date: "04/17/23", status: "Paid" },
    { id: "021234", name: "Work Shop", customer: "Leslie Alexander", price: "$21.78", date: "04/17/23", status: "Paid" },
    { id: "021235", name: "Hackathon", customer: "Leslie Alexander", price: "$21.78", date: "04/17/23", status: "Pending" },
];

export default function OrderTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [orders] = useState(initialOrders);

    const filteredOrders = orders.filter(order =>
        order.id.includes(searchQuery) ||
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-background-card text-text rounded-lg border border-border shadow-card">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-2.5 text-text-muted" size={18} />
                    <input 
                        type="text"
                        placeholder="Search for id, name, product" 
                        className="w-full pl-10 pr-3 py-2 bg-background-sidebar border border-border-dark text-text rounded-lg focus:ring-2 focus:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 bg-background-sidebar text-text border border-border-dark rounded-lg hover:bg-background-hover">
                        <Filter className="mr-2" size={16} /> Filter
                    </button>
                    <button className="flex items-center px-4 py-2 bg-background-sidebar text-text border border-border-dark rounded-lg hover:bg-background-hover">
                        <Download className="mr-2" size={16} /> Export
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg">
                <table className="w-full border border-border text-left rounded-lg overflow-hidden">
                    <thead className="bg-background-sidebar text-text-muted">
                        <tr>
                            {['Orders', 'Customer', 'Price', 'Date', 'Payment', 'Action'].map((header, index) => (
                                <th key={index} className="p-3 text-sm uppercase tracking-wide">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <motion.tr 
                                key={index} 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="border-b border-border hover:bg-background-hover transition"
                            >
                                <td className="p-3 text-primary-light">{order.id} <br /> {order.name}</td>
                                <td className="p-3">{order.customer}</td>
                                <td className="p-3">{order.price}</td>
                                <td className="p-3">{order.date}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded ${order.status === "Paid" ? "bg-status-success" : "bg-status-warning text-black"}`}>{order.status}</span>
                                </td>
                                <td className="p-3 flex space-x-2">
                                    <Eye size={18} className="cursor-pointer text-text-muted hover:text-text" />
                                    <Edit size={18} className="cursor-pointer text-text-muted hover:text-text" />
                                    <Trash size={18} className="cursor-pointer text-text-muted hover:text-status-error" />
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4 text-text-muted">
                <span>1 - {filteredOrders.length} of {orders.length} Orders</span>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 bg-background-sidebar text-text border border-border-dark rounded-lg hover:bg-background-hover">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="px-3 py-2 bg-background-sidebar text-text border border-border-dark rounded-lg hover:bg-background-hover">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}