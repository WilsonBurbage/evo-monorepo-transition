import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { RateGroup } from '../../models/rate-group.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as rateGroupsActions from './rate-groups.actions';

export const chunkName = EntityChunkName.rateGroups;

export type State = EntityState<RateGroup>;

export const adapter: EntityAdapter<RateGroup> =
  createEntityAdapter<RateGroup>();

export const initialState = adapter.getInitialState();

const rateGroupsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(rateGroupsActions.setRateGroups, (state, { rateGroups }) => {
    return adapter.setAll(rateGroups, state);
  }),

  on(rateGroupsActions.upsertRateGroup, (state, { rateGroup }) => {
    return adapter.upsertOne(rateGroup, state);
  }),

  on(rateGroupsActions.removeRateGroup, (state, { rateGroupId }) => {
    return adapter.removeOne(rateGroupId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return rateGroupsReducer(state, action);
}
