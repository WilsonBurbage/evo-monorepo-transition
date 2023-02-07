import { createAction, props } from '@ngrx/store';
import { DocumentsItem } from '../../models/documents-item.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Documents Items';

export enum ActionNames {
  setDocumentsItems = 'Set Documents Items',
  upsertDocumentsItem = 'Upsert Documents Item',
  removeDocumentsItem = 'Remove Documents Item',
}

export const setDocumentsItems = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setDocumentsItems),
  props<{ documentsItems: DocumentsItem[] }>(),
);

export const upsertDocumentsItem = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertDocumentsItem),
  props<{ documentsItem: DocumentsItem }>(),
);

export const removeDocumentsItem = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeDocumentsItem),
  props<{ documentsItemId: string }>(),
);
