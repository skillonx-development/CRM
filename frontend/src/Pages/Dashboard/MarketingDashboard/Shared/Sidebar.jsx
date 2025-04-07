"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import {
    LayoutGrid,
    FileText,
    Users,
    BarChart2,
    Megaphone,
    Settings,
    ChevronLeft,
    HelpCircle,
    LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../Assets/logo.png";

function Sidebar({ setActiveTab, collapsed, setCollapsed, userRole }) {
    const { logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { id: "dashboard", icon: LayoutGrid, label: "Overview", path: "/marketing" },
        { id: "proposals", icon: FileText, label: "Proposals", path: "/marketing/proposals" },
        { id: "teachers", icon: Users, label: "Teachers", path: "/marketing/teachers" },
        { id: "feedback", icon: BarChart2, label: "Feedback", path: "/marketing/feedback" },
        { id: "promotion", icon: Megaphone, label: "Promotion", path: "/marketing/promotion" },
        {
            id: "team-management",
            icon: Users,
            label: "Team Management",
            path: "/marketing/team",
            disabled: userRole === "member" // Disable if the user is a member
        },
    ];

    const bottomMenuItems = [
        { id: "settings", icon: Settings, label: "Settings", path: "/marketing/settings" },
        { id: "help", icon: HelpCircle, label: "Help", path: "/marketing/help" },
        { id: "logout", icon: LogOut, label: "Logout" },
    ];

    useEffect(() => {
        const currentTab = [...menuItems, ...bottomMenuItems].find(item => item.path === location.pathname) || menuItems[0];
        setActiveTab(currentTab.id);
    }, [location.pathname, setActiveTab]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <motion.aside
                className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
                animate={{ width: collapsed ? 80 : 256 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
            >
                <div className="p-4 flex items-center justify-between">
                    <div className={`flex items-center ${collapsed ? "justify-center w-full" : "space-x-3"}`}>
                        <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.h1 className="text-xl font-bold text-text"
                                    style={{ fontFamily: 'Morebi Rounded, sans-serif' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}>
                                    Flariex
                                </motion.h1>
                            )}
                        </AnimatePresence>
                    </div>
                    <motion.button
                        onClick={toggleSidebar}
                        className="p-1 rounded-full hover:bg-background-hover transition-colors text-text-muted hover:text-text"
                        animate={{ rotate: collapsed ? 180 : 0 }}
                    >
                        <ChevronLeft size={20} />
                    </motion.button>
                </div>

                <nav className="mt-6">
                    <ul className={`space-y-2 ${collapsed ? "px-2" : "px-4"}`}>
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => !item.disabled && navigate(item.path)}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path || (item.path === "/marketing" && location.pathname === "/")
                                            ? "bg-primary text-white font-semibold shadow-md"
                                            : item.disabled
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-text-muted hover:bg-background-hover"
                                        } ${collapsed ? "justify-center" : ""}`}
                                    title={collapsed ? item.label : ""}
                                    disabled={item.disabled}
                                >
                                    <item.icon className={`h-5 w-5 ${location.pathname === item.path || (item.path === "/marketing" && location.pathname === "/") ? "text-white" : item.disabled ? "text-gray-400" : "text-text-muted"}`} />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-3">
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
                                    className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? "bg-primary text-white font-semibold shadow-md" : "text-text-muted hover:bg-background-hover"
                                        } ${collapsed ? "justify-center" : ""}`}
                                    title={collapsed ? item.label : ""}
                                >
                                    <item.icon className={`h-5 w-5 ${location.pathname === item.path ? "text-white" : "text-text-muted"}`} />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-3">
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
