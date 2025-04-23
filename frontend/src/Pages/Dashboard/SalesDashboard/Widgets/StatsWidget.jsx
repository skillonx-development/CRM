import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Users, BarChart } from "lucide-react";

const StatsWidget = () => {
  const [animate, setAnimate] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);

    const fetchMembers = async () => {
      try {
        const res = await fetch("https://crm-4xul.onrender.com/api/members/getMembers/Tech");
        const data = await res.json();
        setMemberCount(data.length);

        const activeMembers = data.filter((member) => member.status === "approved");
        setActiveCount(activeMembers.length);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    const fetchInvoices = async () => {
      try {
        const res = await fetch("https://crm-4xul.onrender.com/api/invoice");
        const data = await res.json();
        const paidInvoices = data.filter((invoice) => invoice.status === "Paid");
        const totalRevenue = paidInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
        setRevenue(totalRevenue);
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
    };

    fetchMembers();
    fetchInvoices();
  }, []);

  const stats = [
    {
      title: "Total Team Members",
      value: memberCount,
      icon: <Users className="w-5 h-5 text-status-info" />,
      change: "+8%",
      subtext: "vs last month",
      changeColor: "text-status-success",
    },
    {
      title: "Active Members",
      value: activeCount,
      icon: <Users className="w-5 h-5 text-status-info" />,
      change: "+5%",
      subtext: "vs last month",
      isPercentage: true,
      changeColor: "text-status-success",
    },
    {
      title: "Total Revenue Generated",
      value: revenue,
      icon: <BarChart className="w-5 h-5 text-status-info" />,
      change: "+12%",
      subtext: "vs last quarter",
      isMoney: true,
      changeColor: "text-status-success",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="p-4 rounded-2xl bg-background-card shadow-card"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-text-muted">
              {stat.icon}
              <span className="text-sm">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold text-text-default">
              {animate && (
                <CountUp
                  end={stat.value}
                  duration={2}
                  separator=","
                  prefix={stat.isMoney ? "₹" : ""}
                  suffix={stat.isPercentage ? "%" : ""}
                />
              )}
            </div>
            <div className={`text-xs font-medium ${stat.changeColor}`}>
              {stat.change} <span className="text-text-muted">{stat.subtext}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsWidget;
