import { ExportCells } from '../models/export-cells.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRowMetaData } from '../models/export-row-meta-data.model';
import { ExportRow } from '../models/export-row.model';
import { StackWidgetConfig } from '../models/stack-widget-config.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { DefaultsService } from './defaults.service';

export class ExportService {
  static createTitleRow(
    title: string,
    includeInJumpTo: boolean,
    jumpToLevel: number,
    predefinitions: {
      metaData?: Partial<ExportRowMetaData>;
      stackWidgetReference?: StackWidgetReference;
      stackWidgetConfig?: StackWidgetConfig;
    } = { metaData: {} },
  ): ExportRow {
    return {
      cells: {
        [ExportColumnType.description]: {
          text: title,
          bold: true,
          underline: true,
        },
      },

      ...(includeInJumpTo
        ? {
            jumpToLink: DefaultsService.createDefaultJumpToLink({
              title,
              level: jumpToLevel,
            }),
          }
        : {}),

      ...predefinitions,
    };
  }

  static applyRowNumbering(sourceRows: ExportRow[]): ExportRow[] {
    let currentNumber = 0;

    return sourceRows.map((row) => {
      if (!row.metaData?.numberable) {
        return row;
      }

      const { cells } = row;

      currentNumber++;

      const newCells: ExportCells = {
        ...cells,
        [ExportColumnType.no]: { text: String(currentNumber) },
      };

      const newRow = { ...row, cells: newCells };

      return newRow;
    });
  }

  static createNotesRows(sourceRows: ExportRow[]): ExportRow[] {
    const newRows = sourceRows
      .map((row) => {
        if (!row.notes) {
          return [row];
        }

        return [
          row,
          {
            cells: {
              [ExportColumnType.description]: {
                text: row.notes,
                italic: true,
              },
            },
          },
        ];
      })
      .flat();

    return newRows;
  }
}
