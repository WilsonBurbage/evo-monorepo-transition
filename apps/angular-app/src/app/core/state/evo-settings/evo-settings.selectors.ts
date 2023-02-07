import { createSelector } from '@ngrx/store';
import { EvoSettings } from '../../models/evo-settings.model';
import { GlobalState } from './../reducers';
import * as textReplacementsSelectors from './../text-replacements/text-replacements.selectors';
import * as evoSettingsReducer from './evo-settings.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): evoSettingsReducer.State =>
  state[evoSettingsReducer.chunkName];

export const getOpening = createSelector(
  getState,
  (state) => state.openingAsyncState,
);

export const getCompiledEvoSettings = createSelector(
  textReplacementsSelectors.entitySelectors.selectAll,

  (textReplacements): EvoSettings => ({
    textReplacements,
    version: window.bridge.constants.frameworkDetails.evo.version,
  }),
);
