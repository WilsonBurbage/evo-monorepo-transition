import { createAction, props } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Removing';

export enum ActionNames {
  askToConfirmEntityRemoval = 'Ask To Confirm Entity Removal',
}

export const askToConfirmEntityRemoval = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.askToConfirmEntityRemoval,
  ),
  props<{ entityId: string; entityChunkName: EntityChunkName }>(),
);
