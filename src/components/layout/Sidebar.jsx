import {
    Home,
    BarChart2,
    Users,
    ShoppingBag,
    MessageSquare,
    Settings,
    HelpCircle,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'analytics', icon: BarChart2, label: 'Analytics' },
        { id: 'customers', icon: Users, label: 'Customers' },
        { id: 'orders', icon: ShoppingBag, label: 'Orders' },
        { id: 'messages', icon: MessageSquare, label: 'Messages' },
    ];

    const bottomMenuItems = [
        { id: 'settings', icon: Settings, label: 'Settings' },
        { id: 'help', icon: HelpCircle, label: 'Help' },
        { id: 'logout', icon: LogOut, label: 'Logout' },
    ];

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const sidebarVariants = {
        expanded: {
            width: 256,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 100
            }
        },
        collapsed: {
            width: 80,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 100
            }
        }
    };

    const textVariants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.1,
                duration: 0.2
            }
        },
        hidden: {
            opacity: 0,
            x: -10,
            transition: {
                duration: 0.2
            }
        }
    };

    const iconVariants = {
        expanded: {
            marginRight: "12px"
        },
        collapsed: {
            marginRight: "0px"
        }
    };

    const toggleButtonVariants = {
        expanded: { rotate: 0 },
        collapsed: { rotate: 180 }
    };

    return (
        <motion.aside
            className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
            initial="expanded"
            animate={collapsed ? "collapsed" : "expanded"}
            variants={sidebarVariants}
        >
            <div className="p-6 flex items-center justify-between">
                <AnimatePresence>
                    {!collapsed && (
                        <motion.h1
                            className="text-xl font-bold text-text"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={textVariants}
                        >
                            Admin
                        </motion.h1>
                    )}
                </AnimatePresence>
                <motion.button
                    onClick={toggleSidebar}
                    className="p-1 rounded-full hover:bg-background-hover transition-colors text-text-muted hover:text-text"
                    variants={toggleButtonVariants}
                >
                    <ChevronLeft size={20} />
                </motion.button>
            </div>

            {/* Rest of the component remains the same */}
            <nav className="mt-6">
                <ul className={`space-y-2 ${collapsed ? 'px-2' : 'px-4'}`}>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center w-full ${collapsed ? 'justify-center' : ''
                                    } px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                        ? 'bg-primary text-text'
                                        : 'text-text-muted hover:bg-background-hover'
                                    }`}
                                title={collapsed ? item.label : ""}
                            >
                                <motion.div
                                    variants={iconVariants}
                                    className="flex items-center"
                                >
                                    <item.icon className="h-5 w-5" />
                                </motion.div>
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
            </nav>

            <div className={`absolute bottom-8 w-full ${collapsed ? 'px-2' : 'px-4'}`}>
                <ul className="space-y-2">
                    {bottomMenuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center w-full ${collapsed ? 'justify-center' : ''
                                    } px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                        ? 'bg-primary text-text'
                                        : 'text-text-muted hover:bg-background-hover'
                                    }`}
                                title={collapsed ? item.label : ""}
                            >
                                <motion.div
                                    variants={iconVariants}
                                    className="flex items-center"
                                >
                                    <item.icon className="h-5 w-5" />
                                </motion.div>
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
    );
}

export default Sidebar;