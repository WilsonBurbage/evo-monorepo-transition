import { createAction, props } from '@ngrx/store';
import { Disbursement } from '../../models/disbursement.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Disbursements';

export enum ActionNames {
  setDisbursements = 'Set Disbursements',
  upsertDisbursement = 'Upsert Disbursement',
  removeDisbursement = 'Remove Disbursement',
}

export const setDisbursements = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setDisbursements),
  props<{ disbursements: Disbursement[] }>(),
);

export const upsertDisbursement = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertDisbursement),
  props<{ disbursement: Disbursement }>(),
);

export const removeDisbursement = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeDisbursement),
  props<{ disbursementId: string }>(),
);
