import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { SuccessFee } from '../../models/success-fee.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as successFeesActions from './success-fees.actions';

export const chunkName = EntityChunkName.successFees;

export type State = EntityState<SuccessFee>;

export const adapter: EntityAdapter<SuccessFee> =
  createEntityAdapter<SuccessFee>();

export const initialState = adapter.getInitialState();

const successFeesReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(successFeesActions.setSuccessFees, (state, { successFees }) => {
    return adapter.setAll(successFees, state);
  }),

  on(successFeesActions.upsertSuccessFee, (state, { successFee }) => {
    return adapter.upsertOne(successFee, state);
  }),

  on(successFeesActions.removeSuccessFee, (state, { successFeeId }) => {
    return adapter.removeOne(successFeeId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return successFeesReducer(state, action);
}
