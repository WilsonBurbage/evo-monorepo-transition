import { createAction, props } from '@ngrx/store';
import { Attitude } from '../../models/attitude.model';
import { ToastMessage } from '../../models/toast-message.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Toast Messages';

export enum ActionNames {
  showToastMessage = 'Show Toast Message',
  upsertToastMessage = 'Upsert Toast Message',
  removeToastMessage = 'Remove Toast Message',
}

export const showToastMessage = createAction(
  ActionsService.compileActionName(prefix, ActionNames.showToastMessage),
  props<{ text: string; attitude: Attitude }>(),
);

export const upsertToastMessage = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertToastMessage),
  props<{ toastMessage: ToastMessage }>(),
);

export const removeToastMessage = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeToastMessage),
  props<{ toastMessageId: string }>(),
);
