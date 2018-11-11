import { combineReducers } from 'redux';

import { ActionTypes } from '../actions';
import { CacheStatus, Campaign, StoreState } from '../store/stateDefinition';

export const campaigns = (
  state: StoreState = {
    cacheStatus: CacheStatus.BEHIND,
    data: {
      active_pacts: []
    }
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.InvalidateCache:
      return {
        ...state,
        cacheStatus: CacheStatus.BEHIND
      };
    case ActionTypes.FetchTable:
      return {
        ...state,
        cacheStatus: CacheStatus.FETCHING
      };
    case ActionTypes.TableFetched:
      console.log(action.data);
      return {
        ...state,
        data: {
          cacheStatus: CacheStatus.UP_TO_DATE,
          active_pacts: action.data as Campaign[]
        }
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  campaigns
});
