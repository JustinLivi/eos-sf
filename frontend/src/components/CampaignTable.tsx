import './CampaignTable.css';

import * as React from 'react';
import ReactTable from 'react-table';

import { Campaign } from '../store/stateDefinition';

export interface CampaignTableProps {
  data: { active_pacts: Campaign[] };
}

export const CampaignTable: React.SFC<CampaignTableProps> = ({ data }) => (
  <ReactTable
    data={data.active_pacts}
    columns={[
      { accessor: 'unique_id', Header: 'ID' },
      { accessor: 'complete_threshold', Header: 'Target Metric' },
      { accessor: 'activated_times', Header: 'Activated Metric' }
    ]}
    defaultPageSize={10}
    className='-striped -highlight'
  />
);
