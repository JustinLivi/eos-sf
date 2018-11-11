export interface Campaign {
  unique_id: number;
  complete_threshold: number;
  activated_times: number;
  name: string;
}

export enum CacheStatus {
  UP_TO_DATE = 'UP_TO_DATE',
  BEHIND = 'BEHIND',
  FETCHING = 'FETCHING'
}

export interface DataType {
  active_pacts: Campaign[];
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
