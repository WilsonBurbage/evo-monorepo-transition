import { Enhancement } from '../models/enhancement.model';
import { ExportCells } from '../models/export-cells.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { CurrencyService } from './currency.service';
import { NumbersService } from './numbers.service';

export class ExportEnhancementsService {
  static createEnhancementsRows(
    sourceRows: ExportRow[],
    enhancements: Enhancement[],
  ): ExportRow[] {
    const enhancementsWithValues = enhancements.filter((enhancement) =>
      sourceRows.some((row) => row.metaData?.enhancementId === enhancement.id),
    );

    const allEnhancementSummaries = enhancementsWithValues.map(
      (enhancement): ExportRow => {
        const totalProfitCostsAmount = sourceRows
          .filter((row) => row.metaData?.enhancementId === enhancement.id)
          .reduce(
            (accumulator, row) =>
              accumulator + row.metaData!.profitCostsAmount!,
            0,
          );

        const enhancementAmount = NumbersService.applyPercentage(
          totalProfitCostsAmount,
          enhancement.percentage,
          true,
        );

        return {
          cells: {
            [ExportColumnType.description]: {
              text: `General Enhancement @ ${enhancement.percentage}% ${enhancement.name}`,
            },
            [ExportColumnType.profitCosts]: {
              text: CurrencyService.numberToCurrency(enhancementAmount),
            },
          },
          metaData: { numberable: true, profitCostsAmount: enhancementAmount },
          stackWidgetReference: StackWidgetReference.enhancement,
          stackWidgetConfig: { id: enhancement.id },
        };
      },
    );

    return allEnhancementSummaries;
  }

  static applyEnhancementDescriptionMarkers(
    sourceRows: ExportRow[],
    enhancements: Enhancement[],
  ): ExportRow[] {
    return sourceRows.map((row) => {
      if (!row.metaData?.enhancementId) {
        return row;
      }

      const enhancement = enhancements.find(
        (enhancement) => enhancement.id === row.metaData!.enhancementId,
      )!;

      const { cells } = row;

      const newCells: ExportCells = {
        ...cells,
        [ExportColumnType.description]: {
          ...cells[ExportColumnType.description],
          text: `${cells[ExportColumnType.description]?.text} ${
            enhancement.name
          }`,
        },
      };

      return { ...row, cells: newCells };
    });
  }
}
