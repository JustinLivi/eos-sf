import './CampaignTable.css';

import * as React from 'react';
import ReactTable from 'react-table';

import { Campaign } from '../store/stateDefinition';

export interface CampaignTableProps {
  data: { active_campaigns: Campaign[] };
}

export const CampaignTable: React.SFC<CampaignTableProps> = ({ data }) => (
  <ReactTable
    data={data.active_campaigns}
    columns={[
      { accessor: 'unique_id', Header: 'ID' },
      { accessor: 'target_users', Header: 'Target Metric' },
      { accessor: 'activated_users', Header: 'Activated Metric' }
    ]}
    defaultPageSize={10}
    className='-striped -highlight'
  />
);
