import * as React from 'react';

import { Pages } from '../components/Sidebar';
import { Storable } from '../components/Store';
import { MainLayout } from '../layouts/Main';

export interface Campaign {}

export interface CompletedProps<DataType> extends Storable<DataType> {}

export interface CompletedState {
  campaigns: Campaign[];
}

export class Completed<DataType> extends React.Component<
  CompletedProps<DataType>,
  CompletedState
> {
  constructor(props: CompletedProps<DataType>) {
    super(props);
    this.state = {
      campaigns: [],
    };
    this.fetchIfNeeded = this.fetchIfNeeded.bind(this);
  }

  fetchIfNeeded() {}

  render() {
    return (
      <MainLayout activePage={Pages.completedCampaigns}>
        <div>Completed Campaigns</div>
      </MainLayout>
    );
  }
}
