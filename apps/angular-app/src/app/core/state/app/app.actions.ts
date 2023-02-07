import { createAction } from '@ngrx/store';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'App';

export enum ActionNames {
  quitAppAttempted = 'Quit App Attempted',
  quitAppAuthorised = 'Quit App Authorised',
}

export const quitAppAttempted = createAction(
  ActionsService.compileActionName(prefix, ActionNames.quitAppAttempted),
);

export const quitAppAuthorised = createAction(
  ActionsService.compileActionName(prefix, ActionNames.quitAppAuthorised),
);
