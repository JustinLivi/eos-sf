import * as React from 'react';

import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

export const Active = () => (
    <MainLayout activePage={Pages.activeCampaigns}>
        <div>Active Campaigns</div>
    </MainLayout>
);