import { createSelector } from '@ngrx/store';
import { GlobalState } from './../reducers';
import * as uiReducer from './ui.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): uiReducer.State =>
  state[uiReducer.chunkName];

export const getBillIsFullyLoaded = createSelector(
  getState,
  (state) => state.billIsFullyLoaded,
);

export const getBillSelectorsEnabled = createSelector(
  getState,
  (state) => state.billSelectorsEnabled,
);

export const getActivePartId = createSelector(
  getState,
  (state) => state.activePartId,
);

export const getActiveFeeEarnerId = createSelector(
  getState,
  (state) => state.activeFeeEarnerId,
);

export const getActivePreviewExportDocumentType = createSelector(
  getState,
  (state) => state.activePreviewExportDocumentType,
);

export const getStackItems = createSelector(
  getState,
  (state) => state.stackWidgets,
);
