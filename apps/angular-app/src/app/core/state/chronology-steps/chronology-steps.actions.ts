import { createAction, props } from '@ngrx/store';
import { ChronologyStep } from '../../models/chronology-step.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Chronology Steps';

export enum ActionNames {
  setChronologySteps = 'Set Chronology Steps',
  upsertChronologyStep = 'Upsert Chronology Step',
  removeChronologyStep = 'Remove Chronology Step',
}

export const setChronologySteps = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setChronologySteps),
  props<{ chronologySteps: ChronologyStep[] }>(),
);

export const upsertChronologyStep = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertChronologyStep),
  props<{ chronologyStep: ChronologyStep }>(),
);

export const removeChronologyStep = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeChronologyStep),
  props<{ chronologyStepId: string }>(),
);
