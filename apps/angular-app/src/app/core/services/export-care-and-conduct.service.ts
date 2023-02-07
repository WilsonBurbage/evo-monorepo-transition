import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { Part } from '../models/part.model';
import { CurrencyService } from './currency.service';
import { ExportPartsService } from './export-parts.service';
import { NumbersService } from './numbers.service';

export class ExportCareAndConductService {
  static createCareAndConductRows(
    sourceRows: ExportRow[],
    part: Part,
    forMainItem: boolean,
  ): ExportRow[] {
    if (!part.hasCareAndConduct) {
      return [];
    }

    const totalProfitCostsAmount = sourceRows
      .filter((row) => !row.metaData?.cls)
      .filter(
        (row) =>
          part.applyCareAndConductToTravelAndWaiting ||
          !row.metaData?.travelAndWaiting,
      )
      .reduce(
        (accumulator, row) =>
          accumulator + (row.metaData?.profitCostsAmount || 0),
        0,
      );

    const careAndConductAmount = NumbersService.applyPercentage(
      totalProfitCostsAmount,
      ExportPartsService.getPartWorkingCareAndConductPercentage(part),
      true,
    );

    return careAndConductAmount === 0
      ? []
      : [
          {
            cells: {
              [ExportColumnType.description]: {
                text: `${forMainItem ? 'Part B: ' : ''}Care and Conduct @ ${
                  part.careAndConductPercentage
                }%`,
                bold: forMainItem,
                underline: forMainItem,
              },

              [ExportColumnType.profitCosts]: {
                text: CurrencyService.numberToCurrency(careAndConductAmount),
              },
            },
            metaData: {
              numberable: true,
              profitCostsAmount: careAndConductAmount,
            },
          },
        ];
  }
}
