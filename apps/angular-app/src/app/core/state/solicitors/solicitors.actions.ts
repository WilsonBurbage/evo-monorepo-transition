import { createAction, props } from '@ngrx/store';
import { Solicitor } from '../../models/solicitor.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Solicitors';

export enum ActionNames {
  setSolicitors = 'Set Solicitors',
  upsertSolicitor = 'Upsert Solicitor',
  upsertSolicitors = 'Upsert Solicitors',
  removeSolicitor = 'Remove Solicitor',
}

export const setSolicitors = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setSolicitors),
  props<{ solicitors: Solicitor[] }>(),
);

export const upsertSolicitor = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertSolicitor),
  props<{ solicitor: Solicitor }>(),
);

export const upsertSolicitors = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertSolicitors),
  props<{ solicitors: Solicitor[] }>(),
);

export const removeSolicitor = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeSolicitor),
  props<{ solicitorId: string }>(),
);
