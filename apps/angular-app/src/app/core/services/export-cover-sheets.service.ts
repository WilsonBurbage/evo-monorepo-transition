import { Alignment } from '../models/alignment.model';
import { CoverSheetDetails } from '../models/cover-sheet-details.model';
import { CoverSheetItemType } from '../models/cover-sheet-item-type.model';
import { CoverSheetItem } from '../models/cover-sheet-item.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';

export class ExportCoverSheetsService {
  static createCoverSheetRows(
    coverSheetItems: CoverSheetItem[],
    coverSheetDetails: CoverSheetDetails,
    exportRowsForCaseParties: ExportRow[],
    exportRowsForNarrative: ExportRow[],
    exportRowsForRatesApplied: ExportRow[],
    exportRowsForSolicitorDetails: ExportRow[],
    exportRowsForVatDetails: ExportRow[],
  ): ExportRow[] {
    const coverSheetRows = coverSheetItems
      .map((coverSheetItem): ExportRow[] => {
        let baseRows: ExportRow[];

        switch (coverSheetItem.coverSheetItemType) {
          case CoverSheetItemType.court:
            {
              baseRows = [
                {
                  cells: {
                    [ExportColumnType.default]: {
                      text: coverSheetDetails.court,
                      bold: true,
                    },
                  },
                },
              ];
            }
            break;

          case CoverSheetItemType.claimNumber:
            {
              baseRows = [
                {
                  cells: {
                    [ExportColumnType.default]: {
                      text: `Claim no. ${coverSheetDetails.claimNumber}`,
                      bold: true,
                      alignment: Alignment.right,
                    },
                  },
                },
              ];
            }
            break;

          case CoverSheetItemType.caseParties:
            baseRows = exportRowsForCaseParties;
            break;

          case CoverSheetItemType.narrative:
            baseRows = exportRowsForNarrative;
            break;

          case CoverSheetItemType.ratesApplied:
            baseRows = exportRowsForRatesApplied;
            break;

          case CoverSheetItemType.solicitorDetails:
            baseRows = exportRowsForSolicitorDetails;
            break;

          case CoverSheetItemType.spacer:
            baseRows = [
              {
                cells: {},
              },
            ];
            break;

          case CoverSheetItemType.text:
            {
              const { text, alignment, bold, underline, italic } =
                coverSheetItem;

              baseRows = [
                {
                  cells: {
                    [ExportColumnType.default]: {
                      text,
                      alignment,
                      bold,
                      underline,
                      italic,
                    },
                  },
                },
              ];
            }
            break;

          case CoverSheetItemType.vatDetails:
            baseRows = exportRowsForVatDetails;
            break;
        }

        const result = baseRows.map(
          (baseRow): ExportRow => ({
            ...baseRow,
            stackWidgetReference: StackWidgetReference.coverSheetItem,
            stackWidgetConfig: { id: coverSheetItem.id },
          }),
        );

        return result;
      })
      .flat();

    return coverSheetRows;
  }
}
