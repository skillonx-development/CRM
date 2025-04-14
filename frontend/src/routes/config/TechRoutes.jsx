import { Route } from 'react-router-dom';
import { ROUTES } from '../constants';

import TechDashboard from '../../Pages/Dashboard/Tech/TechDashboard';
import Proposals from '../../Pages/Dashboard/Tech/Proposals';
import Curriculum from '../../Pages/Dashboard/Tech/Curriculum';
import Resources from '../../Pages/Dashboard/Tech/Resources';
import ManageTeam from '../../Pages/Dashboard/Tech/ManageTeam';
import TechSettings from '../../Pages/Dashboard/Tech/TechSettings';
import TechHelp from '../../Pages/Dashboard/Tech/TechHelp';

export const TechRoutes = (
    <Route path={ROUTES.TECH + '/*'}>
        <Route index element={<TechDashboard />} />
        <Route path={ROUTES.NESTED.PROPOSALS} element={<Proposals />} />
        <Route path={ROUTES.NESTED.CURRICULUM} element={<Curriculum />} />
        <Route path={ROUTES.NESTED.TEAM} element={<ManageTeam />} />
        <Route path={ROUTES.NESTED.RESOURCES} element={<Resources />} />
        <Route path={ROUTES.NESTED.SETTINGS} element={<TechSettings />} />
        <Route path={ROUTES.NESTED.HELP} element={<TechHelp />} />
    </Route>
);
