export interface Campaign {
  unique_id: number;
  target_users: number;
  activated_users: number;
  campaign_name: string;
  user_reward: {
    symbol: string;
    amount: number;
  };
}

export enum CacheStatus {
  UP_TO_DATE = 'UP_TO_DATE',
  BEHIND = 'BEHIND',
  FETCHING = 'FETCHING'
}

export interface DataType {
  active_campaigns: Campaign[];
}

export interface Storable {
  data: DataType;
  invalidateCache: () => void;
}

export interface StoreProps {
  defaultData: DataType;
  render: (
    props: { data: DataType; invalidateCache: () => void }
  ) => React.ReactElement<Storable>;
}

export interface StoreState {
  data: DataType;
  cacheStatus: CacheStatus;
}

export interface State {
  campaigns: StoreState;
}
