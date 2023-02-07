import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Enhancement } from '../../models/enhancement.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as enhancementsActions from './enhancements.actions';

export const chunkName = EntityChunkName.enhancements;

export type State = EntityState<Enhancement>;

export const adapter: EntityAdapter<Enhancement> =
  createEntityAdapter<Enhancement>();

export const initialState = adapter.getInitialState();

const enhancementsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(enhancementsActions.setEnhancements, (state, { enhancements }) => {
    return adapter.setAll(enhancements, state);
  }),

  on(enhancementsActions.upsertEnhancement, (state, { enhancement }) => {
    return adapter.upsertOne(enhancement, state);
  }),

  on(enhancementsActions.removeEnhancement, (state, { enhancementId }) => {
    return adapter.removeOne(enhancementId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return enhancementsReducer(state, action);
}
