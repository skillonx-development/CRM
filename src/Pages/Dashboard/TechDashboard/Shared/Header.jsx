import { Search, Bell } from "lucide-react";

function Header() {
    const user = {
        name: "John Carter",
        avatar: "./src/Pages/Dashboard/SalesDashboard/Assets/anton.png", // Replace with actual user avatar URL
    };

    return (
        <header className="h-16 border-b border-border-dark flex items-center px-6">
            <div className="flex items-center space-x-4 ml-auto">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-background-sidebar border border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                {/* Notification Bell */}
                <button className="p-2 rounded-lg hover:bg-background-hover">
                    <Bell className="h-5 w-5 text-text-muted" />
                </button>

                {/* User Avatar */}
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full object-cover rounded-full"
                        />
                    ) : (
                        <span className="text-text font-bold text-sm">
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
