import { Navigate, Route, Routes } from "react-router-dom";
import Admin_Dashboard from "../pages/Admin.dashboard";
import Market_Dashboard from "../pages/Market.dashboard";
import Sales_Dashboard from "../pages/Sales.dashboard";
import Tech_Dashboard from "../pages/Tech.dashboard";

function App() {
  return (
    <Routes>
      {/* Redirect root to admin dashboard */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Dashboard routes */}
      <Route path="/admin" element={<Admin_Dashboard />} />
      <Route path="/marketing" element={<Market_Dashboard />} />
      <Route path="/sales" element={<Sales_Dashboard />} />
      <Route path="/tech" element={<Tech_Dashboard />} />

      {/* Fallback route for any unmatched paths */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;