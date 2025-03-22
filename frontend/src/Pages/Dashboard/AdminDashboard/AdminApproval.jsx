import React, { useState } from 'react';
import PendingApprovals from './Widgets/PendingApprovals';
import Layout from './Shared/Layout';
import { motion } from 'framer-motion';

const AdminApproval = () => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };
    
  return (
    <Layout>
          <motion.div
              variants={itemVariants}
              transition={{ type: "spring", stiffness: 300 }}
          >
              <PendingApprovals />
          </motion.div>
    </Layout>
  );
};

export default AdminApproval;
