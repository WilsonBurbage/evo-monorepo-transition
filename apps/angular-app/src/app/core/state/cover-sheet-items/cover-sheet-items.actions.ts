import { createAction, props } from '@ngrx/store';
import { CoverSheetItem } from '../../models/cover-sheet-item.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Cover Sheet Items';

export enum ActionNames {
  setCoverSheetItems = 'Set Cover Sheet Items',
  upsertCoverSheetItem = 'Upsert Cover Sheet Item',
  removeCoverSheetItem = 'Remove Cover Sheet Item',
}

export const setCoverSheetItems = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setCoverSheetItems),
  props<{ coverSheetItems: CoverSheetItem[] }>(),
);

export const upsertCoverSheetItem = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertCoverSheetItem),
  props<{ coverSheetItem: CoverSheetItem }>(),
);

export const removeCoverSheetItem = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeCoverSheetItem),
  props<{ coverSheetItemId: string }>(),
);
