import { AccountDetailsResponse } from '@evo-monorepo/shared';
import { createAction, props } from '@ngrx/store';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Account';

export enum ActionNames {
  getAccountDetails = 'Get Account Details',
  getAccountDetailsSuccess = 'Get Account Details Success',
  getAccountDetailsFailure = 'Get Account Details Failure',
}

export const getAccountDetails = createAction(
  ActionsService.compileActionName(prefix, ActionNames.getAccountDetails)
);

export const getAccountDetailsSuccess = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.getAccountDetailsSuccess
  ),
  props<{ accountDetailsResponse: AccountDetailsResponse }>()
);

export const getAccountDetailsFailure = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.getAccountDetailsFailure
  ),
  props<{ errorCode: number }>()
);
