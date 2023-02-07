import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CaseParty } from '../../models/case-party.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as casePartiesActions from './case-parties.actions';

export const chunkName = EntityChunkName.caseParties;

export type State = EntityState<CaseParty>;

export const adapter: EntityAdapter<CaseParty> =
  createEntityAdapter<CaseParty>();

export const initialState = adapter.getInitialState();

const casePartiesReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(casePartiesActions.setCaseParties, (state, { caseParties }) => {
    return adapter.setAll(caseParties, state);
  }),

  on(casePartiesActions.upsertCaseParty, (state, { caseParty }) => {
    return adapter.upsertOne(caseParty, state);
  }),

  on(casePartiesActions.removeCaseParty, (state, { casePartyId }) => {
    return adapter.removeOne(casePartyId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return casePartiesReducer(state, action);
}
