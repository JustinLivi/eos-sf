import * as React from 'react';

import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

export const CreateCampaign = () => (
    <MainLayout activePage={Pages.creating}>
        <h1>Create Campaign</h1>
    </MainLayout>
);