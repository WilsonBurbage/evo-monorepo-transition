import { createAction, props } from '@ngrx/store';
import { Enhancement } from '../../models/enhancement.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Enhancements';

export enum ActionNames {
  setEnhancements = 'Set Enhancements',
  upsertEnhancement = 'Upsert Enhancement',
  removeEnhancement = 'Remove Enhancement',
}

export const setEnhancements = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setEnhancements),
  props<{ enhancements: Enhancement[] }>(),
);

export const upsertEnhancement = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertEnhancement),
  props<{ enhancement: Enhancement }>(),
);

export const removeEnhancement = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeEnhancement),
  props<{ enhancementId: string }>(),
);
