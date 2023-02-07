import { Account, Organisation } from '@evo-monorepo/shared';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { AsyncState } from './../../models/async-state.model';
import { AsyncStatus } from './../../models/async-status.model';
import * as accountActions from './account.actions';

export const chunkName = EntityChunkName.account;

export interface State {
  accountDetailsAsyncState: AsyncState;
  account?: Account;
  organisation?: Organisation;
}

export const initialState: State = {
  accountDetailsAsyncState: {
    status: AsyncStatus.ready,
  },
};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    accountActions.getAccountDetails,
    (state): State => ({
      ...state,
      accountDetailsAsyncState: {
        status: AsyncStatus.inProgress,
        errorCode: undefined,
      },
    })
  ),

  on(
    accountActions.getAccountDetailsSuccess,
    (state, props): State => ({
      ...state,
      accountDetailsAsyncState: {
        status: AsyncStatus.success,
      },
      account: props.accountDetailsResponse.account,
      organisation: props.accountDetailsResponse.organisation,
    })
  ),

  on(
    accountActions.getAccountDetailsFailure,
    (state, props): State => ({
      ...state,
      accountDetailsAsyncState: {
        status: AsyncStatus.error,
        errorCode: props.errorCode,
      },
    })
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}
