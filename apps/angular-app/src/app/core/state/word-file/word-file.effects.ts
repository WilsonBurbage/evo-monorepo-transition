import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Attitude } from '../../models/attitude.model';
import {
  ExportDocumentType,
  EXPORT_DOCUMENT_TYPE_NAMES_LOWER_CASE_MAP,
} from '../../models/export-document-type.model';
import { MenuItemId } from '../../models/menu-item-id.model';
import { StackWidgetReference } from '../../models/stack-widget-reference.model';
import { WordFileService } from '../../services/word-file.service';
import { GlobalState } from '../reducers';
import * as billSetupSelectors from './../bill-setup/bill-setup.selectors';
import * as exportSelectors from './../export/export.selectors';
import * as menuActions from './../menu/menu.actions';
import * as toastMessagesActions from './../toast-messages/toast-messages.actions';
import * as uiActions from './../ui/ui.actions';
import * as wordFileActions from './word-file.actions';

@Injectable()
export class WordFileEffects {
  menuItemClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(menuActions.menuItemClicked),
      mergeMap(({ menuItemId }) => {
        switch (menuItemId) {
          case MenuItemId.export:
            return [
              uiActions.pushStackWidget({
                stackWidgetReference: StackWidgetReference.export,
              }),
            ];

          default:
            return [];
        }
      }),
    ),
  );

  exportDocumentsToWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wordFileActions.exportDocumentsToWord),
      mergeMap(({ documentExportConfig }) => {
        return Object.keys(ExportDocumentType)
          .map((key) => key as ExportDocumentType)
          .filter((key) => Boolean(documentExportConfig[key]))
          .map((key) =>
            wordFileActions.exportDocumentToWord({
              targetFolderPath: documentExportConfig.targetFolderPath,
              exportDocumentType: key,
            }),
          );
      }),
    ),
  );

  exportDocumentToWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wordFileActions.exportDocumentToWord),
      withLatestFrom(
        this.store$.select(billSetupSelectors.getBillSetup),
        this.store$.select(
          exportSelectors.getExportRows(ExportDocumentType.frontSheet),
        ),
        this.store$.select(
          exportSelectors.getExportRows(ExportDocumentType.bill),
        ),
        this.store$.select(
          exportSelectors.getExportRows(ExportDocumentType.schedules),
        ),
        this.store$.select(
          exportSelectors.getExportRows(ExportDocumentType.certificates),
        ),
        this.store$.select(
          exportSelectors.getExportRows(ExportDocumentType.backSheet),
        ),
      ),
      concatMap(
        ([
          { targetFolderPath, exportDocumentType },
          billSetup,

          frontSheetExportRows,
          billExportRows,
          schedulesExportRows,
          certificatesExportRows,
          backSheetExportRows,
        ]) =>
          [
            ...(exportDocumentType == ExportDocumentType.frontSheet
              ? [
                  WordFileService.exportFrontSheetToWordFile(
                    targetFolderPath,
                    frontSheetExportRows,
                  ),
                ]
              : []),
            ...(exportDocumentType == ExportDocumentType.bill
              ? [
                  WordFileService.exportBillToWordFile(
                    targetFolderPath,
                    billSetup!.billType,
                    billExportRows,
                  ),
                ]
              : []),
            ...(exportDocumentType == ExportDocumentType.backSheet
              ? [
                  WordFileService.exportBackSheetToWordFile(
                    targetFolderPath,
                    backSheetExportRows,
                  ),
                ]
              : []),
          ][0].pipe(
            map(() =>
              wordFileActions.exportDocumentToWordSuccess({
                exportDocumentType,
              }),
            ),
            catchError(() =>
              of(
                wordFileActions.exportDocumentToWordFailure({
                  exportDocumentType,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  exportDocumentToWordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wordFileActions.exportDocumentToWordSuccess),
      map(({ exportDocumentType }) =>
        toastMessagesActions.showToastMessage({
          text: `Your ${EXPORT_DOCUMENT_TYPE_NAMES_LOWER_CASE_MAP[exportDocumentType]} has exported successfully.`,
          attitude: Attitude.positive,
        }),
      ),
    ),
  );

  exportDocumentToWordFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wordFileActions.exportDocumentToWordFailure),
      map(({ exportDocumentType }) =>
        toastMessagesActions.showToastMessage({
          text: `Your ${EXPORT_DOCUMENT_TYPE_NAMES_LOWER_CASE_MAP[exportDocumentType]} failed to export. Check to make sure the file is not open or locked, and that the target folder exists, and try again.`,
          attitude: Attitude.negative,
        }),
      ),
    ),
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
