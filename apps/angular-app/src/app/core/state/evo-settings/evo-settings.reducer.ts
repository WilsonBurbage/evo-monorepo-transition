import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { AsyncState } from './../../models/async-state.model';
import { AsyncStatus } from './../../models/async-status.model';
import * as evoSettingsActions from './evo-settings.actions';

export const chunkName = EntityChunkName.evoSettings;

export interface State {
  openingAsyncState: AsyncState;
  savingAsyncState: AsyncState;
}

export const initialState: State = {
  openingAsyncState: { status: AsyncStatus.ready },
  savingAsyncState: { status: AsyncStatus.ready },
};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    evoSettingsActions.openEvoSettings,
    (state): State => ({
      ...state,
      openingAsyncState: { status: AsyncStatus.inProgress },
    }),
  ),

  on(
    evoSettingsActions.openEvoSettingsSuccess,
    (state): State => ({
      ...state,
      openingAsyncState: { status: AsyncStatus.success },
    }),
  ),

  on(
    evoSettingsActions.openEvoSettingsFailure,
    (state): State => ({
      ...state,
      openingAsyncState: { status: AsyncStatus.error },
    }),
  ),

  on(
    evoSettingsActions.saveEvoSettings,
    (state): State => ({
      ...state,
      savingAsyncState: { status: AsyncStatus.inProgress },
    }),
  ),

  on(
    evoSettingsActions.saveEvoSettingsSuccess,
    (state): State => ({
      ...state,
      savingAsyncState: { status: AsyncStatus.success },
    }),
  ),

  on(
    evoSettingsActions.saveEvoSettingsFailure,
    (state): State => ({
      ...state,
      savingAsyncState: { status: AsyncStatus.error },
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}
