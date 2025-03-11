import Layout from '../src/components/layout/Layout'
import {
    Home,
    BarChart2,
    DollarSign,
    ShoppingBag,
    Users,
    FileText,
    Target,
    Settings,
    HelpCircle,
    LogOut
} from 'lucide-react';

const Sales_Dashboard = () => {
    const salesSidebarItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'deals', icon: DollarSign, label: 'Deals' },
        { id: 'customers', icon: Users, label: 'Customers' },
        { id: 'orders', icon: ShoppingBag, label: 'Orders' },
        { id: 'invoices', icon: FileText, label: 'Invoices' },
        { id: 'quotations', icon: Target, label: 'Quotations' },
    ];

    const salesBottomItems = [
        { id: 'settings', icon: Settings, label: 'Settings' },
        { id: 'help', icon: HelpCircle, label: 'Help' },
        { id: 'logout', icon: LogOut, label: 'Logout' },
    ];

    return (
        <div>
            <Layout
                sidebarItems={salesSidebarItems}
                bottomSidebarItems={salesBottomItems}
                defaultActiveTab="dashboard"
            >
                <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Sales dashboard content here */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                        <p>Monthly: $45,678</p>
                        <p>YTD: $345,987</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Deals</h2>
                        <p>Open deals: 24</p>
                        <p>Closed deals: 18</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Top Performers</h2>
                        <p>John Doe: $12,450</p>
                        <p>Jane Smith: $10,230</p>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Sales_Dashboard