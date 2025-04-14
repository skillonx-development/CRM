import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthGuard } from './routes/guards/AuthGuard';
import { GuestGuard } from './routes/guards/GuestGuard';
import { ROUTES } from './routes/constants';

// Pages
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';

// Route configurations
import { TechRoutes } from './routes/config/TechRoutes';
import { SalesRoutes } from './routes/config/SalesRoutes';
import { MarketingRoutes } from './routes/config/MarketingRoutes';
import { AdminRoutes } from './routes/config/AdminRoutes';

// Separate component for authenticated routes
const AuthenticatedApp = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated && user?.team) {
      const team = user.team.toLowerCase();
      navigate(`/${team}`);
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};

// Main App component
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Root route with redirect logic */}
          <Route path="/" element={<AuthenticatedApp />} />

          {/* Public routes */}
          <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />

          {/* Guest-only routes */}
          <Route
            path={ROUTES.LOGIN}
            element={
              <GuestGuard>
                <LoginPage />
              </GuestGuard>
            }
          />

          {/* Protected routes */}
          <Route element={<AuthGuard />}>
            {TechRoutes}
            {SalesRoutes}
            {MarketingRoutes}
            {AdminRoutes}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
