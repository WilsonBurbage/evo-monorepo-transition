import { createSelector } from '@ngrx/store';
import { GlobalState } from './../reducers';
import * as coverSheetDetailsReducer from './cover-sheet-details.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): coverSheetDetailsReducer.State =>
  state[coverSheetDetailsReducer.chunkName];

export const getCoverSheetDetails = createSelector(
  getState,
  (state) => state.coverSheetDetails,
);
