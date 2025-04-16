import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const GuestGuard = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        // Add null checks and provide a default redirect
        if (storedUser?.team) {
            return <Navigate to={`/${storedUser.team.toLowerCase()}`} />;
        }
        // If no team is found, redirect to login as fallback
        return <Navigate to="/login" />;
    }

    return children;
};
