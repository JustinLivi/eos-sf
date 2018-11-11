import * as React from 'react';
import ReactDataGrid from 'react-data-grid';

import { Campaign } from './Store';

export interface CampaignTableProps {
  data: { active_campaigns: Campaign[]; }
}

export const CampaignTable: React.SFC<CampaignTableProps> = ({ data }) => (
  <ReactDataGrid
    columns={[
      { key: 'unique_id', name: 'ID' },
      { key: 'target_users', name: 'Target Users' },
      { key: 'activated_users', name: 'Activated Users' }
    ]}
    rowGetter={(index: number) => data.active_campaigns[index]}
    rowsCount={data.active_campaigns.length}
  />
);
