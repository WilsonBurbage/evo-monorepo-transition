import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { Part } from '../models/part.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { SuccessFee } from '../models/success-fee.model';
import { CurrencyService } from './currency.service';
import { ExportPartsService } from './export-parts.service';
import { NumbersService } from './numbers.service';

export class ExportSuccessFeesService {
  static createSuccessFeesRows(
    successFees: SuccessFee[],
    part: Part,
  ): ExportRow[] {
    const successFeesRows = successFees.map(
      (successFee): ExportRow => this.createSuccessFeeRow(successFee, part),
    );

    return successFeesRows;
  }

  static createSuccessFeeRow(successFee: SuccessFee, part: Part): ExportRow {
    const successFeeAmount = NumbersService.applyPercentage(
      successFee.baseCosts,
      ExportPartsService.getPartWorkingSuccessFeePercentage(part),
      true,
    );

    return {
      cells: {
        [ExportColumnType.description]: {
          text: `${successFee.description} @ ${
            part.successFeePercentage
          }% of ${CurrencyService.numberToCurrency(successFee.baseCosts)}`,
        },
        [ExportColumnType.profitCosts]: {
          text: CurrencyService.numberToCurrency(successFeeAmount),
        },
      },
      metaData: {
        numberable: true,
        solicitorsSuccessFeeAmount: successFeeAmount,
      },
      stackWidgetReference: StackWidgetReference.successFee,
      stackWidgetConfig: { id: successFee.id },
    };
  }
}
