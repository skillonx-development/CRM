import React from 'react';
import { motion } from 'framer-motion';
import ManageTeam from './Widgets/ManageTeam';
import Layout from './Shared/Layout';

const AdminTeamManage = () => {
    return (
        <Layout>
            <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <ManageTeam />
            </motion.div>
        </Layout>
    );
};

export default AdminTeamManage;