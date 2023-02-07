import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { Part } from '../models/part.model';
import { CurrencyService } from './currency.service';
import { ExportPartsService } from './export-parts.service';
import { NumbersService } from './numbers.service';

export class ExportSolicitorsSuccessFeesService {
  static createSolicitorsSuccessFeesRows(
    sourceRows: ExportRow[],
    part: Part,
  ): ExportRow[] {
    if (!part.hasSuccessFee) {
      return [];
    }

    const totalProfitCostsAmount = sourceRows
      .filter((row) => !row.metaData?.cls)
      .reduce(
        (accumulator, row) =>
          accumulator + (row.metaData?.profitCostsAmount || 0),
        0,
      );

    const successFeeAmount = NumbersService.applyPercentage(
      totalProfitCostsAmount,
      ExportPartsService.getPartWorkingSuccessFeePercentage(part),
      true,
    );

    return successFeeAmount === 0
      ? []
      : [
          {
            cells: {
              [ExportColumnType.description]: {
                text: `Solicitor's Success Fee @ ${
                  part.successFeePercentage
                }% of ${CurrencyService.numberToCurrency(
                  totalProfitCostsAmount,
                )}`,
              },

              [ExportColumnType.profitCosts]: {
                text: CurrencyService.numberToCurrency(successFeeAmount),
              },
            },
            metaData: {
              numberable: true,
              solicitorsSuccessFeeAmount: successFeeAmount,
            },
          },
        ];
  }
}
