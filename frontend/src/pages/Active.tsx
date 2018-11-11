import * as React from 'react';

import { Pages } from '../components/Sidebar';
import { Storable } from '../components/Store';
import { MainLayout } from '../layouts/Main';

export interface Campaign {}

export interface ActiveProps<DataType> extends Storable<DataType> {}

export interface ActiveState {
  campaigns: Campaign[];
}

export class Active<DataType> extends React.Component<
  ActiveProps<DataType>,
  ActiveState
> {
  constructor(props: ActiveProps<DataType>) {
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
