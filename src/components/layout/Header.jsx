import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.substring(1); // Remove the leading slash

    const dashboards = [
        { id: 'admin', label: 'Admin' },
        { id: 'marketing', label: 'Marketing' },
        { id: 'sales', label: 'Sales' },
        { id: 'tech', label: 'Tech' }
    ];

    return (
        <header className="bg-background-card border-b border-border-dark p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                {dashboards.map((dashboard) => (
                    <button
                        key={dashboard.id}
                        onClick={() => navigate(`/${dashboard.id}`)}
                        className={`px-4 py-2 rounded-lg transition-colors ${currentPath === dashboard.id
                            ? 'bg-primary text-white'
                            : 'text-text-muted hover:bg-background-hover'
                            }`}
                    >
                        {dashboard.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-background border border-border-dark rounded-lg py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-text-muted" />
                </div>

                <button className="p-2 rounded-lg hover:bg-background-hover relative">
                    <Bell className="h-5 w-5 text-text-muted" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full"></span>
                </button>

                <button className="p-1 rounded-full bg-primary-dark hover:bg-primary">
                    <User className="h-5 w-5 text-white" />
                </button>
            </div>
        </header>
    );
}

export default Header;