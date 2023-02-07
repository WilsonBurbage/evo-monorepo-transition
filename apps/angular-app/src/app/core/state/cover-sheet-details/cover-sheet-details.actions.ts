import { createAction, props } from '@ngrx/store';
import { CoverSheetDetails } from '../../models/cover-sheet-details.model';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Cover Sheet Setup';

export enum ActionNames {
  setCoverSheetDetails = 'Set Cover Sheet Setup',
}

export const setCoverSheetDetails = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setCoverSheetDetails),
  props<{ coverSheetDetails: CoverSheetDetails }>(),
);
