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
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/tech" },
        { id: "projects", icon: Star, label: "Projects", path: "/projects" },
        { id: "teams", icon: Users, label: "Teams", path: "/teams" },
        { id: "report", icon: FileText, label: "Report", path: "/report" },
    ];
    const bottomMenuItems = [
        { id: "settings", icon: Settings, label: "Settings", path: "/settings1" },
        { id: 'help', icon: HelpCircle, label: 'Help', path: "/help1" },
        { id: 'logout', icon: LogOut, label: 'Logout', path: "/logout" },
    ];

    // Update activeTab based on current route
    useEffect(() => {
        const currentTab = menuItems.concat(bottomMenuItems).find((item) => item.path === location.pathname);
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
        collapsed: { rotate: 180, transition: {duration: 0.3 }}
    };

    return (
        <motion.aside
            className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
            initial="expanded"
            animate={collapsed ? "collapsed" : "expanded"}
            variants={sidebarVariants}
        >
            <div className="p-4 flex items-center justify-between">
    <div className={`flex items-center ${collapsed ? "justify-center w-full" : "space-x-3"}`}>
        <img src="./src/Pages/Dashboard/SalesDashboard/Assets/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <AnimatePresence>
            {!collapsed && (
                <motion.h1 className="text-xl font-bold text-text" initial="hidden" animate="visible" exit="hidden" variants={textVariants}>
                    SkillonX
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
                                className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path ? "bg-primary text-text" : "text-text-muted hover:bg-background-hover"
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
                                onClick={() => navigate(item.path)}
                                className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path ? "bg-primary text-text" : "text-text-muted hover:bg-background-hover"
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
    );
}

export default Sidebar;