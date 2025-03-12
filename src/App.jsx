import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard';
import SalesRevenue from './Pages/Dashboard/SalesDashboard/SalesRevenue';
import SalesOrder from './Pages/Dashboard/SalesDashboard/SalesOrders';
import SalesCalendar from './Pages/Dashboard/SalesDashboard/SalesCalendar';
import SAlessettings from './Pages/Dashboard/SalesDashboard/SalesSettings';
import SalesHelp from './Pages/Dashboard/SalesDashboard/SalesHelp';
import MarketingDashboard from './Pages/Dashboard/MaketingDashboard/MarketingDashboard';
import MarketingCampaign from './Pages/Dashboard/MaketingDashboard/MarketingCampaign';
import MarketingCalendar from './Pages/Dashboard/MaketingDashboard/MarketingCalendar';
import ProductList from './Pages/Dashboard/MaketingDashboard/ProductList';
import MarketingSocial from './Pages/Dashboard/MaketingDashboard/MarketingSocial';
import TechDashboard from './Pages/Dashboard/TechDashboard/TechDashboard';
import TechProjects from './Pages/Dashboard/TechDashboard/TechProjects';
import TechTeam from './Pages/Dashboard/TechDashboard/TechTeam';
import TechReport from './Pages/Dashboard/TechDashboard/TechReport';
import TechSettings from './Pages/Dashboard/TechDashboard/TechSettings';
import TechHelp from './Pages/Dashboard/TechDashboard/TechHelp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesDashboard/>} />
        <Route path="/revenue" element={<SalesRevenue/>} />
        <Route path="/orders" element={<SalesOrder/>} />
        <Route path="/calendar" element={<SalesCalendar/>} />
        <Route path="/Settings" element={<SAlessettings/>} />
        <Route path="/help" element={<SalesHelp/>} />
        <Route path="/marketing" element={<MarketingDashboard/>} />
        <Route path="/marketingcampaign" element={<MarketingCampaign/>} />
        <Route path="/marketingcalendar" element={<MarketingCalendar/>} />
        <Route path="/marketingsocial" element={<MarketingSocial/>} />
        <Route path="/productlist" element={<ProductList/>} />
        <Route path="/Tech" element={<TechDashboard/>} />
        <Route path="/Projects" element={<TechProjects/>} />
        <Route path="/teams" element={<TechTeam />} />
        <Route path="/report" element={<TechReport />}  />
        <Route path="/settings1" element={<TechSettings />}/>
        <Route path="/help1" element={<TechHelp />} />
      </Routes>
    </Router>
    
  );
};

export default App;