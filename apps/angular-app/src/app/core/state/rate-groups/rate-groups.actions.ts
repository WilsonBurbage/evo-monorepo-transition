import { createAction, props } from '@ngrx/store';
import { RateGroup } from '../../models/rate-group.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Rate Groups';

export enum ActionNames {
  setRateGroups = 'Set Rate Groups',
  upsertRateGroup = 'Upsert Rate Group',
  removeRateGroup = 'Remove Rate Group',
  generateFeeEarnersForEmptyRateGroups = 'Generate Fee Earners For Empty Rate Groups',
}

export const setRateGroups = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setRateGroups),
  props<{ rateGroups: RateGroup[] }>(),
);

export const upsertRateGroup = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertRateGroup),
  props<{ rateGroup: RateGroup }>(),
);

export const removeRateGroup = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeRateGroup),
  props<{ rateGroupId: string }>(),
);

export const generateFeeEarnersForEmptyRateGroups = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.generateFeeEarnersForEmptyRateGroups,
  ),
);
