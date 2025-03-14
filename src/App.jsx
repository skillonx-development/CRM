import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
// import Login from './Pages/Auth/Login';
// import Register from './Pages/Auth/Register';


// Sales Dashboard
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard';
import SalesLead from './Pages/Dashboard/SalesDashboard/SalesLead';
import SalesProposals from './Pages/Dashboard/SalesDashboard/SalesProposals';
import SalesOrders from './Pages/Dashboard/SalesDashboard/SalesOrders';

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
