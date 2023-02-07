import { createAction, props } from '@ngrx/store';
import { Solicitor } from '../../models/solicitor.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Solicitor Lookup';

export enum ActionNames {
  setSolicitors = 'Set Solicitors',

  lookup = 'Lookup',
  lookupSuccess = 'Lookup Success',
  lookupFailure = 'Lookup Failure',
}

export const setSolicitors = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setSolicitors),
  props<{ solicitors: Solicitor[] }>(),
);

export const lookup = createAction(
  ActionsService.compileActionName(prefix, ActionNames.lookup),
  props<{ searchString: string }>(),
);

export const lookupSuccess = createAction(
  ActionsService.compileActionName(prefix, ActionNames.lookupSuccess),
  props<{ solicitors: Solicitor[] }>(),
);

export const lookupFailure = createAction(
  ActionsService.compileActionName(prefix, ActionNames.lookupFailure),
  props<{ errorCode: number }>(),
);
