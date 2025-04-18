import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../constants';

export const AuthGuard = () => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();
    
   
    
    // Show loading state while authentication is being checked
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // Special case for admin (using exact same check as your original code)
    if (user?.role === 'admin') {
        console.log("AuthGuard - Admin user detected, allowing access");
        return <Outlet />;
    }
    
    // For non-admin users, verify path matches team
    const currentPath = location.pathname.split('/')[1];
    const hasAccess = user?.team?.toLowerCase() === currentPath;
    
    if (!hasAccess) {
        console.log(`AuthGuard - Access denied: User team (${user?.team}) doesn't match route (${currentPath})`);
        const redirectPath = user?.team ? `/${user.team.toLowerCase()}` : "/login";
        return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }
    
    console.log("AuthGuard - Access granted");
    return <Outlet />;
};