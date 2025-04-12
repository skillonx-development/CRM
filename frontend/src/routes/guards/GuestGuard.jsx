import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const GuestGuard = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        const user = JSON.parse(localStorage.getItem('user'));
        return <Navigate to={`/${user.team.toLowerCase()}`} />;
    }

    return children;
};
