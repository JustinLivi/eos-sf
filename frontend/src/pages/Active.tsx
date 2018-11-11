import { map } from 'lodash';
import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fetchTable, invalidateCache } from '../actions';
import { CampaignTable } from '../components/CampaignTable';
import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';
import { CacheStatus, State, StoreState } from '../store/stateDefinition';

export interface Campaign {}

export interface ActiveProps {}

export interface ActiveDispatchProps {
  shouldInvalidateCache: () => void;
  shouldFetchTable: () => void;
}

type AllProps = StoreState & ActiveDispatchProps & ActiveProps;

export class UnboundActive extends React.Component<AllProps> {
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
      <MainLayout activePage={Pages.activeCampaigns}>
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
            datasets: map(data.active_pacts, row => ({
              label: row.campaign_name,
              borderColor: '#B6F7C1',
              borderWidth: 1,
              hoverBorderColor: '#B6F7C1',
              data: [row.activated_times]
            }))
          }}
        />
        <div className='eos-header-holder-small'>
          <h1 className='header'>My Active Bounties</h1>
        </div>
        <CampaignTable data={data} />
      </MainLayout>
    );
  }
}

const mapStateToProps = (state: State) => {
  return state.campaigns;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      shouldFetchTable: fetchTable,
      shouldInvalidateCache: invalidateCache
    },
    dispatch
  );

export const Active = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnboundActive);
