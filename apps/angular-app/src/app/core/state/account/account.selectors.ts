import { createSelector } from '@ngrx/store';
import { generateAsyncStatusSelectors } from './../async-state/async-state.selectors';
import { GlobalState } from './../reducers';
import * as accountReducer from './account.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): accountReducer.State =>
  state[accountReducer.chunkName];

export const getAccountDetails = createSelector(
  getState,
  (state) => state.accountDetailsAsyncState,
);

export const getAccountDetailsStatuses =
  generateAsyncStatusSelectors(getAccountDetails);

export const getAccount = createSelector(getState, (state) => state.account);

export const getOrganisation = createSelector(
  getState,
  (state) => state.organisation,
);
