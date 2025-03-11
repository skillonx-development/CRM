import Layout from '../src/components/layout/Layout'
import {
    Home,
    BarChart2,
    Target,
    TrendingUp,
    Users,
    Mail,
    MessageSquare,
    Settings,
    HelpCircle,
    LogOut,
    Share2
} from 'lucide-react';

const Market_Dashboard = () => {
    const marketingSidebarItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'campaigns', icon: Target, label: 'Campaigns' },
        { id: 'analytics', icon: BarChart2, label: 'Analytics' },
        { id: 'leads', icon: TrendingUp, label: 'Leads' },
        { id: 'email', icon: Mail, label: 'Email Marketing' },
        { id: 'social', icon: Share2, label: 'Social Media' },
    ];

    const marketingBottomItems = [
        { id: 'settings', icon: Settings, label: 'Settings' },
        { id: 'help', icon: HelpCircle, label: 'Help' },
        { id: 'logout', icon: LogOut, label: 'Logout' },
    ];

    return (
        <div>
            <Layout
                sidebarItems={marketingSidebarItems}
                bottomSidebarItems={marketingBottomItems}
                defaultActiveTab="dashboard"
            >
                <h1 className="text-2xl font-bold mb-6">Marketing Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Marketing dashboard content here */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Campaign Performance</h2>
                        <p>Active campaigns: 5</p>
                        <p>Total leads: 342</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Email Statistics</h2>
                        <p>Open rate: 24.5%</p>
                        <p>Click rate: 3.2%</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Social Media</h2>
                        <p>New followers: 56</p>
                        <p>Engagement rate: 4.7%</p>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Market_Dashboard