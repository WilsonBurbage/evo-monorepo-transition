import { createSelector } from '@ngrx/store';
import { generateAsyncStatusSelectors } from './../async-state/async-state.selectors';
import { GlobalState } from './../reducers';
import * as authenticationReducer from './authentication.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): authenticationReducer.State =>
  state[authenticationReducer.chunkName];

export const getAuthenticated = createSelector(
  getState,
  (state) => state.authenticated,
);

export const getAuthentication = createSelector(
  getState,
  (state) => state.authenticationAsyncState,
);

export const getAuthenticationStatuses =
  generateAsyncStatusSelectors(getAuthentication);

export const getAuthenticationKeyCheck = createSelector(
  getState,
  (state) => state.authenticationKeyCheckAsyncState,
);

export const getAuthenticationKeyCheckStatuses = generateAsyncStatusSelectors(
  getAuthenticationKeyCheck,
);
