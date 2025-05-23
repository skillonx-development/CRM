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
import logo from "../Assets/logo.png";

function Sidebar({ setActiveTab, collapsed, setCollapsed }) {
    const { logout, user, loading } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [permissions, setPermissions] = useState({});
    const [menuItems, setMenuItems] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const baseMenuItems = [
        { id: "overview", icon: LayoutGrid, label: "Overview", path: "/sales", permissionKey: "overview" },
        { id: "proposals", icon: FileText, label: "Proposals", path: "/sales/proposals", permissionKey: "proposals" },
        { id: "order", icon: Package, label: "Orders", path: "/sales/orders", permissionKey: "orders" },
        { id: "billing", icon: CreditCard, label: "Billing", path: "/sales/billing", permissionKey: "billing" },
        { id: "manageData", icon: FileText, label: "Manage Data", path: "/sales/manage-data", permissionKey: "manage-data" },
        { id: "team-management", icon: Users, label: "Team Management", path: "/sales/team", permissionKey: "team-management" },
    ];

    const bottomMenuItems = [
        { id: "settings", icon: Settings, label: "Settings", path: "/sales/settings" },
        { id: "help", icon: HelpCircle, label: "Help", path: "/sales/help" },
        { id: "logout", icon: LogOut, label: "Logout" },
    ];

    // Initial data loading from localStorage
    useEffect(() => {
        const initializeSidebar = async () => {
            try {
                const cachedUser = JSON.parse(localStorage.getItem("user"));
                if (!cachedUser) return;

                const userRole = cachedUser.userRole;
                const filtered = userRole === "lead"
                    ? baseMenuItems
                    : baseMenuItems.filter(item => item.id !== "team-management");

                setMenuItems(filtered);
                setIsInitialized(true);

                if (cachedUser._id && cachedUser.team) {
                    const res = await fetch(`/api/members/getPermissions/${cachedUser.team}/${cachedUser._id}`);
                    const data = await res.json();
                    setPermissions(data.permissions || {});
                }
            } catch (error) {
                console.error("Error initializing sidebar:", error);
                setMenuItems(baseMenuItems.filter(item => item.id !== "team-management"));
                setIsInitialized(true);
            }
        };
        initializeSidebar();
    }, []);

    // On user state update
    useEffect(() => {
        if (!loading && user) {
            const userRole = user.userRole;
            const filtered = userRole === "lead"
                ? baseMenuItems
                : baseMenuItems.filter(item => item.id !== "team-management");

            setMenuItems(filtered);
            setIsInitialized(true);
        }
    }, [user, loading]);

    // Set active tab based on route
    useEffect(() => {
        if (menuItems.length > 0) {
            const allItems = [...menuItems, ...bottomMenuItems];
            const currentTab = allItems.find(item => item.path === location.pathname);
            if (currentTab) {
                setActiveTab(currentTab.id);
            }
        }
    }, [location.pathname, menuItems, setActiveTab]);

    const toggleSidebar = () => setCollapsed(!collapsed);

    const handleLogout = () => {
        logout();
        setActiveTab("logout");
        navigate("/");
    };

    const sidebarVariants = {
        expanded: { width: 256, transition: { duration: 0.3, type: "spring", stiffness: 100 } },
        collapsed: { width: 80, transition: { duration: 0.3, type: "spring", stiffness: 100 } },
    };

    const textVariants = {
        visible: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.2 } },
        hidden: { opacity: 0, x: -10, transition: { duration: 0.2 } },
    };

    const toggleButtonVariants = {
        expanded: { rotate: 0, transition: { duration: 0.3 } },
        collapsed: { rotate: 180, transition: { duration: 0.3 } },
    };

    if (!isInitialized) {
        return (
            <motion.aside
                className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
                initial="expanded"
                animate={collapsed ? "collapsed" : "expanded"}
                variants={sidebarVariants}
            >
                <div className="p-4 flex items-center justify-between">
                    <div className={`flex items-center ${collapsed ? "justify-center w-full" : "space-x-3"}`}>
                        <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                        {!collapsed && <div className="h-6 w-24 bg-background-hover animate-pulse rounded" />}
                    </div>
                </div>
                <div className="mt-6 px-4 space-y-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="h-12 bg-background-hover animate-pulse rounded-lg" />
                    ))}
                </div>
            </motion.aside>
        );
    }

    return (
        <>
            <motion.aside
                className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
                initial="expanded"
                animate={collapsed ? "collapsed" : "expanded"}
                variants={sidebarVariants}
            >
                {/* Logo & Toggle */}
                <div className="p-4 flex items-center justify-between">
                    <div className={`flex items-center ${collapsed ? "justify-center w-full" : "space-x-3"}`}>
                        <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.h1
                                    className="text-xl font-bold text-white"
                                    style={{ fontFamily: 'Morebi Rounded, sans-serif' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    Skillonx
                                </motion.h1>
                            )}
                        </AnimatePresence>
                    </div>
                    <motion.button
                        onClick={toggleSidebar}
                        className={`
                            p-2 rounded-full transition-colors text-text-muted hover:text-white
                            ${collapsed
                                ? "absolute top-4 right-4 bg-black bg-opacity-90 shadow-md hover:bg-background-hover border border-border-dark"
                                : "hover:bg-background-hover"
                            }
                        `}
                        variants={toggleButtonVariants}
                    >
                        <ChevronLeft size={18} />
                    </motion.button>
                </div>

                {/* Menu Items */}
                <nav className="mt-6">
                    <ul className={`space-y-2 ${collapsed ? "px-2" : "px-4"}`}>
                        {menuItems.map((item) => {
                            const isDisabled = item.permissionKey !== "overview" && permissions[item.permissionKey] === false;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => !isDisabled && navigate(item.path)}
                                        disabled={isDisabled}
                                        className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                            ? "bg-primary text-white"
                                            : isDisabled
                                                ? "text-text-muted cursor-not-allowed"
                                                : "text-white hover:bg-background-hover"
                                            }`}
                                        title={collapsed ? item.label : ""}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <AnimatePresence>
                                            {!collapsed && (
                                                <motion.span
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="hidden"
                                                    variants={textVariants}
                                                    className="ml-3"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Bottom Menu */}
                <div className={`absolute bottom-8 w-full ${collapsed ? "px-2" : "px-4"}`}>
                    <ul className="space-y-2">
                        {bottomMenuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        if (item.id === "logout") {
                                            setShowLogoutModal(true);
                                        } else {
                                            navigate(item.path);
                                            setActiveTab(item.id);
                                        }
                                    }}
                                    className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                        ? "bg-primary text-white"
                                        : "text-white hover:bg-background-hover"
                                        }`}
                                    title={collapsed ? item.label : ""}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={textVariants}
                                                className="ml-3"
                                            >
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

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-background-card p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-xl font-bold text-text mb-4">Are you sure you want to logout?</h2>
                        <p className="text-text-muted mb-6">You will be redirected to the landing page.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
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