import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Star,
    Users,
    FileText,
    ChevronLeft,
    Settings,
    HelpCircle,
    LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/Tech" },
        { id: "projects", icon: Star, label: "Projects", path: "/projects" },
        { id: "teams", icon: Users, label: "Teams", path: "/teams" },
        { id: "report", icon: FileText, label: "Report", path: "/report" },
    ];
    const bottomMenuItems = [
        { id: "settings", icon: Settings, label: "Settings", path: "/settings1" },
        { id: 'help', icon: HelpCircle, label: 'Help', path: "/help" },
        { id: 'logout', icon: LogOut, label: 'Logout', path: "/logout" },
    ];

    // Set active tab based on route
    useEffect(() => {
        const currentTab = menuItems.concat(bottomMenuItems).find((item) => item.path === location.pathname);
        if (currentTab) {
            setActiveTab(currentTab.id);
        } else {
            setActiveTab("dashboard"); // Default to dashboard
        }
    }, [location.pathname, setActiveTab]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <motion.aside
            className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
            animate={{ width: collapsed ? 80 : 256 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        >
            {/* Sidebar Header */}
            <div className="p-6 flex items-center justify-between">
                <AnimatePresence>
                    {!collapsed && (
                        <motion.h1 className="text-xl font-bold text-text" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                            John Carter
                        </motion.h1>
                    )}
                </AnimatePresence>
                <motion.button
                    onClick={toggleSidebar}
                    className="p-1 rounded-full hover:bg-background-hover transition-colors text-text-muted hover:text-text"
                    animate={{ rotate: collapsed ? 180 : 0 }}
                >
                    <ChevronLeft size={20} />
                </motion.button>
            </div>

            {/* Main Navigation */}
            <nav className="mt-6">
                <ul className={`space-y-2 ${collapsed ? "px-2" : "px-4"}`}>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => navigate(item.path)}
                                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                                    activeTab === item.id ? "bg-primary text-white" : "text-text-muted hover:bg-background-hover"
                                } ${collapsed ? "justify-center" : ""}`}
                                title={collapsed ? item.label : ""}
                            >
                                <item.icon className="h-5 w-5" />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span className="ml-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom Navigation */}
            <div className={`absolute bottom-8 w-full ${collapsed ? "px-2" : "px-4"}`}>
                <ul className="space-y-2">
                    {bottomMenuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => item.path && navigate(item.path)}
                                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                                    activeTab === item.id ? "bg-primary text-white" : "text-text-muted hover:bg-background-hover"
                                } ${collapsed ? "justify-center" : ""}`}
                                title={collapsed ? item.label : ""}
                            >
                                <item.icon className="h-5 w-5" />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span className="ml-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
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
    );
}

export default Sidebar;
