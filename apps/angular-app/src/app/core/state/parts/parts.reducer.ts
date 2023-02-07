import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { Part } from '../../models/part.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as partsActions from './parts.actions';

export const chunkName = EntityChunkName.parts;

export type State = EntityState<Part>;

export const adapter: EntityAdapter<Part> = createEntityAdapter<Part>();

export const initialState = adapter.getInitialState();

const partsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(partsActions.setParts, (state, { parts }) => {
    return adapter.setAll(parts, state);
  }),

  on(partsActions.upsertPart, (state, { part }) => {
    return adapter.upsertOne(part, state);
  }),

  on(partsActions.removePart, (state, { partId }) => {
    return adapter.removeOne(partId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return partsReducer(state, action);
}
