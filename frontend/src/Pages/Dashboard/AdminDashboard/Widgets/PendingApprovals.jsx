import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, FileText, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const PendingApprovals = () => {
  const [approvals, setApprovals] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [badgeStatus, setBadgeStatus] = useState({});

  const fetchApprovals = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://crm-r5rr.onrender.com/api/tech-proposals/sent');
      const acceptedApprovals = response.data;

      const newBadgeStatus = { ...badgeStatus };
      acceptedApprovals.forEach((item) => {
        // Use adminApproval field instead of adminApproved
        if (item.adminApproval === true) {
          newBadgeStatus[item._id] = 'Approved';
        } else if (item.adminApproval === false) {
          newBadgeStatus[item._id] = 'Disapproved';
        } else {
          newBadgeStatus[item._id] = 'Pending';
        }
      });

      setBadgeStatus(newBadgeStatus);
      setApprovals(acceptedApprovals);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
    const intervalId = setInterval(fetchApprovals, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAdminApproval = async (approved) => {
    if (!selectedApproval) return;

    try {
      await axios.put(
        `https://crm-r5rr.onrender.com/api/tech-proposals/${selectedApproval._id}/admin-approval`,
        { adminApproval: approved }
      );

      setBadgeStatus((prev) => ({
        ...prev,
        [selectedApproval._id]: approved ? 'Approved' : 'Disapproved',
      }));

      setApprovals((prevApprovals) =>
        prevApprovals.map((approval) =>
          approval._id === selectedApproval._id
            ? { ...approval, adminApproval: approved } // Update adminApproval instead of adminApproved
            : approval
        )
      );

      setSelectedApproval(null);
      alert(`Proposal ${approved ? 'approved' : 'disapproved'} successfully.`);

      setTimeout(() => {
        fetchApprovals();
      }, 2000);
    } catch (error) {
      console.error('Error updating admin approval:', error);
      alert('Failed to update approval. Please try again.');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: {
      boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.01, transition: { duration: 0.2 } },
    tap: { scale: 0.97 },
  };

  return (
    <>
      <motion.div
        className="bg-background-card rounded-lg p-6 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <h3 className="text-white text-xl font-semibold mb-6 flex items-center">
          <FileText className="mr-2 text-purple-400" size={20} />
          Accepted Proposals
          {isLoading && <span className="ml-2 text-sm text-gray-400">(Loading...)</span>}
        </h3>

        <div className="space-y-5">
          {approvals.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              {isLoading ? 'Loading approvals...' : 'No pending approvals available'}
            </p>
          ) : (
            approvals.map((approval, index) => {
              const badgeStatusText = badgeStatus[approval._id] || 'Pending';

              return (
                <motion.div
                  key={approval._id}
                  className="border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover="hover"
                  variants={cardVariants}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-medium text-lg">{approval.title}</h4>
                      <p className="text-gray-400 text-sm">{approval.institution}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="bg-green-900/30 text-green-400 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                        <Check size={12} className="mr-1" />
                        {approval.status}
                      </div>
                      <div
                        className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${badgeStatusText === 'Approved'
                          ? 'bg-blue-900/30 text-blue-400'
                          : badgeStatusText === 'Disapproved'
                            ? 'bg-red-900/30 text-red-400'
                            : 'bg-yellow-900/30 text-yellow-400'
                          }`}
                      >
                        {badgeStatusText === 'Approved' ? (
                          <Check size={12} className="mr-1" />
                        ) : badgeStatusText === 'Disapproved' ? (
                          <X size={12} className="mr-1" />
                        ) : (
                          <AlertTriangle size={12} className="mr-1" />
                        )}
                        {badgeStatusText}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-gray-400 text-xs">Amount</p>
                      <p className="text-white font-medium">₹{approval.price?.toLocaleString() || '0'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Scheduled Date</p>
                      <p className="text-white font-medium">{approval.scheduledDate || 'N/A'}</p>
                    </div>
                  </div>

                  <motion.button
                    className="w-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 py-2 rounded-md flex items-center justify-center transition-colors"
                    onClick={() => setSelectedApproval(approval)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    View Details
                  </motion.button>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedApproval && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedApproval(null)}
          >
            <motion.div
              className="bg-background-card rounded-lg p-8 w-full max-w-md relative shadow-xl mx-4 lg:mx-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-xl font-bold">{selectedApproval.title}</h3>
                <motion.button
                  className="text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-1"
                  onClick={() => setSelectedApproval(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="space-y-6">
                <p className="text-white text-lg font-semibold">{selectedApproval.institution}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Type</p>
                    <p className="text-white font-medium">{selectedApproval.type || 'Proposal'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Department</p>
                    <p className="text-white font-medium">{selectedApproval.department || 'Tech'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white font-medium text-lg">
                      ₹{selectedApproval.price?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <div className="bg-green-900/30 text-green-400 text-xs font-medium px-2 py-1 rounded-full inline-flex items-center mt-1">
                      <Check size={12} className="mr-1" />
                      {selectedApproval.status}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="text-gray-400 text-sm mr-2">Admin Status:</p>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center ${badgeStatus[selectedApproval._id] === 'Approved'
                      ? 'bg-blue-900/30 text-blue-400'
                      : badgeStatus[selectedApproval._id] === 'Disapproved'
                        ? 'bg-red-900/30 text-red-400'
                        : 'bg-yellow-900/30 text-yellow-400'
                      }`}
                  >
                    {badgeStatus[selectedApproval._id] === 'Approved' ? (
                      <Check size={12} className="mr-1" />
                    ) : badgeStatus[selectedApproval._id] === 'Disapproved' ? (
                      <X size={12} className="mr-1" />
                    ) : (
                      <AlertTriangle size={12} className="mr-1" />
                    )}
                    {badgeStatus[selectedApproval._id]}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    className="w-full bg-green-700/20 hover:bg-green-700/40 text-green-400 py-2 rounded-md"
                    onClick={() => handleAdminApproval(true)}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    className="w-full bg-red-700/20 hover:bg-red-700/40 text-red-400 py-2 rounded-md"
                    onClick={() => handleAdminApproval(false)}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    Disapprove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PendingApprovals;