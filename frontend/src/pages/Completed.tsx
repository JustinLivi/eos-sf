import * as React from 'react';

import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

export const Completed = () => (
    <MainLayout activePage={Pages.completedCampaigns}>
        <div>Completed Campaigns</div>
    </MainLayout>
);