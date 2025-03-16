import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TechDashboard from './Pages/Dashboard/Tech/TechDashboard';
import Proposals from './Pages/Dashboard/Tech/Proposals';
import Instructor from './Pages/Dashboard/Tech/Instructor';
import Feedback from './Pages/Dashboard/Tech/Feedback';
import MarketingPromotion from './Pages/Dashboard/MarketingDashboard/MarketingPromotion';
// Public Pages
// import Login from './Pages/Auth/Login';
// import Register from './Pages/Auth/Register';


// Sales Dashboard
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard';
import SalesLead from './Pages/Dashboard/SalesDashboard/SalesLead';
import SalesProposals from './Pages/Dashboard/SalesDashboard/SalesProposals';
import SalesOrders from './Pages/Dashboard/SalesDashboard/SalesOrders';

import Workshop from './Pages/Dashboard/Tech/Workshop';
import Curriculum from './Pages/Dashboard/Tech/Curriculum';

import SalesBilling from './Pages/Dashboard/SalesDashboard/SalesBilling';
import SalesSettings from './Pages/Dashboard/SalesDashboard/SalesSettings';
import SalesHelp from './Pages/Dashboard/SalesDashboard/SalesHelp';


// Marketing Dashboard
import MarketingDashboard from './Pages/Dashboard/MarketingDashboard/MarketingDashboard';
import MarketingProposal from './Pages/Dashboard/MarketingDashboard/MarketingProposal';
import MarketingTeacher from './Pages/Dashboard/MarketingDashboard/MarketingTeacher';
import MarketingSettings from './Pages/Dashboard/MarketingDashboard/MarketingSettings';
import MarketingHelp from './Pages/Dashboard/MarketingDashboard/MarketingHelp';
import MarketingFeedback from './Pages/Dashboard/MarketingDashboard/MarketingFeedback';


// Admin Dashboard
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard';



const App = () => {
  return (
          <Router>
            <Routes>
              <Route>
                {/* Sales Dashboard */}
                <Route path="/sales" element={<SalesDashboard />} />
                <Route path="/sales/lead" element={<SalesLead />} />
                <Route path="/sales/proposals" element={<SalesProposals/>} />
                <Route path="/sales/orders" element={<SalesOrders />} />
                <Route path="/salaes/orders" element={<SalesOrders />} />

                <Route path="/tech" element={<TechDashboard />} />
                <Route path="/tech/proposal" element={<Proposals />} />
                <Route path="/tech/instructor" element={<Instructor />} />
                <Route path="/tech/workshop" element={<Workshop />} />
                <Route path="/tech/curriculum" element={<Curriculum />} />
                <Route path="/tech/feedback" element={<Feedback />} />


                <Route path="/sales/billing" element={<SalesBilling />} />
                <Route path="/sales/settings" element={<SalesSettings />} />
                <Route path="/sales/help" element={<SalesHelp />} />

                {/* Marketing Dahshboard */}
                <Route path="/marketing" element={<MarketingDashboard />} />
                <Route path="/marketing/proposals" element={<MarketingProposal />} />
                <Route path="/marketing/teachers" element={<MarketingTeacher />} />
                <Route path="/marketing/settings" element={<MarketingSettings />} />
                <Route path="/marketing/help" element={<MarketingHelp />} />
                <Route path="/marketing/feedback" element={<MarketingFeedback />} />
                <Route path="/marketing/promotion" element={<MarketingPromotion />} />

                {/* Admin Dashboard */}

                <Route path="/admin" element={<AdminDashboard/>}/>

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
