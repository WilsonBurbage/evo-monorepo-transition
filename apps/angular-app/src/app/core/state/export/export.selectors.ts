import { createSelector } from '@ngrx/store';
import { ExportColumn } from '../../models/export-column.model';
import { ExportDocumentType } from '../../models/export-document-type.model';
import { ExportRow } from '../../models/export-row.model';
import { JumpToLink } from '../../models/jump-to-link.model';
import * as uiSelectors from './../ui/ui.selectors';
import * as billExportSelectors from './bill-export.selectors';
import * as coverSheetExportSelectors from './cover-sheet-export.selectors';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getExportColumns = (exportDocumentType?: ExportDocumentType) =>
  createSelector(
    uiSelectors.getBillSelectorsEnabled,
    uiSelectors.getActivePreviewExportDocumentType,

    coverSheetExportSelectors.getExportColumnsForFrontSheet,
    coverSheetExportSelectors.getExportColumnsForBackSheet,
    billExportSelectors.getExportColumnsForBill,

    (
      billSelectorsEnabled,
      activePreviewExportDocumentType,

      exportColumnsForFrontSheet,
      exportColumnsForBackSheet,
      exportColumnsForBill,
    ): ExportColumn[] => {
      if (!billSelectorsEnabled) {
        return [];
      }

      switch (exportDocumentType || activePreviewExportDocumentType) {
        case ExportDocumentType.frontSheet:
          return exportColumnsForFrontSheet;

        case ExportDocumentType.backSheet:
          return exportColumnsForBackSheet;

        case ExportDocumentType.bill:
          return exportColumnsForBill;

        default:
          return [];
      }
    },
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getExportRows = (exportDocumentType?: ExportDocumentType) =>
  createSelector(
    uiSelectors.getBillSelectorsEnabled,
    uiSelectors.getActivePreviewExportDocumentType,

    coverSheetExportSelectors.getExportRowsForFrontSheet,
    coverSheetExportSelectors.getExportRowsForBackSheet,
    billExportSelectors.getExportRowsForBill,

    (
      billSelectorsEnabled,
      activePreviewExportDocumentType,

      exportRowsForFrontSheet,
      exportRowsForBackSheet,
      exportRowsForBill,
    ): ExportRow[] => {
      if (!billSelectorsEnabled) {
        return [];
      }

      switch (exportDocumentType || activePreviewExportDocumentType) {
        case ExportDocumentType.frontSheet:
          return exportRowsForFrontSheet;

        case ExportDocumentType.backSheet:
          return exportRowsForBackSheet;

        case ExportDocumentType.bill:
          return exportRowsForBill;

        default:
          return [];
      }
    },
  );

export const getExportJumpToLinks = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  getExportRows(),

  (billSelectorsEnabled, exportRows): JumpToLink[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    return exportRows
      .filter((row) => Boolean(row.jumpToLink))
      .map((row) => row.jumpToLink!);
  },
);
