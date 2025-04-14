import { Route } from 'react-router-dom';
import { ROUTES } from '../constants';

import AdminDashboard from '../../Pages/Dashboard/AdminDashboard/AdminDashboard';
import AdminApproval from '../../Pages/Dashboard/AdminDashboard/AdminApproval';
import AdminInvoices from '../../Pages/Dashboard/AdminDashboard/AdminInvoices';
import AdminTeamManage from '../../Pages/Dashboard/AdminDashboard/AdminTeamManage';
import AdminNotifications from '../../Pages/Dashboard/AdminDashboard/AdminNotifications';
import AdminSettings from '../../Pages/Dashboard/AdminDashboard/AdminSettings';
import AdminControl from '../../Pages/Dashboard/AdminDashboard/AdminControl';

export const AdminRoutes = (
    <Route path={ROUTES.ADMIN + '/*'}>
        <Route index element={<AdminDashboard />} />
        <Route path={ROUTES.NESTED.APPROVALS} element={<AdminApproval />} />
        <Route path={ROUTES.NESTED.INVOICES} element={<AdminInvoices />} />
        <Route path={ROUTES.NESTED.TEAM} element={<AdminTeamManage />} />
        <Route path={ROUTES.NESTED.NOTIFICATIONS} element={<AdminNotifications />} />
        <Route path={ROUTES.NESTED.SETTINGS} element={<AdminSettings />} />
        <Route path={ROUTES.NESTED.CONTROL} element={<AdminControl />} />
    </Route>
);
