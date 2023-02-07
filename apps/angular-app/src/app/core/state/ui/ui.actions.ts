import { createAction, props } from '@ngrx/store';
import { ExportDocumentType } from '../../models/export-document-type.model';
import { StackWidgetConfig } from '../../models/stack-widget-config.model';
import { StackWidgetReference } from '../../models/stack-widget-reference.model';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'UI';

export enum ActionNames {
  setBillIsFullyLoaded = 'Set Bill Is Fully Loaded',

  setBillSelectorsEnabled = 'Set Bill Selectors Enabled',

  setActivePartId = 'Set Active Part ID',
  setActiveFeeEarnerId = 'Set Active Fee Earner ID',

  pushStackWidget = 'Push Stack Widget',
  popStackWidget = 'Pop Stack Widget',
  clearStackWidgets = 'Clear Stack Widgets',

  setActivePreviewExportDocumentType = 'Set Active Preview Document Type',
}

export const setBillIsFullyLoaded = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setBillIsFullyLoaded),
  props<{ billIsFullyLoaded: boolean }>(),
);

export const setBillSelectorsEnabled = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setBillSelectorsEnabled),
  props<{ billSelectorsEnabled: boolean }>(),
);

export const setActivePartId = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setActivePartId),
  props<{ partId: string }>(),
);

export const setActiveFeeEarnerId = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setActiveFeeEarnerId),
  props<{ feeEarnerId: string }>(),
);

export const pushStackWidget = createAction(
  ActionsService.compileActionName(prefix, ActionNames.pushStackWidget),
  props<{
    stackWidgetReference: StackWidgetReference;
    config?: StackWidgetConfig;
  }>(),
);

export const popStackWidget = createAction(
  ActionsService.compileActionName(prefix, ActionNames.popStackWidget),
);

export const clearStackWidgets = createAction(
  ActionsService.compileActionName(prefix, ActionNames.clearStackWidgets),
);

export const setActivePreviewExportDocumentType = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.setActivePreviewExportDocumentType,
  ),
  props<{ previewExportDocumentType: ExportDocumentType }>(),
);
