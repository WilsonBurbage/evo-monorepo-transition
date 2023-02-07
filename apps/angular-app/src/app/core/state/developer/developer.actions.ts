import { createAction, props } from '@ngrx/store';
import { GlobalState } from '../reducers';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Developer';

export enum ActionNames {
  setEntireState = 'Set Entire State',

  saveDiagnostics = 'Save Diagnostics',
  saveDiagnosticsSuccess = 'Save Diagnostics Success',
  saveDiagnosticsFailure = 'Save Diagnostics Failure',
}

export const setEntireState = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setEntireState),
  props<{ entireState: GlobalState }>(),
);

export const saveDiagnostics = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveDiagnostics),
);

export const saveDiagnosticsSuccess = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveDiagnosticsSuccess),
);

export const saveDiagnosticsFailure = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveDiagnosticsFailure),
);
