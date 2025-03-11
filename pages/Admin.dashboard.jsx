import Layout from '../src/components/layout/Layout'
import {
    Home,
    BarChart2,
    Users,
    ShoppingBag,
    MessageSquare,
    Settings,
    HelpCircle,
    LogOut,
    Shield,
    UserCog
} from 'lucide-react';

const Admin_Dashboard = () => {
    const adminSidebarItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'analytics', icon: BarChart2, label: 'Analytics' },
        { id: 'users', icon: Users, label: 'User Management' },
        { id: 'permissions', icon: Shield, label: 'Permissions' },
        { id: 'roles', icon: UserCog, label: 'Roles' },
    ];

    const adminBottomItems = [
        { id: 'settings', icon: Settings, label: 'Settings' },
        { id: 'help', icon: HelpCircle, label: 'Help' },
        { id: 'logout', icon: LogOut, label: 'Logout' },
    ];

    return (
        <div>
            <Layout
                sidebarItems={adminSidebarItems}
                bottomSidebarItems={adminBottomItems}
                defaultActiveTab="dashboard"
            >
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Admin dashboard content here */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">User Statistics</h2>
                        <p>Total users: 1,245</p>
                        <p>Active users: 876</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">System Status</h2>
                        <p>All systems operational</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
                        <p>10 new users registered today</p>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Admin_Dashboard