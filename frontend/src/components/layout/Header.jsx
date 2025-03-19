import { Search, Bell, Settings } from 'lucide-react'

function Header() {
    return (
        <header className="h-16 border-b border-border-dark flex items-center justify-between px-6">
            <div className="flex items-center w-1/3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-background-sidebar border border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-background-hover">
                    <Bell className="h-5 w-5 text-text-muted" />
                </button>
                <button className="p-2 rounded-lg hover:bg-background-hover">
                    <Settings className="h-5 w-5 text-text-muted" />
                </button>
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-text font-bold text-sm">JC</span>
                </div>
            </div>
        </header>
    )
}

export default Header