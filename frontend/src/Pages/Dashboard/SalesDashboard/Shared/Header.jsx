import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function Header() {
    const navigate = useNavigate();

    const user = {
        name: "John Carter",
        avatar: "/anton.png", // Replace with actual user avatar URL
    };

    const handleLogout = () => {
        // Clear any auth data
        localStorage.removeItem("token"); // Adjust key as needed
        // Redirect to login
        navigate("/login");
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

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/90"
                >
                    Logout
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
