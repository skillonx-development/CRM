import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { CreditCard, FileText, Package } from "lucide-react";
import axios from "axios";

const AnalyticsOverview = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    proposalsSent: 0,
    completedOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchAnalyticsData = async () => {
    try {
      const [invoiceRes, proposalsRes] = await Promise.all([
        axios.get("https://crm-5qj0.onrender.com/api/invoice"),
        axios.get("https://crm-5qj0.onrender.com/api/tech-proposals"),
      ]);

      const invoices = invoiceRes.data || [];
      const proposals = proposalsRes.data || [];

      // Only sum revenue from invoices with status "Paid"
      const totalRevenue = invoices
        .filter(inv => inv.status === "Paid")
        .reduce((sum, inv) => sum + (inv.amount || 0), 0);

      const proposalsSent = proposals.length;
      const completedOrders = proposals.filter(p => p.status === "Completed").length;

      setData({ totalRevenue, proposalsSent, completedOrders });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching analytics data:", err);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const widgets = [
    {
      title: "Total Revenue",
      value: data.totalRevenue,
      prefix: "₹",
      change: "12.5% from last month",
      positive: true,
      icon: CreditCard,
    },
    {
      title: "Proposals Sent",
      value: data.proposalsSent,
      change: "4.1% from last month",
      positive: true,
      icon: FileText,
    },
    {
      title: "Completed Orders",
      value: data.completedOrders,
      change: "2.3% from last month",
      positive: data.completedOrders >= 0,
      icon: Package,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mt-[-10px]">
      {widgets.map((widget, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="bg-background-card text-text shadow-card border border-border rounded-xl p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-text-muted">{widget.title}</h3>
              <widget.icon className="text-primary" size={18} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-semibold">
                {loading ? (
                  "..."
                ) : (
                  <CountUp
                    start={0}
                    end={widget.value}
                    duration={2}
                    prefix={widget.prefix || ""}
                  />
                )}
              </div>
              <div
                className={`text-xs mt-2 font-medium ${
                  widget.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {widget.positive ? "↑" : "↓"} {widget.change}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsOverview;
