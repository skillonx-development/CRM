import { useEffect, useState, useMemo } from "react";
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
    const navigate = useNavigate();
    const location = useLocation();

    const [currentRole, setCurrentRole] = useState(() => {
        const cachedUser = JSON.parse(localStorage.getItem("user"));
        return cachedUser?.userRole || null;
    });

    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        if (!loading && user && user.userRole) {
            setCurrentRole(user.userRole);
        } else if (!loading && !user) {
            setCurrentRole(null);
        }
    }, [user, loading]);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const cachedUser = JSON.parse(localStorage.getItem("user"));
                if (!cachedUser?._id) {
                    return;
                }

                const res = await fetch(`http://localhost:5001/api/members/getPermissions/${cachedUser.team}/${cachedUser._id}`);
                const data = await res.json();

                setPermissions(data.permissions || {});
            } catch (err) {
                console.error("Error fetching permissions:", err);
            }
        };
        fetchPermissions();
    }, []);

    const baseMenuItems = [
        { id: "overview", icon: LayoutGrid, label: "Overview", path: "/sales", permissionKey: "overview" },
        { id: "proposals", icon: FileText, label: "Proposals", path: "/sales/proposals", permissionKey: "proposals" },
        { id: "order", icon: Package, label: "Orders", path: "/sales/orders", permissionKey: "orders" },
        { id: "billing", icon: CreditCard, label: "Billing", path: "/sales/billing", permissionKey: "billing" },
        { id: "team-management", icon: Users, label: "Team Management", path: "/sales/team", permissionKey: "team-management" },
    ];

    const menuItems = useMemo(() => {
        const filteredItems = currentRole === "lead" ? baseMenuItems : baseMenuItems.filter(item => item.id !== "team-management");
        return filteredItems;
    }, [currentRole]);

    const bottomMenuItems = [
        { id: "settings", icon: Settings, label: "Settings", path: "/sales/settings" },
        { id: "help", icon: HelpCircle, label: "Help", path: "/sales/help" },
        { id: "logout", icon: LogOut, label: "Logout" },
    ];

    useEffect(() => {
        const allItems = [...menuItems, ...bottomMenuItems];
        const currentTab = allItems.find(item => item.path === location.pathname);
        if (currentTab) {
            setActiveTab(currentTab.id);
        }
    }, [location.pathname, menuItems, bottomMenuItems, setActiveTab]);

    const toggleSidebar = () => setCollapsed(!collapsed);

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

    const handleLogout = () => logout();

    if (loading && !currentRole) {
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
                                    Flariex
                                </motion.h1>
                            )}
                        </AnimatePresence>
                    </div>
                    <motion.button
                        onClick={toggleSidebar}
                        className={`p-1 rounded-full hover:bg-background-hover transition-colors text-text-muted hover:text-white ${collapsed ? "absolute top-4 right-4" : ""}`}
                        variants={toggleButtonVariants}
                    >
                        <ChevronLeft size={20} />
                    </motion.button>
                </div>

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

                <div className={`absolute bottom-8 w-full ${collapsed ? "px-2" : "px-4"}`}>
                    <ul className="space-y-2">
                        {bottomMenuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => item.id === "logout" ? setShowLogoutModal(true) : navigate(item.path)}
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

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-background-card p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-xl font-bold text-text mb-4">Are you sure you want to logout?</h2>
                        <p className="text-text-muted mb-6">You will be redirected to the landing page.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 hover:text-black transition"
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
