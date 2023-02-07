import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Disbursement } from '../../models/disbursement.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as disbursementsActions from './disbursements.actions';

export const chunkName = EntityChunkName.disbursements;

export type State = EntityState<Disbursement>;

export const adapter: EntityAdapter<Disbursement> =
  createEntityAdapter<Disbursement>();

export const initialState = adapter.getInitialState();

const disbursementsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(disbursementsActions.setDisbursements, (state, { disbursements }) => {
    return adapter.setAll(disbursements, state);
  }),

  on(disbursementsActions.upsertDisbursement, (state, { disbursement }) => {
    return adapter.upsertOne(disbursement, state);
  }),

  on(disbursementsActions.removeDisbursement, (state, { disbursementId }) => {
    return adapter.removeOne(disbursementId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return disbursementsReducer(state, action);
}
