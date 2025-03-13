import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard';
import SalesRevenue from './Pages/Dashboard/SalesDashboard/SalesRevenue';
import SalesOrder from './Pages/Dashboard/SalesDashboard/SalesOrders';
import SalesCalendar from './Pages/Dashboard/SalesDashboard/SalesCalendar';
import MarketingDashboard from './Pages/Dashboard/MaketingDashboard/MarketingDashboard';
import MarketingCampaign from './Pages/Dashboard/MaketingDashboard/MarketingCampaign';
import MarketingCalendar from './Pages/Dashboard/MaketingDashboard/MarketingCalendar';
import ProductList from './Pages/Dashboard/MaketingDashboard/ProductList';
import MarketingSocial from './Pages/Dashboard/MaketingDashboard/MarketingSocial';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesDashboard/>} />
        <Route path="/revenue" element={<SalesRevenue/>} />
        <Route path="/orders" element={<SalesOrder/>} />
        <Route path="/calendar" element={<SalesCalendar/>} />
        <Route path="/marketing" element={<MarketingDashboard/>} />
        <Route path="/marketingcampaign" element={<MarketingCampaign/>} />
        <Route path="/marketingcalendar" element={<MarketingCalendar/>} />
        <Route path="/marketingsocial" element={<MarketingSocial/>} />
        <Route path="/productlist" element={<ProductList/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />



      </Routes>
    </Router>
    
  );
};

export default App;