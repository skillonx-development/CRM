import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './Pages/Landing';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';

// Tech Dashboard imports
import TechDashboard from './Pages/Dashboard/Tech/TechDashboard';
import Proposals from './Pages/Dashboard/Tech/Proposals';
import Curriculum from './Pages/Dashboard/Tech/Curriculum';
import Resources from './Pages/Dashboard/Tech/Resources';
import ManageTeam from './Pages/Dashboard/Tech/ManageTeam';
import TechSettings from './Pages/Dashboard/Tech/TechSettings';
import TechHelp from './Pages/Dashboard/Tech/TechHelp';

// Sales Dashboard imports
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard';
import SalesLead from './Pages/Dashboard/SalesDashboard/SalesLead';
import SalesProposals from './Pages/Dashboard/SalesDashboard/SalesProposals';
import SalesOrders from './Pages/Dashboard/SalesDashboard/SalesOrders';
import SalesBilling from './Pages/Dashboard/SalesDashboard/SalesBilling';
import SalesSettings from './Pages/Dashboard/SalesDashboard/SalesSettings';
import SalesHelp from './Pages/Dashboard/SalesDashboard/SalesHelp';

// Marketing Dashboard imports
import MarketingDashboard from './Pages/Dashboard/MarketingDashboard/MarketingDashboard';
import MarketingProposal from './Pages/Dashboard/MarketingDashboard/MarketingProposal';
import MarketingTeacher from './Pages/Dashboard/MarketingDashboard/MarketingTeacher';
import MarketingSettings from './Pages/Dashboard/MarketingDashboard/MarketingSettings';
import MarketingHelp from './Pages/Dashboard/MarketingDashboard/MarketingHelp';
import MarketingFeedback from './Pages/Dashboard/MarketingDashboard/MarketingFeedback';
import MarketingTeam from './Pages/Dashboard/MarketingDashboard/MarketingTeam';

// Admin Dashboard imports
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard';
import AdminApproval from './Pages/Dashboard/AdminDashboard/AdminApproval';
import AdminInvoices from './Pages/Dashboard/AdminDashboard/AdminInvoices';
import AdminNotifications from './Pages/Dashboard/AdminDashboard/AdminNotifications';
import AdminTeamManage from './Pages/Dashboard/AdminDashboard/AdminTeamManage';
import AdminSettings from './Pages/Dashboard/AdminDashboard/AdminSettings';
import AdminControl from './Pages/Dashboard/AdminDashboard/AdminControl';
import SalesTeam from './Pages/Dashboard/SalesDashboard/SalesTeam';
import MarketingPromotion from './Pages/Dashboard/MarketingDashboard/MarketingPromotion';

const ProtectedLayout = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Get the current dashboard from URL path
  const currentPath = location.pathname.split('/')[1];

  // Check if user has access to this dashboard based on their team
  const hasAccess = user?.team?.toLowerCase() === currentPath;

  // Admin has access to all dashboards
  if (user?.team?.toLowerCase() === 'admin') {
    return <Outlet />;
  }

  // Redirect to login if trying to access unauthorized dashboard
  if (!hasAccess) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={`/${JSON.parse(localStorage.getItem('user')).team.toLowerCase()}`} />;
  }

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Completely public route */}
          <Route index element={<Landing />} />
          <Route path="/register/:type" element={<RegistrationPage />} />

          {/* Protected login route - redirects if already authenticated */}
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <LoginPage />
              </RedirectIfAuthenticated>
            }
          />

          {/* Protected dashboard routes */}
          <Route element={<ProtectedLayout />}>
            {/* Tech Dashboard Routes */}
            <Route path="/tech/*" element={<Outlet />}>
              <Route index element={<TechDashboard />} />
              <Route path="proposal" element={<Proposals />} />
              <Route path="curriculum" element={<Curriculum />} />
              <Route path="team" element={<ManageTeam />} />
              <Route path="resources" element={<Resources />} />
              <Route path="settings" element={<TechSettings />} />
              <Route path="help" element={<TechHelp />} />
            </Route>

            {/* Sales Dashboard Routes */}
            <Route path="/sales/*" element={<Outlet />}>
              <Route index element={<SalesDashboard />} />
              <Route path="lead" element={<SalesLead />} />
              <Route path="proposals" element={<SalesProposals />} />
              <Route path="orders" element={<SalesOrders />} />
              <Route path="billing" element={<SalesBilling />} />
              <Route path="team" element={<SalesTeam/>} />
              <Route path="settings" element={<SalesSettings />} />
              <Route path="help" element={<SalesHelp />} />
            </Route>

            {/* Marketing Dashboard Routes */}
            <Route path="/marketing/*" element={<Outlet />}>
              <Route index element={<MarketingDashboard />} />
              <Route path="proposals" element={<MarketingProposal />} />
              <Route path="teachers" element={<MarketingTeacher />} />
              <Route path="settings" element={<MarketingSettings />} />
              <Route path="feedback" element={<MarketingFeedback />} />
              <Route path="promotion" element={<MarketingPromotion/>} />
              <Route path="help" element={<MarketingHelp />} />
              <Route path="team" element={<MarketingTeam/>} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route path="/admin/*" element={<Outlet />}>
              <Route index element={<AdminDashboard />} />
              <Route path="approvals" element={<AdminApproval />} />
              <Route path="invoices" element={<AdminInvoices />} />
              <Route path="teams" element={<AdminTeamManage />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="control" element={<AdminControl />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
