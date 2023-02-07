import { createAction, props } from '@ngrx/store';
import { SuccessFee } from '../../models/success-fee.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Success Fees';

export enum ActionNames {
  setSuccessFees = 'Set Success Fees',
  upsertSuccessFee = 'Upsert Success Fee',
  removeSuccessFee = 'Remove Success Fee',
}

export const setSuccessFees = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setSuccessFees),
  props<{ successFees: SuccessFee[] }>(),
);

export const upsertSuccessFee = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertSuccessFee),
  props<{ successFee: SuccessFee }>(),
);

export const removeSuccessFee = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeSuccessFee),
  props<{ successFeeId: string }>(),
);
