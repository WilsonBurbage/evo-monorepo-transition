import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { Narrative } from '../../models/narrative.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import * as narrativeActions from './narrative.actions';

export const chunkName = EntityChunkName.narrative;

export interface State {
  narrative?: Narrative;
}

export const initialState: State = {};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    narrativeActions.setNarrative,
    (state, props): State => ({
      ...state,
      narrative: props.narrative,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}
