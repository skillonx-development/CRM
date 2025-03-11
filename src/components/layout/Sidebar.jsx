import {
    Home,
    BarChart2,
    Users,
    ShoppingBag,
    MessageSquare,
    Settings,
    HelpCircle,
    LogOut,
    ChevronLeft
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

    return (
        <div className="relative">
            {/* Sidebar */}
            <motion.aside
                className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
                animate={{ width: collapsed ? 80 : 256 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
            >
                <div className="p-6 flex items-center justify-between">
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.h1
                                className="text-xl font-bold text-text"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </div>

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
                                    <item.icon className="h-5 w-5" />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.2 }}
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
                                    <item.icon className="h-5 w-5" />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.2 }}
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

            {/* Toggle Button with 180° Rotation */}
            <motion.button
                onClick={toggleSidebar}
                className="absolute top-6 -right-5 bg-background-sidebar border border-border-dark p-1 rounded-full hover:bg-background-hover transition-colors"
                animate={{ left: collapsed ? 70 : 236 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
            >
                <motion.div
                    animate={{ rotate: collapsed ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronLeft size={20} />
                </motion.div>
            </motion.button>
        </div>
    );
}

export default Sidebar;
