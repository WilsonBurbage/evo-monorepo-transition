import { createAction, props } from '@ngrx/store';
import { Part } from '../../models/part.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Parts';

export enum ActionNames {
  setParts = 'Set Parts',
  upsertPart = 'Upsert Part',
  removePart = 'Remove Part',
}

export const setParts = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setParts),
  props<{ parts: Part[] }>(),
);

export const upsertPart = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertPart),
  props<{ part: Part }>(),
);

export const removePart = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removePart),
  props<{ partId: string }>(),
);
