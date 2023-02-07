import { createAction, props } from '@ngrx/store';
import { Narrative } from '../../models/narrative.model';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Narrative';

export enum ActionNames {
  setNarrative = 'Set Narrative',
}

export const setNarrative = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setNarrative),
  props<{ narrative: Narrative }>(),
);
