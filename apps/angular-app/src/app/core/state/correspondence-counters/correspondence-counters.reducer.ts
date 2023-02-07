import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CorrespondenceCounter } from '../../models/correspondence-counter.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as correspondenceCountersActions from './correspondence-counters.actions';

export const chunkName = EntityChunkName.correspondenceCounters;

export type State = EntityState<CorrespondenceCounter>;

export const adapter: EntityAdapter<CorrespondenceCounter> =
  createEntityAdapter<CorrespondenceCounter>();

export const initialState = adapter.getInitialState();

const correspondenceCountersReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(
    correspondenceCountersActions.setCorrespondenceCounters,
    (state, { correspondenceCounters }) => {
      return adapter.setAll(correspondenceCounters, state);
    },
  ),

  on(
    correspondenceCountersActions.upsertCorrespondenceCounter,
    (state, { correspondenceCounter }) => {
      return adapter.upsertOne(correspondenceCounter, state);
    },
  ),

  on(
    correspondenceCountersActions.upsertCorrespondenceCounters,
    (state, { correspondenceCounters }) => {
      return adapter.upsertMany(correspondenceCounters, state);
    },
  ),

  on(
    correspondenceCountersActions.removeCorrespondenceCounter,
    (state, { correspondenceCounterId }) => {
      return adapter.removeOne(correspondenceCounterId, state);
    },
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return correspondenceCountersReducer(state, action);
}
