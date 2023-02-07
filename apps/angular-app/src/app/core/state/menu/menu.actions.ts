import { createAction, props } from '@ngrx/store';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Menu';

export enum ActionNames {
  menuItemClicked = 'Menu Item Clicked',
}

export const menuItemClicked = createAction(
  ActionsService.compileActionName(prefix, ActionNames.menuItemClicked),
  props<{ menuItemId: string }>(),
);
