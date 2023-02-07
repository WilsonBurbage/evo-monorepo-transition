import { createAction, props } from '@ngrx/store';
import { DocumentExportConfig } from '../../models/document-export-config.model';
import { ExportDocumentType } from '../../models/export-document-type.model';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Word File';

export enum ActionNames {
  exportDocumentsToWord = 'Export Documents To Word',
  exportDocumentToWord = 'Export Document To Word',
  exportDocumentToWordSuccess = 'Export Document To Word Success',
  exportDocumentToWordFailure = 'Export Document To Word Failure',
  exportDocumentToWordCancelled = 'Export Document To Word Cancelled',
}

export const exportDocumentsToWord = createAction(
  ActionsService.compileActionName(prefix, ActionNames.exportDocumentsToWord),
  props<{
    documentExportConfig: DocumentExportConfig;
  }>(),
);

export const exportDocumentToWord = createAction(
  ActionsService.compileActionName(prefix, ActionNames.exportDocumentToWord),
  props<{ targetFolderPath: string; exportDocumentType: ExportDocumentType }>(),
);

export const exportDocumentToWordSuccess = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.exportDocumentToWordSuccess,
  ),
  props<{ exportDocumentType: ExportDocumentType }>(),
);

export const exportDocumentToWordFailure = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.exportDocumentToWordFailure,
  ),
  props<{ exportDocumentType: ExportDocumentType }>(),
);
