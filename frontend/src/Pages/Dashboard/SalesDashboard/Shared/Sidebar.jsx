"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import {
    LayoutGrid,
    Users,
    FileText,
    Package,
    CreditCard,
    ChevronLeft,
    Settings,
    HelpCircle,
    LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../Assets/logo.png"; // Ensure the path is correct

function Sidebar({ setActiveTab, collapsed, setCollapsed }) {
    const { logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { id: "overview", icon: LayoutGrid, label: "Overview", path: "/sales" },
        { id: "leads", icon: Users, label: "Leads", path: "/sales/lead" },
        { id: "proposals", icon: FileText, label: "Proposals", path: "/sales/proposals" },
        { id: "orders", icon: Package, label: "Orders", path: "/sales/orders" },
        { id: "billing", icon: CreditCard, label: "Billing", path: "/sales/billing" },
        { id: "Team Management", icon: Users, label: "Team Management", path: "/sales/team" },
    ];

    const bottomMenuItems = [
        { id: "settings", icon: Settings, label: "Settings", path: "/sales/settings" },
        { id: 'help', icon: HelpCircle, label: 'Help', path: "/sales/help" },
        { id: 'logout', icon: LogOut, label: 'Logout' },
    ];

    // Update activeTab based on current route
    useEffect(() => {
        const currentTab = [...menuItems, ...bottomMenuItems].find(item => item.path === location.pathname);
        if (currentTab) {
            setActiveTab(currentTab.id);
        }
    }, [location.pathname, setActiveTab]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const sidebarVariants = {
        expanded: { width: 256, transition: { duration: 0.3, type: "spring", stiffness: 100 } },
        collapsed: { width: 80, transition: { duration: 0.3, type: "spring", stiffness: 100 } }
    };

    const textVariants = {
        visible: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.2 } },
        hidden: { opacity: 0, x: -10, transition: { duration: 0.2 } }
    };

    const toggleButtonVariants = {
        expanded: { rotate: 0, transition: { duration: 0.3 } },
        collapsed: { rotate: 180, transition: { duration: 0.3 } }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <motion.aside
                className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
                initial="expanded"
                animate={collapsed ? "collapsed" : "expanded"}
                variants={sidebarVariants}
            >
                <div className="p-4 flex items-center justify-between">
                    <div className={`flex items-center ${collapsed ? "justify-center w-full" : "space-x-3"}`}>
                        <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.h1 className="text-xl font-bold text-text" style={{ fontFamily: 'Morebi Rounded, sans-serif' }}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    Flariex
                                </motion.h1>
                            )}
                        </AnimatePresence>
                    </div>
                    <motion.button
                        onClick={toggleSidebar}
                        className={`p-1 rounded-full hover:bg-background-hover transition-colors text-text-muted hover:text-text ${collapsed ? "absolute top-4 right-4" : ""}`}
                        variants={toggleButtonVariants}
                    >
                        <ChevronLeft size={20} />
                    </motion.button>
                </div>

                <nav className="mt-6">
                    <ul className={`space-y-2 ${collapsed ? "px-2" : "px-4"}`}>
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? "bg-primary text-text" : "text-text-muted hover:bg-background-hover"
                                        }`}
                                    title={collapsed ? item.label : ""}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span initial="hidden" animate="visible" exit="hidden" variants={textVariants} className="ml-3">
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={`absolute bottom-8 w-full ${collapsed ? "px-2" : "px-4"}`}>
                    <ul className="space-y-2">
                        {bottomMenuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => item.id === 'logout' ? setShowLogoutModal(true) : navigate(item.path)}
                                    className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? "bg-primary text-text" : "text-text-muted hover:bg-background-hover"
                                        }`}
                                    title={collapsed ? item.label : ""}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span initial="hidden" animate="visible" exit="hidden" variants={textVariants} className="ml-3">
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.aside>

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-background-card p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-xl font-bold text-text mb-4">Are you sure you want to logout?</h2>
                        <p className="text-text-muted mb-6">You will be redirected to the landing page.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-300 text-text-muted rounded-md hover:bg-gray-400 hover:text-black transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;
