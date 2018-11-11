import * as React from 'react';

import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

export interface Campaign {}

export interface ActiveProps {}

export interface ActiveState {
  campaigns: Campaign[];
}

export class Active extends React.Component<ActiveProps, ActiveState> {
  constructor(props: ActiveProps) {
    super(props);
    this.state = {
      campaigns: [],
    };
    this.fetchIfNeeded = this.fetchIfNeeded.bind(this);
  }

  fetchIfNeeded() {}

  render() {
    return (
      <MainLayout activePage={Pages.activeCampaigns}>
        <div>Active Campaigns</div>
      </MainLayout>
    );
  }
}
