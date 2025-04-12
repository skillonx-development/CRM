import { Route } from 'react-router-dom';
import { ROUTES } from '../constants';

import MarketingDashboard from '../../Pages/Dashboard/MarketingDashboard/MarketingDashboard';
import MarketingProposal from '../../Pages/Dashboard/MarketingDashboard/MarketingProposal';
import MarketingTeacher from '../../Pages/Dashboard/MarketingDashboard/MarketingTeacher';
import MarketingSettings from '../../Pages/Dashboard/MarketingDashboard/MarketingSettings';
import MarketingHelp from '../../Pages/Dashboard/MarketingDashboard/MarketingHelp';
import MarketingFeedback from '../../Pages/Dashboard/MarketingDashboard/MarketingFeedback';
import MarketingTeam from '../../Pages/Dashboard/MarketingDashboard/MarketingTeam';
import MarketingPromotion from '../../Pages/Dashboard/MarketingDashboard/MarketingPromotion';

export const MarketingRoutes = (
    <Route path={ROUTES.MARKETING + '/*'}>
        <Route index element={<MarketingDashboard />} />
        <Route path={ROUTES.NESTED.PROPOSALS} element={<MarketingProposal />} />
        <Route path={ROUTES.NESTED.TEACHERS} element={<MarketingTeacher />} />
        <Route path={ROUTES.NESTED.SETTINGS} element={<MarketingSettings />} />
        <Route path={ROUTES.NESTED.FEEDBACK} element={<MarketingFeedback />} />
        <Route path={ROUTES.NESTED.PROMOTION} element={<MarketingPromotion />} />
        <Route path={ROUTES.NESTED.HELP} element={<MarketingHelp />} />
        <Route path={ROUTES.NESTED.TEAM} element={<MarketingTeam />} />
    </Route>
);
