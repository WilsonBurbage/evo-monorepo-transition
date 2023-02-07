import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { Solicitor } from '../../models/solicitor.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as solicitorsActions from './solicitors.actions';

export const chunkName = EntityChunkName.solicitors;

export type State = EntityState<Solicitor>;

export const adapter: EntityAdapter<Solicitor> =
  createEntityAdapter<Solicitor>();

export const initialState = adapter.getInitialState();

const solicitorsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(solicitorsActions.setSolicitors, (state, { solicitors }) => {
    return adapter.setAll(solicitors, state);
  }),

  on(solicitorsActions.upsertSolicitor, (state, { solicitor }) => {
    return adapter.upsertOne(solicitor, state);
  }),

  on(solicitorsActions.upsertSolicitors, (state, { solicitors }) => {
    return adapter.upsertMany(solicitors, state);
  }),

  on(solicitorsActions.removeSolicitor, (state, { solicitorId }) => {
    return adapter.removeOne(solicitorId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return solicitorsReducer(state, action);
}
