import { createAction, props } from '@ngrx/store';
import { SortPositions } from '../../models/sort-positions.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Sorting';

export enum ActionNames {
  applyEntitySorting = 'Apply Entity Sorting',
}

export const applyEntitySorting = createAction(
  ActionsService.compileActionName(prefix, ActionNames.applyEntitySorting),
  props<{ chunkName: string; sortPositions: SortPositions }>(),
);
