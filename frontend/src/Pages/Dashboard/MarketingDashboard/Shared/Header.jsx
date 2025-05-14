import { Search, Bell } from "lucide-react";

function Header() {
    const user = {
        name: "John Carter",
        avatar: "/anton.png", // Replace with actual user avatar URL
    };

    return (
        <header className="h-16 border-b border-border-dark flex items-center px-6">
            <div className="flex items-center space-x-4 ml-auto">
                {/* Search Bar */}
             

                {/* Notification Bell */}
              
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
