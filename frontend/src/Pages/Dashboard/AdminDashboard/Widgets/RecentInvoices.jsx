import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, ExternalLink, Send, X } from 'lucide-react';
import axios from 'axios';

const RecentInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [sendingReminder, setSendingReminder] = useState(null); // New state

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('https://crm-r5rr.onrender.com/api/invoice');
        setInvoices(res.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (selectedInvoice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedInvoice]);

  const handleSendReminder = async (invoice) => {
    const confirmed = window.confirm('Are you sure you want to send a reminder email?');
    if (!confirmed) return;

    if (!invoice.email || !invoice.title) {
      alert('Missing client email or title. Cannot send reminder.');
      return;
    }

    try {
      setSendingReminder(invoice._id);
      const res = await axios.post('https://crm-r5rr.onrender.com/api/invoice/sendReminder', {
        email: invoice.email,
        subject: `Reminder: Invoice #${invoice._id} is pending`,
        message: `Dear ${invoice.title},<br/><br/>This is a friendly reminder that Invoice #${invoice._id} with client name ${invoice.title} for amount ₹${invoice.amount} is still pending. Please make the payment at your earliest convenience.<br/><br/>Thank you!`,
      });
      alert(res.data.message);
    } catch (error) {
      console.error('Failed to send reminder:', error);
      alert('Failed to send reminder email.');
    } finally {
      setSendingReminder(null);
    }
  };

  return (
    <>
      <motion.div
        className="bg-background-card rounded-lg p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        whileHover={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.3)' }}
      >
        <h3 className="text-white text-xl font-semibold mb-4">Recent Invoices</h3>

        {loading ? (
          <div className="text-gray-400">Loading invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="text-gray-400">No invoices found.</div>
        ) : (
          <div className="space-y-6">
            {invoices.map((invoice, idx) => (
              <motion.div
                key={invoice._id || idx}
                className="border-b border-gray-700 pb-6 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-white font-medium">{invoice.title}</h4>
                    <p className="text-gray-400 text-sm">Invoice #{invoice._id}</p>
                  </div>
                  {invoice.status === 'Pending' ? (
                    <div className="bg-amber-900/30 text-amber-500 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      <Clock size={12} className="mr-1" />
                      {invoice.status}
                    </div>
                  ) : (
                    <div className="bg-blue-600 text-white-500 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {invoice.status}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-white">
                    ₹{invoice.amount?.toLocaleString()}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <Clock size={14} className="mr-1" />
                    Due: {invoice.due}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    className="flex-1 bg-gray-700/50 hover:bg-gray-700/70 text-white py-2 rounded-md flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedInvoice(invoice)}
                  >
                    <ExternalLink size={16} className="mr-1" />
                    View Details
                  </motion.button>
                  <motion.button
                    className={`flex-1 py-2 rounded-md flex items-center justify-center ${sendingReminder === invoice._id
                      ? 'bg-purple-500/10 text-purple-300 cursor-not-allowed'
                      : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400'
                      }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSendReminder(invoice)}
                    disabled={sendingReminder === invoice._id}
                  >
                    <Send size={16} className="mr-1" />
                    {sendingReminder === invoice._id ? 'Sending...' : 'Send Reminder'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={(e) => {
              // Close modal when clicking on backdrop
              if (e.target === e.currentTarget) {
                setSelectedInvoice(null);
              }
            }}
          >
            <motion.div
              className="bg-background-card p-6 rounded-xl w-[90%] max-w-md shadow-lg relative mx-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
            >
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-1"
              >
                <X size={20} />
              </button>
              <h4 className="text-white text-lg font-semibold mb-2">{selectedInvoice.title}</h4>
              <p className="text-gray-400 text-sm mb-4">Invoice #{selectedInvoice._id}</p>

              <div className="space-y-2 text-gray-300">
                <p><span className="text-gray-400">Client:</span> {selectedInvoice.title}</p>
                <p><span className="text-gray-400">Amount:</span> ₹{selectedInvoice.amount?.toLocaleString()}</p>
                <p><span className="text-gray-400">Due Date:</span> {selectedInvoice.due}</p>
                <p><span className="text-gray-400">Status:</span> {selectedInvoice.status}</p>
                {selectedInvoice.notes && <p><span className="text-gray-400">Notes:</span> {selectedInvoice.notes}</p>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecentInvoices;