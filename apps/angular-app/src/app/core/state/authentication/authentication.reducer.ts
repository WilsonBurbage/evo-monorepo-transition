import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { AsyncState } from './../../models/async-state.model';
import { AsyncStatus } from './../../models/async-status.model';
import * as authenticationActions from './authentication.actions';

export const chunkName = EntityChunkName.authentication;

export interface State {
  authenticated: boolean;
  authenticationAsyncState: AsyncState;
  authenticationKeyCheckAsyncState: AsyncState;
}

export const initialState: State = {
  authenticated: false,
  authenticationAsyncState: {
    status: AsyncStatus.ready,
  },
  authenticationKeyCheckAsyncState: {
    status: AsyncStatus.ready,
  },
};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    authenticationActions.authenticate,
    (state): State => ({
      ...state,
      authenticationAsyncState: {
        status: AsyncStatus.inProgress,
        errorCode: undefined,
      },
    }),
  ),

  on(
    authenticationActions.authenticateSuccess,
    (state): State => ({
      ...state,
      authenticated: true,
      authenticationAsyncState: {
        status: AsyncStatus.success,
      },
    }),
  ),

  on(
    authenticationActions.authenticateFailure,
    (state, props): State => ({
      ...state,
      authenticated: false,
      authenticationAsyncState: {
        status: AsyncStatus.error,
        errorCode: props.errorCode,
      },
    }),
  ),

  on(
    authenticationActions.checkAuthenticationKey,
    (state): State => ({
      ...state,
      authenticationKeyCheckAsyncState: {
        ...state.authenticationKeyCheckAsyncState,
        status: AsyncStatus.inProgress,
        errorCode: undefined,
      },
    }),
  ),

  on(
    authenticationActions.checkAuthenticationKeySuccess,
    (state): State => ({
      ...state,
      authenticated: true,
      authenticationKeyCheckAsyncState: {
        ...state.authenticationKeyCheckAsyncState,
        status: AsyncStatus.success,
      },
    }),
  ),

  on(
    authenticationActions.checkAuthenticationKeyFailure,
    (state, props): State => ({
      ...state,
      authenticated: false,
      authenticationKeyCheckAsyncState: {
        ...state.authenticationKeyCheckAsyncState,
        status: AsyncStatus.error,
        errorCode: props.errorCode,
      },
    }),
  ),

  on(
    authenticationActions.deauthenticate,
    (): State => ({
      ...initialState,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}
