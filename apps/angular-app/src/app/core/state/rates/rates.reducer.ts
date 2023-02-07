import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { Rate } from '../../models/rate.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as ratesActions from './rates.actions';

export const chunkName = EntityChunkName.rates;

export type State = EntityState<Rate>;

export const adapter: EntityAdapter<Rate> = createEntityAdapter<Rate>();

export const initialState = adapter.getInitialState();

const ratesReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(ratesActions.setRates, (state, { rates }) => {
    return adapter.setAll(rates, state);
  }),

  on(ratesActions.upsertRate, (state, { rate }) => {
    return adapter.upsertOne(rate, state);
  }),

  on(ratesActions.upsertRates, (state, { rates }) => {
    return adapter.upsertMany(rates, state);
  }),

  on(ratesActions.removeRate, (state, { rateId }) => {
    return adapter.removeOne(rateId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return ratesReducer(state, action);
}
