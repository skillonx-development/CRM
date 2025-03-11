import Layout from '../src/components/layout/Layout'
import {
    Home,
    BarChart2,
    Code,
    Server,
    AlertTriangle,
    Database,
    GitBranch,
    Settings,
    HelpCircle,
    LogOut
} from 'lucide-react';

const Tech_Dashboard = () => {
    const techSidebarItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'projects', icon: Code, label: 'Projects' },
        { id: 'infrastructure', icon: Server, label: 'Infrastructure' },
        { id: 'database', icon: Database, label: 'Database' },
        { id: 'issues', icon: AlertTriangle, label: 'Issues' },
        { id: 'repositories', icon: GitBranch, label: 'Repositories' },
    ];

    const techBottomItems = [
        { id: 'settings', icon: Settings, label: 'Settings' },
        { id: 'help', icon: HelpCircle, label: 'Help' },
        { id: 'logout', icon: LogOut, label: 'Logout' },
    ];

    return (
        <div>
            <Layout
                sidebarItems={techSidebarItems}
                bottomSidebarItems={techBottomItems}
                defaultActiveTab="dashboard"
            >
                <h1 className="text-2xl font-bold mb-6">Tech Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tech dashboard content here */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">System Status</h2>
                        <p>Uptime: 99.98%</p>
                        <p>Active servers: 12/12</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Open Issues</h2>
                        <p>Critical: 0</p>
                        <p>High: 3</p>
                        <p>Medium: 8</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Deployments</h2>
                        <p>Last deployment: 2 hours ago</p>
                        <p>Scheduled: 1 pending</p>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Tech_Dashboard