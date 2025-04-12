import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
