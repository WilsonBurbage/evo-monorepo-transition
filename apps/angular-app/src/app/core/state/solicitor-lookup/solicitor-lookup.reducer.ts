import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { AsyncState } from '../../models/async-state.model';
import { AsyncStatus } from '../../models/async-status.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { Solicitor } from '../../models/solicitor.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as solicitorLookupActions from './solicitor-lookup.actions';

export const chunkName = EntityChunkName.solicitorLookup;

export interface State extends EntityState<Solicitor> {
  lookupAsyncState?: AsyncState;
}

export const adapter: EntityAdapter<Solicitor> =
  createEntityAdapter<Solicitor>();

export const initialState: State = adapter.getInitialState({
  lookup: {
    status: AsyncStatus.ready,
  },
});

const solicitorLookupReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(solicitorLookupActions.setSolicitors, (state, { solicitors }) => {
    return adapter.setAll(solicitors, state);
  }),

  on(
    solicitorLookupActions.lookup,
    (state): State => ({
      ...state,
      lookupAsyncState: {
        status: AsyncStatus.inProgress,
        errorCode: undefined,
      },
    }),
  ),

  on(
    solicitorLookupActions.lookupSuccess,
    (state): State => ({
      ...state,
      lookupAsyncState: {
        status: AsyncStatus.success,
      },
    }),
  ),

  on(
    solicitorLookupActions.lookupFailure,
    (state, props): State => ({
      ...state,
      lookupAsyncState: {
        status: AsyncStatus.error,
        errorCode: props.errorCode,
      },
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return solicitorLookupReducer(state, action);
}
