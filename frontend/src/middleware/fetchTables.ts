import { JsonRpc } from 'eosjs';
import { get } from 'lodash';
import { Middleware } from 'redux';

import { ActionTypes } from '../actions';

const owner = 'pactacc';
const endpoint = 'http://localhost:8888';

export const fetchTableMiddleware: Middleware = store => next => action => {
  if (action.type === ActionTypes.FetchTable) {
    const rpc = new JsonRpc(endpoint);
    rpc
      .get_table_rows({
        json: true,
        code: owner, // contract who owns the table
        scope: owner, // scope of the table
        table: 'users', // name of the table as specified by the contract abi
        limit: 100
      })
      .then(result => {
        next({
          type: ActionTypes.TableFetched,
          data: get(result, 'rows[0].active_pacts', [])
        });
      });
  }
  next(action);
};
