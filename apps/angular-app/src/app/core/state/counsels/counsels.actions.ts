import { createAction, props } from '@ngrx/store';
import { Counsel } from '../../models/counsel.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Counsels';

export enum ActionNames {
  setCounsels = 'Set Counsels',
  upsertCounsel = 'Upsert Counsel',
  removeCounsel = 'Remove Counsel',
}

export const setCounsels = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setCounsels),
  props<{ counsels: Counsel[] }>(),
);

export const upsertCounsel = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertCounsel),
  props<{ counsel: Counsel }>(),
);

export const removeCounsel = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeCounsel),
  props<{ counselId: string }>(),
);
