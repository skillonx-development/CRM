import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../constants';

export const AuthGuard = () => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }
// this is me Tanbir having a blast
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    const currentPath = location.pathname.split('/')[1];
    const hasAccess = user?.team?.toLowerCase() === currentPath;

    if (user?.team?.toLowerCase() === 'admin') {
        return <Outlet />;
    }

    if (!hasAccess) {
        return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
    }

    return <Outlet />;
};
