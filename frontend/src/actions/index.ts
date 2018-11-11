export enum ActionTypes {
  InvalidateCache = 'InvalidateCache',
  FetchTable = 'FetchTable',
  TableFetched = 'TableFetched'
}

export const invalidateCache = () => ({
  type: ActionTypes.InvalidateCache
});

export const fetchTable = () => ({
  type: ActionTypes.FetchTable
});
