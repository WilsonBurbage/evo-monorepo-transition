import { AuthenticationCredentials } from '@evo-monorepo/shared';
import { createAction, props } from '@ngrx/store';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Authentication';

export enum ActionNames {
  authenticate = 'Authenticate',
  authenticateSuccess = 'Authenticate Success',
  authenticateFailure = 'Authenticate Failure',
  checkAuthenticationKey = 'Check Authentication Key',
  checkAuthenticationKeySuccess = 'Check Authentication Key Success',
  checkAuthenticationKeyFailure = 'Check Authentication Key Failure',
  deauthenticate = 'Deauthenticate',
}

export const authenticate = createAction(
  ActionsService.compileActionName(prefix, ActionNames.authenticate),
  props<{ authenticationCredentials: AuthenticationCredentials }>()
);

export const authenticateSuccess = createAction(
  ActionsService.compileActionName(prefix, ActionNames.authenticateSuccess)
);

export const authenticateFailure = createAction(
  ActionsService.compileActionName(prefix, ActionNames.authenticateFailure),
  props<{ errorCode: number }>()
);

export const checkAuthenticationKey = createAction(
  ActionsService.compileActionName(prefix, ActionNames.checkAuthenticationKey)
);

export const checkAuthenticationKeySuccess = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.checkAuthenticationKeySuccess
  )
);

export const checkAuthenticationKeyFailure = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.checkAuthenticationKeyFailure
  ),
  props<{ errorCode: number }>()
);

export const deauthenticate = createAction(
  ActionsService.compileActionName(prefix, ActionNames.deauthenticate)
);
