import * as React from 'react';
import ReactDataGrid from 'react-data-grid';

import { Campaign } from './Store';

import './TopNav.css';

export interface CampaignTableProps {
  data: Campaign[];
}

export const CampaignTable: React.SFC<CampaignTableProps> = ({ data }) => (
  <ReactDataGrid
    columns={[
      { key: 'unique_id', name: 'ID' },
      { key: 'target_users', name: 'Target Users' },
      { key: 'activated_users', name: 'Activated Users' }
    ]}
    rowGetter={(index: number) => data[index]}
    rowsCount={data.length}
  />
);
