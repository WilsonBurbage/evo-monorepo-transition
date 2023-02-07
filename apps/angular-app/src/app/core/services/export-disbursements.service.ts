import { Counsel } from '../models/counsel.model';
import { Disbursement } from '../models/disbursement.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { Part } from '../models/part.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { CurrencyService } from './currency.service';
import { ExportCounselsService } from './export-counsels.service';
import { ExportPartsService } from './export-parts.service';
import { NumbersService } from './numbers.service';

export class ExportDisbursementsService {
  static createDisbursementRows(
    disbursement: Disbursement,
    counsels: Counsel[],
    part: Part,
  ): ExportRow[] {
    const disbursementRow = this.createDisbursementRow(disbursement);

    const counsel = counsels.find(
      (counsel) => counsel.id === disbursement.counselId,
    )!;

    const successFeeRow = [
      ...(counsel && counsel.hasSuccessFee && disbursement.hasCounselSuccessFee
        ? [this.createCounselsSuccessFeeRow(disbursement, counsel, part)]
        : []),
    ];

    return [disbursementRow, ...successFeeRow];
  }

  static createDisbursementRow(disbursement: Disbursement): ExportRow {
    return {
      cells: {
        [ExportColumnType.description]: {
          text: disbursement.description,
        },
        [ExportColumnType.vat]: {
          text: disbursement.vat
            ? CurrencyService.numberToCurrency(disbursement.vat)
            : '',
        },
        [ExportColumnType.dibs]: {
          text: CurrencyService.numberToCurrency(disbursement.amount),
        },
      },
      metaData: {
        numberable: true,
        cls: disbursement.cls,

        ...(disbursement.counselId
          ? {
              counselId: disbursement.counselId,
              counselsFeeVatAmount: disbursement.vat,
              counselsFeeAmount: disbursement.amount,
            }
          : {}),
        ...(!disbursement.counselId
          ? {
              disbursementsVatAmount: disbursement.vat,
              disbursementsAmount: disbursement.amount,
            }
          : {}),
      },

      stackWidgetReference: StackWidgetReference.disbursement,
      stackWidgetConfig: { id: disbursement.id },
      notes: disbursement.notes,
    };
  }

  static createCounselsSuccessFeeRow(
    disbursement: Disbursement,
    counsel: Counsel,
    part: Part,
  ): ExportRow {
    const successFeeAmount = NumbersService.applyPercentage(
      disbursement.amount,
      ExportCounselsService.getCounselWorkingSuccessFeePercentage(counsel),
      true,
    );

    const successFeeVatPercentage = counsel.attractsVat
      ? disbursement.overrideCounselSuccessFeeVatPercentage
        ? disbursement.counselSuccessFeeVatPercentageOverride
        : ExportPartsService.getPartWorkingVatPercentage(part)
      : 0;

    const successFeeVatAmount = NumbersService.applyPercentage(
      successFeeAmount,
      successFeeVatPercentage,
      true,
    );

    return {
      cells: {
        [ExportColumnType.description]: {
          text: `Counsel's success fee (${counsel?.name}) @ ${counsel?.successFeePercentage}%`,
        },
        [ExportColumnType.vat]: {
          text: CurrencyService.numberToCurrency(successFeeVatAmount),
        },
        [ExportColumnType.dibs]: {
          text: CurrencyService.numberToCurrency(successFeeAmount),
        },
      },
      metaData: {
        numberable: true,
        cls: disbursement.cls,
        travelAndWaiting: disbursement.travelAndWaiting,
        counselId: disbursement.counselId,
        counselsSuccessFeeVatAmount: successFeeVatAmount,
        counselsSuccessFeeAmount: successFeeAmount,
      },
      stackWidgetReference: StackWidgetReference.disbursement,
      stackWidgetConfig: { id: disbursement.id },
    };
  }
}
