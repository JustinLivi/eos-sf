import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import { fetchTableMiddleware } from '../middleware/fetchTables';
import { reducers } from '../reducers';
import { CacheStatus } from './stateDefinition';

export const store = createStore(
  reducers,
  {
    campaigns: {
      cacheStatus: CacheStatus.BEHIND,
      data: {
        active_pacts: []
      }
    }
  },
  applyMiddleware(fetchTableMiddleware, logger)
);
