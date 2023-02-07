import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { FeeEarner } from '../../models/fee-earner.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as feeEarnersActions from './fee-earners.actions';

export const chunkName = EntityChunkName.feeEarners;

export type State = EntityState<FeeEarner>;

export const adapter: EntityAdapter<FeeEarner> =
  createEntityAdapter<FeeEarner>();

export const initialState = adapter.getInitialState();

const feeEarnersReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(feeEarnersActions.setFeeEarners, (state, { feeEarners }) => {
    return adapter.setAll(feeEarners, state);
  }),

  on(feeEarnersActions.upsertFeeEarner, (state, { feeEarner }) => {
    return adapter.upsertOne(feeEarner, state);
  }),

  on(feeEarnersActions.upsertFeeEarners, (state, { feeEarners }) => {
    return adapter.upsertMany(feeEarners, state);
  }),

  on(feeEarnersActions.removeFeeEarner, (state, { feeEarnerId }) => {
    return adapter.removeOne(feeEarnerId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return feeEarnersReducer(state, action);
}
