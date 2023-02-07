import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { ExportDocumentType } from '../../models/export-document-type.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { AsyncState } from './../../models/async-state.model';
import { AsyncStatus } from './../../models/async-status.model';
import * as wordFileActions from './word-file.actions';

export const chunkName = EntityChunkName.wordFile;

export interface State {
  exportDocumentType?: ExportDocumentType;
  exportingAsyncState: AsyncState;
}

export const initialState: State = {
  exportingAsyncState: { status: AsyncStatus.ready },
};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    wordFileActions.exportDocumentToWord,
    (state, props): State => ({
      ...state,

      exportDocumentType: props.exportDocumentType,
      exportingAsyncState: { status: AsyncStatus.inProgress },
    }),
  ),

  on(
    wordFileActions.exportDocumentToWordSuccess,
    (state): State => ({
      ...state,

      exportingAsyncState: { status: AsyncStatus.success },
    }),
  ),

  on(
    wordFileActions.exportDocumentToWordFailure,
    (state): State => ({
      ...state,

      exportingAsyncState: { status: AsyncStatus.error },
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}
