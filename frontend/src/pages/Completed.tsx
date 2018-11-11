import { map } from 'lodash';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fetchTable, invalidateCache } from '../actions';
import { CampaignTable } from '../components/CampaignTable';
import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';
import { CacheStatus, State, StoreState } from '../store/stateDefinition';

export interface CompletedProps {}

export interface CompletedDispatchProps {
  shouldInvalidateCache: () => void;
  shouldFetchTable: () => void;
}

type AllProps = StoreState & CompletedDispatchProps & CompletedProps;

export class UnboundCompleted extends React.Component<AllProps> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    const { shouldInvalidateCache, shouldFetchTable, cacheStatus } = this.props;
    if (cacheStatus !== CacheStatus.FETCHING) {
      shouldFetchTable();
    }
  }

  render() {
    const { data } = this.props;
    return (
      <MainLayout activePage={Pages.completedCampaigns}>
        <div className='eos-header-holder-small'>
          <h1 className='header'>Bounty Dashboard</h1>
        </div>
        <Bar
          options={
            {
              // animation: {
              //   duration: 0
              // }
            }
          }
          data={{
            labels: [],
            datasets: map(data.active_campaigns, row => ({
              label: row.campaign_name,
              borderColor: '#B6F7C1',
              borderWidth: 1,
              hoverBorderColor: '#B6F7C1',
              data: [row.activated_users]
            }))
          }}
        />
        <div className='eos-header-holder-small'>
          <h1 className='header'>My Completed Bounties</h1>
        </div>
        <CampaignTable data={data} />
      </MainLayout>
    );
  }
}

const mapStateToProps = (state: State) => state.campaigns;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      shouldFetchTable: fetchTable,
      shouldInvalidateCache: invalidateCache
    },
    dispatch
  );

export const Completed = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnboundCompleted);
