import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { Party } from '../../models/party.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as partiesActions from './parties.actions';

export const chunkName = EntityChunkName.parties;

export type State = EntityState<Party>;

export const adapter: EntityAdapter<Party> = createEntityAdapter<Party>();

export const initialState = adapter.getInitialState();

const partiesReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(partiesActions.setParties, (state, { parties }) => {
    return adapter.setAll(parties, state);
  }),

  on(partiesActions.upsertParty, (state, { party }) => {
    return adapter.upsertOne(party, state);
  }),

  on(partiesActions.removeParty, (state, { partyId }) => {
    return adapter.removeOne(partyId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return partiesReducer(state, action);
}
