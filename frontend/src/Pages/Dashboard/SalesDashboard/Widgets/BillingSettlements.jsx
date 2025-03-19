import { useState } from "react";
import { FaDownload, FaSearch, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const invoicesData = [
  { id: "INV-2023-001", title: "Tech Institute", amount: 8750, status: "Paid", issued: "Apr 5, 2023", due: "Apr 15, 2023" },
  { id: "INV-2023-003", title: "Creative College", amount: 6800, status: "Paid", issued: "Apr 20, 2023", due: "May 1, 2023" },
  { id: "INV-2023-004", title: "ABC University", amount: 7500, status: "Awaiting Payment", issued: "Apr 25, 2023", due: "May 10, 2023" },
  { id: "INV-2023-006", title: "Innovation College", amount: 5000, status: "Awaiting Payment", issued: "May 15, 2023", due: "May 25, 2023" }
];

const paymentsData = [
  { id: "ORD-2023-001", title: "Tech Institute", amount: 8750, status: "Payment Received", paidOn: "Apr 15, 2023" },
  { id: "ORD-2023-003", title: "Creative College", amount: 6800, status: "Payment Received", paidOn: "May 1, 2023" },
  { id: "ORD-2023-004", title: "ABC University", amount: 7500, status: "Pending", paidOn: "May 10, 2023" }
];

const statusColors = {
  "Paid": "text-status-success",
  "Payment Received": "text-status-success",
  "Awaiting Payment": "text-status-warning",
  "Pending": "text-status-warning"
};

export default function BillingSettlements() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [payments, setPayments] = useState(paymentsData);
  const [searchInvoices, setSearchInvoices] = useState("");
  const [searchPayments, setSearchPayments] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    title: "",
    amount: "",
    issued: "",
    due: "",
    status: "Awaiting Payment"
  });

  const handleSendReminder = (id) => {
    alert(`Reminder sent for Invoice ${id}`);
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.title.toLowerCase().includes(searchInvoices.toLowerCase())
  );

  const filteredPayments = payments.filter(payment => 
    payment.title.toLowerCase().includes(searchPayments.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({
      ...newInvoice,
      [name]: name === "amount" ? parseFloat(value) || "" : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a new unique ID
    const newId = `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`;
    
    // Add new invoice to the list
    const invoiceToAdd = {
      id: newId,
      ...newInvoice
    };
    
    setInvoices([invoiceToAdd, ...invoices]);
    
    // Reset form and close modal
    setNewInvoice({
      title: "",
      amount: "",
      issued: "",
      due: "",
      status: "Awaiting Payment"
    });
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-background-default min-h-screen text-text-default">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Billing & Settlements</h1>
        <button onClick={() => setShowModal(true)} className="bg-primary hover:bg-primary-dark px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> Create New Invoice
        </button>
      </div>
      
      {/* Modal for creating new invoice */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background-card p-6 rounded-2xl shadow-card w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Invoice</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-default">
                <IoClose size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Client Name</label>
                <input
                  type="text"
                  name="title"
                  value={newInvoice.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter client name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  value={newInvoice.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Issue Date</label>
                  <input
                    type="date"
                    name="issued"
                    value={newInvoice.issued}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    name="due"
                    value={newInvoice.due}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark px-4 py-2 rounded text-white"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background-card p-6 rounded-2xl shadow-card">
          <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search payments..." 
              className="w-full p-2 pl-10 border rounded"
              value={searchPayments}
              onChange={(e) => setSearchPayments(e.target.value)}
            />
          </div>
          {filteredPayments.map(payment => (
            <div key={payment.id} className="p-4 border-b border-border-dark">
              <div className="flex justify-between">
                <span>{payment.title}</span>
                <span className="font-bold">${payment.amount}</span>
              </div>
              <p className="text-text-muted text-sm">Paid on {payment.paidOn}</p>
              <p className={`text-sm ${statusColors[payment.status]}`}>{payment.status}</p>
            </div>
          ))}
        </div>
        <div className="bg-background-card p-6 rounded-2xl shadow-card">
          <h2 className="text-xl font-semibold mb-4">Invoices</h2>
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="w-full p-2 pl-10 border rounded"
              value={searchInvoices}
              onChange={(e) => setSearchInvoices(e.target.value)}
            />
          </div>
          {filteredInvoices.map(invoice => (
            <div key={invoice.id} className="p-4 border-b border-border-dark">
              <div className="flex justify-between">
                <span>{invoice.title}</span>
                <span className="font-bold">${invoice.amount}</span>
              </div>
              <p className="text-text-muted text-sm">Issued: {invoice.issued} • Due: {invoice.due}</p>
              <p className={`text-sm ${statusColors[invoice.status]}`}>{invoice.status}</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-gray-700 px-3 py-1 rounded flex items-center gap-2">
                  <FaDownload /> Download
                </button>
                {invoice.status === "Awaiting Payment" && (
                  <button className="bg-status-info px-3 py-1 rounded" onClick={() => handleSendReminder(invoice.id)}>Send Reminder</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}