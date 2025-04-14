import { Route } from 'react-router-dom';
import { ROUTES } from '../constants';

import SalesDashboard from '../../Pages/Dashboard/SalesDashboard/SalesDashboard';
import SalesProposals from '../../Pages/Dashboard/SalesDashboard/SalesProposals';
import SalesOrders from '../../Pages/Dashboard/SalesDashboard/SalesOrders';
import SalesBilling from '../../Pages/Dashboard/SalesDashboard/SalesBilling';
import SalesTeam from '../../Pages/Dashboard/SalesDashboard/SalesTeam';
import SalesSettings from '../../Pages/Dashboard/SalesDashboard/SalesSettings';
import SalesHelp from '../../Pages/Dashboard/SalesDashboard/SalesHelp';

export const SalesRoutes = (
    <Route path={ROUTES.SALES + '/*'}>
        <Route index element={<SalesDashboard />} />
        <Route path={ROUTES.NESTED.PROPOSALS} element={<SalesProposals />} />
        <Route path={ROUTES.NESTED.ORDERS} element={<SalesOrders />} />
        <Route path={ROUTES.NESTED.BILLING} element={<SalesBilling />} />
        <Route path={ROUTES.NESTED.TEAM} element={<SalesTeam />} />
        <Route path={ROUTES.NESTED.SETTINGS} element={<SalesSettings />} />
        <Route path={ROUTES.NESTED.HELP} element={<SalesHelp />} />
    </Route>
);
