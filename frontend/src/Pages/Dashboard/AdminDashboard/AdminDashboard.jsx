import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "./Widgets/StatCrad";
import RevenueChart from "./Widgets/RevenueChart";
import MonthlyPerformance from "./Widgets/MonthlyPerformance";
import { DollarSign, BookOpen, FileText } from "lucide-react";
import Layout from "./Shared/Layout";
import axios from "axios";

const AdminDashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [workshopsCount, setWorkshopsCount] = useState(0);
  const [pendingProposals, setPendingProposals] = useState(0);
  const [rejectedProposals, setRejectedProposals] = useState(0);

  // Fetch revenue and workshops
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoice data
        const invoiceRes = await axios.get("https://crm-4772.onrender.com/api/invoice");
        const totalRevenue = invoiceRes.data?.reduce(
          (sum, inv) => sum + (inv.amount || 0),
          0
        );
        setRevenue(totalRevenue);

        // Fetch tech proposals
        const proposalsRes = await axios.get("https://crm-4772.onrender.com/api/tech-proposals");
        const proposals = proposalsRes.data || [];

        const completed = proposals.filter(p => p.status === "Completed").length;
        const pending = proposals.filter(p => p.status === "Pending" || p.status === "Accepted").length;
        const rejected = proposals.filter(p => p.status === "Rejected").length;

        setWorkshopsCount(completed);
        setPendingProposals(pending);
        setRejectedProposals(rejected);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  // Animation variants
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
              value={`$${revenue.toLocaleString()}`}
              icon={<DollarSign className="text-primary" />}
              percentChange={12}
              isPositive={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Workshops Completed"
              value={workshopsCount.toString()}
              icon={<BookOpen className="text-primary" />}
              percentChange={8}
              isPositive={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Pending Proposals"
              value={pendingProposals.toString()}
              icon={<FileText className="text-primary" />}
              percentChange={3}
              isPositive={false}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Rejected Proposals"
              value={rejectedProposals.toString()}
              icon={<FileText className="text-primary" />}
              percentChange={5}
              isPositive={false}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <RevenueChart />
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
      </motion.div>
    </Layout>
  );
};

export default AdminDashboard;
