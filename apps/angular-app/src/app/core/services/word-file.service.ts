import { DocxExportData, TriStateResult } from '@evo-monorepo/shared';
import { from, Observable } from 'rxjs';
import {
  BillType,
  BILL_TYPE_WORD_DOCUMENT_MAP,
} from '../models/bill-type.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportDocumentType } from '../models/export-document-type.model';
import { ExportRow } from '../models/export-row.model';
import { StylableText } from '../models/stylable-text.model';
import { NumbersService } from './numbers.service';

export class WordFileService {
  static exportFrontSheetToWordFile(
    targetFolderPath: string,
    exportRows: ExportRow[]
  ): Observable<TriStateResult> {
    const data: DocxExportData = {
      rows: exportRows
        .map((exportRow) => [
          Object.keys(exportRow.cells)
            .map((key) => key as ExportColumnType)
            .reduce((accumulator, key) => {
              if (key === ExportColumnType.default) {
                const replacementKey = this.getReplacementKeyForStylableText(
                  exportRow.cells[key]!
                );

                return {
                  ...accumulator,
                  [replacementKey]: exportRow.cells[key]?.text,
                };
              }
              return {
                ...accumulator,
                [key]: exportRow.cells[key]?.text,
              };
            }, {}),
          ...(exportRow.unspaced ? [] : [{}]),
        ])
        .flat(),
    };

    return from(
      window.bridge.commands.exportDocx(
        `${NumbersService.addLeadingZeros(
          Object.keys(ExportDocumentType).indexOf(
            ExportDocumentType.frontSheet
          ) + 1
        )}- Front sheet`,
        targetFolderPath,
        'front-sheet',
        data
      )
    );
  }

  static exportBillToWordFile(
    targetFolderPath: string,
    billType: BillType,
    exportRows: ExportRow[]
  ): Observable<TriStateResult> {
    const data: DocxExportData = {
      rows: exportRows
        .map((exportRow) => [
          Object.keys(exportRow.cells)
            .map((key) => key as ExportColumnType)
            .reduce((accumulator, key) => {
              if (key === ExportColumnType.description) {
                const replacementKey = this.getReplacementKeyForStylableText(
                  exportRow.cells[key]!
                );

                return {
                  ...accumulator,
                  [replacementKey]: exportRow.cells[key]?.text,
                };
              }
              return {
                ...accumulator,
                [key]: exportRow.cells[key]?.text,
              };
            }, {}),
          ...(exportRow.unspaced ? [] : [{}]),
        ])
        .flat(),
    };

    return from(
      window.bridge.commands.exportDocx(
        `${NumbersService.addLeadingZeros(
          Object.keys(ExportDocumentType).indexOf(ExportDocumentType.bill) + 1
        )}- Bill`,
        targetFolderPath,
        BILL_TYPE_WORD_DOCUMENT_MAP[billType],
        data
      )
    );
  }

  static exportBackSheetToWordFile(
    targetFolderPath: string,
    exportRows: ExportRow[]
  ): Observable<TriStateResult> {
    const data: DocxExportData = {
      rows: exportRows
        .map((exportRow) => [
          Object.keys(exportRow.cells)
            .map((key) => key as ExportColumnType)
            .reduce((accumulator, key) => {
              if (key === ExportColumnType.default) {
                const replacementKey = this.getReplacementKeyForStylableText(
                  exportRow.cells[key]!
                );

                return {
                  ...accumulator,
                  [replacementKey]: exportRow.cells[key]?.text,
                };
              }
              return {
                ...accumulator,
                [key]: exportRow.cells[key]?.text,
              };
            }, {}),
          ...(exportRow.unspaced ? [] : [{}]),
        ])
        .flat(),
    };

    return from(
      window.bridge.commands.exportDocx(
        `${NumbersService.addLeadingZeros(
          Object.keys(ExportDocumentType).indexOf(
            ExportDocumentType.backSheet
          ) + 1
        )}- Back sheet`,
        targetFolderPath,
        'back-sheet',
        data
      )
    );
  }

  static getReplacementKeyForStylableText(stylableText: StylableText): string {
    let replacementKey = 'd';

    replacementKey = stylableText.bold ? 'd-b' : replacementKey;

    replacementKey = stylableText.underline ? 'd-u' : replacementKey;

    replacementKey =
      stylableText.bold && stylableText.underline ? 'd-bu' : replacementKey;

    replacementKey = stylableText.italic ? 'd-i' : replacementKey;

    return replacementKey;
  }
}
