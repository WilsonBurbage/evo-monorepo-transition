import { createAction, props } from '@ngrx/store';
import { FeeEarner } from '../../models/fee-earner.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Fee Earners';

export enum ActionNames {
  setFeeEarners = 'Set Fee Earners',
  upsertFeeEarner = 'Upsert Fee Earner',
  upsertFeeEarners = 'Upsert Fee Earners',
  removeFeeEarner = 'Remove Fee Earner',
}

export const setFeeEarners = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setFeeEarners),
  props<{ feeEarners: FeeEarner[] }>(),
);

export const upsertFeeEarner = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertFeeEarner),
  props<{ feeEarner: FeeEarner }>(),
);

export const upsertFeeEarners = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertFeeEarners),
  props<{ feeEarners: FeeEarner[] }>(),
);

export const removeFeeEarner = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeFeeEarner),
  props<{ feeEarnerId: string }>(),
);
