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
    // Trigger animation shortly after mount
    const timer = setTimeout(() => setAnimate(true), 300);

    const fetchStats = async () => {
      try {
        // Fetch members
        const resMembers = await fetch("/api/members/getMembers/Sales");
        const membersData = await resMembers.json();
        setMemberCount(membersData.length);

        const activeMembers = membersData.filter(member => member.approve === true);
        setActiveCount(activeMembers.length);

        // Fetch invoices
        const resInvoices = await fetch("/api/invoice");
        const invoicesData = await resInvoices.json();

        const paidInvoices = invoicesData.filter(invoice => invoice.status === "Paid");
        const totalRevenue = paidInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
        setRevenue(totalRevenue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();

    return () => clearTimeout(timer);
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
      changeColor: "text-status-success",
      isPercentage: true,
    },
    {
      title: "Total Revenue Generated",
      value: revenue,
      icon: <BarChart className="w-5 h-5 text-status-info" />,
      change: "+12%",
      subtext: "vs last quarter",
      changeColor: "text-status-success",
      isMoney: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
