import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import LoginPage from './Pages/LoginPage';

// Tech Dashboaard
import TechDashboard from './Pages/Dashboard/Tech/TechDashboard';

import Instructor from './Pages/Dashboard/Tech/Instructor';
import Feedback from './Pages/Dashboard/Tech/Feedback';
import MarketingPromotion from './Pages/Dashboard/MarketingDashboard/MarketingPromotion';
// Public Pages
// import Login from './Pages/Auth/Login';
// import Register from './Pages/Auth/Register';


import Proposals from './Pages/Dashboard/Tech/Proposals';


import Curriculum from './Pages/Dashboard/Tech/Curriculum';
import Resources from './Pages/Dashboard/Tech/Resources';
import ManageTeam from './Pages/Dashboard/Tech/ManageTeam';
import TechSettings from './Pages/Dashboard/Tech/TechSettings';
import TechHelp from './Pages/Dashboard/Tech/TechHelp';
// Sales Dashboard
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard';
import SalesLead from './Pages/Dashboard/SalesDashboard/SalesLead';
import SalesProposals from './Pages/Dashboard/SalesDashboard/SalesProposals';
import SalesOrders from './Pages/Dashboard/SalesDashboard/SalesOrders';
import SalesBilling from './Pages/Dashboard/SalesDashboard/SalesBilling';
import SalesSettings from './Pages/Dashboard/SalesDashboard/SalesSettings';
import SalesHelp from './Pages/Dashboard/SalesDashboard/SalesHelp';


// Marketing Dashboard
import MarketingDashboard from './Pages/Dashboard/MarketingDashboard/MarketingDashboard';

// import MarketingProposal from './Pages/Dashboard/MarketingDashboard/MarketingProposal';
// import MarketingTeacher from './Pages/Dashboard/MarketingDashboard/MarketingTeacher';
// import MarketingSettings from './Pages/Dashboard/MarketingDashboard/MarketingSettings';
// import MarketingHelp from './Pages/Dashboard/MarketingDashboard/MarketingHelp';
// import MarketingFeedback from './Pages/Dashboard/MarketingDashboard/MarketingFeedback';

import MarketingProposal from './Pages/Dashboard/MarketingDashboard/MarketingProposal';
import MarketingTeacher from './Pages/Dashboard/MarketingDashboard/MarketingTeacher';
import MarketingSettings from './Pages/Dashboard/MarketingDashboard/MarketingSettings';
import MarketingHelp from './Pages/Dashboard/MarketingDashboard/MarketingHelp';
import MarketingFeedback from './Pages/Dashboard/MarketingDashboard/MarketingFeedback';
// import MarketingPromotion from './Pages/Dashboard/MarketingDashboard/MarketingPromotion';



// Admin Dashboard
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard';
import AdminApproval from './Pages/Dashboard/AdminDashboard/AdminApproval';
import AdminInvoices from './Pages/Dashboard/AdminDashboard/AdminInvoices';
import AdminNotifications from './Pages/Dashboard/AdminDashboard/AdminNotifications';
import SalesTeam from './Pages/Dashboard/SalesDashboard/SalesTeam';
import MarketingTeam from './Pages/Dashboard/MarketingDashboard/MarketingTeam';



const App = () => {
  return (

    <Router>
      <Routes>
        <Route>

        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<LoginPage/>} />

          {/* Sales Dashboard */}
          <Route path="/sales" element={<SalesDashboard />} />
          <Route path="/sales/lead" element={<SalesLead />} />
          <Route path="/sales/proposals" element={<SalesProposals />} />
          <Route path="/sales/orders" element={<SalesOrders />} />
          <Route path="/salaes/orders" element={<SalesOrders />} />


          <Route path="/tech" element={<TechDashboard />} />
          <Route path="/tech/instructor" element={<Instructor />} />
          {/* <Route path="/tech/workshop" element={<Worksho/>} /> */}
          <Route path="/tech/curriculum" element={<Curriculum />} />
          <Route path="/tech/feedback" element={<Feedback />} />

          <Route path="/sales/billing" element={<SalesBilling />} />
          <Route path="/sales/team" element={<SalesTeam />} />
          <Route path="/sales/settings" element={<SalesSettings />} />
          <Route path="/sales/help" element={<SalesHelp />} />

          {/* Tech Dashboard */}
          <Route path="/tech" element={<TechDashboard />} />
          <Route path="/tech/proposal" element={<Proposals />} />
          <Route path="/tech/curriculum" element={<Curriculum />} />
          <Route path="/tech/manageteam" element={<ManageTeam />} />
          <Route path="/tech/resources" element={<Resources />} />
          <Route path="/tech/settings" element={<TechSettings />} />
          <Route path="/tech/help" element={<TechHelp />} />

          {/* Marketing Dahshboard */}
          <Route path="/marketing" element={<MarketingDashboard />} />
          <Route path="/marketing/proposals" element={<MarketingProposal />} />
          <Route path="/marketing/teachers" element={<MarketingTeacher />} />
          <Route path="/marketing/settings" element={<MarketingSettings />} />
          <Route path="/marketing/help" element={<MarketingHelp />} />
          <Route path="/marketing/feedback" element={<MarketingFeedback />} />
          <Route path="/marketing/promotion" element={<MarketingPromotion />} />
          <Route path="/marketing/team" element={<MarketingTeam />} />


          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/approvals" element={<AdminApproval/>} />
          <Route path="/admin/invoices" element={<AdminInvoices/>} />
          <Route path="/admin/notifications" element={<AdminNotifications/>} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-primary">404</h1>
              <p className="text-xl text-gray-600 mt-4">Page not found</p>
              <a href="/" className="mt-6 inline-block text-primary hover:underline">
                Go back home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </Router>

  );
};

export default App;
