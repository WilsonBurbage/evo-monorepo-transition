import { createAction, props } from '@ngrx/store';
import { BillSetup } from '../../models/bill-setup.model';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Bill Setup';

export enum ActionNames {
  setBillSetup = 'Set Bill Setup',
}

export const setBillSetup = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setBillSetup),
  props<{ billSetup: BillSetup }>(),
);
