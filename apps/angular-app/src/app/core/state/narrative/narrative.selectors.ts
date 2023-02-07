import { createSelector } from '@ngrx/store';
import { GlobalState } from './../reducers';
import * as narrativeReducer from './narrative.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): narrativeReducer.State =>
  state[narrativeReducer.chunkName];

export const getNarrative = createSelector(
  getState,
  (state) => state.narrative,
);
