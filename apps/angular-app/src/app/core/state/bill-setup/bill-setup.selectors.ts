import { createSelector } from '@ngrx/store';
import { GlobalState } from './../reducers';
import * as billSetupReducer from './bill-setup.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): billSetupReducer.State =>
  state[billSetupReducer.chunkName];

export const getBillSetup = createSelector(
  getState,
  (state) => state.billSetup,
);
