import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { AsyncState } from './../../models/async-state.model';
import { AsyncStatus } from './../../models/async-status.model';
import * as evoFileActions from './evo-file.actions';

export const chunkName = EntityChunkName.evoFile;

export interface State {
  openingAsyncState: AsyncState;
  savingAsyncState: AsyncState;

  filePath?: string;
  hash?: string;
}

export const initialState: State = {
  openingAsyncState: { status: AsyncStatus.ready },
  savingAsyncState: { status: AsyncStatus.ready },
};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    evoFileActions.newEvoFile,
    (state): State => ({
      ...state,
      filePath: '',
      hash: '',
    }),
  ),

  on(
    evoFileActions.openEvoFile,
    (state): State => ({
      ...state,
      openingAsyncState: { status: AsyncStatus.inProgress },
    }),
  ),

  on(
    evoFileActions.openEvoFileSuccess,
    (state, props): State => ({
      ...state,
      openingAsyncState: { status: AsyncStatus.success },
      filePath: props.fileData.filePath,
      hash: props.hash,
    }),
  ),

  on(
    evoFileActions.openEvoFileFailure,
    (state): State => ({
      ...state,
      openingAsyncState: { status: AsyncStatus.error },
    }),
  ),

  on(
    evoFileActions.saveEvoFile,
    (state): State => ({
      ...state,
      savingAsyncState: { status: AsyncStatus.inProgress },
    }),
  ),

  on(
    evoFileActions.saveEvoFileSuccess,
    (state, props): State => ({
      ...state,
      savingAsyncState: { status: AsyncStatus.success },
      filePath: props.fileData.filePath,
      hash: props.hash,
    }),
  ),

  on(
    evoFileActions.saveEvoFileFailure,
    (state): State => ({
      ...state,
      savingAsyncState: { status: AsyncStatus.error },
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}
