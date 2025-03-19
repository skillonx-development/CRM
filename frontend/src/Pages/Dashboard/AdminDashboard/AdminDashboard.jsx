import React from "react";
import { motion } from "framer-motion";
import StatCard from "./Widgets/StatCrad";
import RevenueChart from "./Widgets/RevenueChart";
import WorkshopDistribution from "./Widgets/WorkshopDistribution";
import MonthlyPerformance from "./Widgets/MonthlyPerformance";
import FeedbackAnalysis from "./Widgets/FeedbackAnalysis";
import { DollarSign, BookOpen, FileText, Users } from "lucide-react";
import Layout from "./Shared/Layout";

const AdminDashboard = () => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Item animation variants
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
        className="p-6 bg-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-2xl font-bold mb-6 text-text"
          variants={itemVariants}
        >
          Dashboard Overview
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Revenue"
              value="$143,500"
              icon={<DollarSign className="text-primary" />}
              percentChange={12}
              isPositive={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Workshops Completed"
              value="57"
              icon={<BookOpen className="text-primary" />}
              percentChange={8}
              isPositive={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Pending Proposals"
              value="14"
              icon={<FileText className="text-primary" />}
              percentChange={3}
              isPositive={false}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Workshop Participants"
              value="1,248"
              icon={<Users className="text-primary" />}
              percentChange={15}
              isPositive={true}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <RevenueChart />
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <WorkshopDistribution />
          </motion.div>
        </motion.div>

          <motion.div
          className="mt-6"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MonthlyPerformance />
          </motion.div>

        <motion.div
          className="mt-6"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FeedbackAnalysis />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default AdminDashboard;