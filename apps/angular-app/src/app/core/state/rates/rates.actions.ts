import { createAction, props } from '@ngrx/store';
import { Rate } from '../../models/rate.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Rates';

export enum ActionNames {
  setRates = 'Set Rates',
  upsertRate = 'Upsert Rate',
  upsertRates = 'Upsert Rates',
  removeRate = 'Remove Rate',
}

export const setRates = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setRates),
  props<{ rates: Rate[] }>(),
);

export const upsertRate = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertRate),
  props<{ rate: Rate }>(),
);

export const upsertRates = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertRates),
  props<{ rates: Rate[] }>(),
);

export const removeRate = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeRate),
  props<{ rateId: string }>(),
);
