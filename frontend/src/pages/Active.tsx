import { map } from 'lodash';
import * as React from 'react';
import { Line } from 'react-chartjs-2';

import { CampaignTable } from '../components/CampaignTable';
import { Pages } from '../components/Sidebar';
import { DataType, Storable } from '../components/Store';
import { MainLayout } from '../layouts/Main';

export interface Campaign {}

export interface ActiveProps<DataType> extends Storable<DataType> {}

export class Active extends React.Component<ActiveProps<DataType>> {
  constructor(props: ActiveProps<DataType>) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <MainLayout activePage={Pages.activeCampaigns}>
        <Line
          data={{
            labels: [],
            datasets: map(data.active_campaigns, row => ({
              label: 'Daily Metrics',
              borderColor: '#B6F7C1',
              borderWidth: 1,
              hoverBorderColor: '#B6F7C1',
              data: [65, 59, 80, 81, 56, 55, 40]
            }))
          }}
        />
        <CampaignTable data={data.active_campaigns} />
      </MainLayout>
    );
  }
}
