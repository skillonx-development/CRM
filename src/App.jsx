import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard';
import SalesRevenue from './Pages/Dashboard/SalesDashboard/SalesRevenue';
import SalesOrder from './Pages/Dashboard/SalesDashboard/SalesOrders';
import SalesCalendar from './Pages/Dashboard/SalesDashboard/SalesCalendar';
import SAlessettings from './Pages/Dashboard/SalesDashboard/SalesSettings';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesDashboard/>} />
        <Route path="/revenue" element={<SalesRevenue/>} />
        <Route path="/orders" element={<SalesOrder/>} />
        <Route path="/calendar" element={<SalesCalendar/>} />
        <Route path="/Settings" element={<SAlessettings/>} />
      </Routes>
    </Router>
    
  );
};

export default App;