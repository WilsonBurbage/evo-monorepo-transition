import { Action, createReducer, on } from '@ngrx/store';

import { CoverSheetDetails } from '../../models/cover-sheet-details.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import * as coverSheetDetailsActions from './cover-sheet-details.actions';

export const chunkName = EntityChunkName.coverSheetDetails;

export interface State {
  coverSheetDetails?: CoverSheetDetails;
}

export const initialState: State = {};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    coverSheetDetailsActions.setCoverSheetDetails,
    (state, props): State => ({
      ...state,
      coverSheetDetails: props.coverSheetDetails,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}
