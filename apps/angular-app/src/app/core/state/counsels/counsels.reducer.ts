import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Counsel } from '../../models/counsel.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as counselsActions from './counsels.actions';

export const chunkName = EntityChunkName.counsels;

export type State = EntityState<Counsel>;

export const adapter: EntityAdapter<Counsel> = createEntityAdapter<Counsel>();

export const initialState = adapter.getInitialState();

const counselsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(counselsActions.setCounsels, (state, { counsels }) => {
    return adapter.setAll(counsels, state);
  }),

  on(counselsActions.upsertCounsel, (state, { counsel }) => {
    return adapter.upsertOne(counsel, state);
  }),

  on(counselsActions.removeCounsel, (state, { counselId }) => {
    return adapter.removeOne(counselId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return counselsReducer(state, action);
}
