import { Search, Bell, Settings } from 'lucide-react'

function Header() {
    return (
        <header className="h-16 border-b border-border-dark flex items-center justify-between px-6">
            <div className="flex items-center w-1/3">
                <div className="relative">
                    
                </div>
            </div>

            <div className="flex items-center space-x-4">
                
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