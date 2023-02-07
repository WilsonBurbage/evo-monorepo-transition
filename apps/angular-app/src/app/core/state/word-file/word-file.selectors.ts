import { createSelector } from '@ngrx/store';
import { GlobalState } from './../reducers';
import * as wordFileReducer from './word-file.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): wordFileReducer.State =>
  state[wordFileReducer.chunkName];

export const getExporting = createSelector(
  getState,
  (state) => state.exportingAsyncState,
);
