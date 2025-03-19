import React from 'react'
import Layout from './Shared/Layout';
import { motion } from 'framer-motion';
import Notifications from './Widgets/Notifications';


const AdminNotifications = () => {
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
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
          >
              <Notifications />
          </motion.div>
      </Layout>
  )
}

export default AdminNotifications