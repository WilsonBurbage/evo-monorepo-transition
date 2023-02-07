import { CorrespondenceCounter } from '../models/correspondence-counter.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { FeeEarner } from '../models/fee-earner.model';
import { Part } from '../models/part.model';
import { RateGroup } from '../models/rate-group.model';
import { Rate } from '../models/rate.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { CurrencyService } from './currency.service';

export class ExportCorrespondenceCountersService {
  static createCorrespondenceCounterRows(
    correspondenceCounter: CorrespondenceCounter,
    part: Part,
    feeEarners: FeeEarner[],
    rateGroups: RateGroup[],
    rates: Rate[],
  ): ExportRow[] {
    const correspondenceCounterFeeEarner = feeEarners.find(
      (feeEarner) => feeEarner.id === correspondenceCounter.feeEarnerId,
    );
    const correspondenceCounterFeeEarnerRateGroup = rateGroups.find(
      (rateGroup) =>
        rateGroup.id === correspondenceCounterFeeEarner?.rateGroupId,
    );
    const correspondenceCounterRate = rates.find(
      (rate) =>
        rate.rateGroupId === correspondenceCounterFeeEarnerRateGroup!.id &&
        rate.partId === part.id,
    );

    const lettersOutAmount =
      correspondenceCounter.lettersOut * correspondenceCounterRate!.lettersOut;

    const lettersInAmount =
      correspondenceCounter.lettersIn * correspondenceCounterRate!.lettersIn;

    const callsAmount =
      correspondenceCounter.calls * correspondenceCounterRate!.calls;

    const rowsWithPositiveValues: ExportRow[] = [
      ...(correspondenceCounter.lettersOut
        ? [
            {
              cells: {
                [ExportColumnType.description]: {
                  text: `${correspondenceCounter.lettersOut} Letters out (${correspondenceCounterFeeEarner?.reference})`,
                },
                [ExportColumnType.profitCosts]: {
                  text: CurrencyService.numberToCurrency(lettersOutAmount),
                },
              },
              metaData: {
                numberable: true,
                cls: correspondenceCounterFeeEarnerRateGroup!.cls,
                rateGroupId: correspondenceCounterFeeEarnerRateGroup!.id,
                profitCostsAmount: lettersOutAmount,
              },
              stackWidgetReference: StackWidgetReference.correspondenceCounter,
              stackWidgetConfig: {
                partyId: correspondenceCounter.partyId,
                feeEarnerId: correspondenceCounter.feeEarnerId,
              },
            },
          ]
        : []),

      ...(correspondenceCounter.lettersIn
        ? [
            {
              cells: {
                [ExportColumnType.description]: {
                  text: `${correspondenceCounter.lettersIn} Letters in (${correspondenceCounterFeeEarner?.reference})`,
                },
                [ExportColumnType.profitCosts]: {
                  text: CurrencyService.numberToCurrency(lettersInAmount),
                },
              },
              metaData: {
                numberable: true,
                cls: correspondenceCounterFeeEarnerRateGroup!.cls,
                rateGroupId: correspondenceCounterFeeEarnerRateGroup!.id,
                profitCostsAmount: lettersInAmount,
              },
              stackWidgetReference: StackWidgetReference.correspondenceCounter,
              stackWidgetConfig: {
                partyId: correspondenceCounter.partyId,
                feeEarnerId: correspondenceCounter.feeEarnerId,
              },
            },
          ]
        : []),

      ...(correspondenceCounter.calls
        ? [
            {
              cells: {
                [ExportColumnType.description]: {
                  text: `${correspondenceCounter.calls} Telephone calls (${correspondenceCounterFeeEarner?.reference})`,
                },
                [ExportColumnType.profitCosts]: {
                  text: CurrencyService.numberToCurrency(callsAmount),
                },
              },
              metaData: {
                numberable: true,
                cls: correspondenceCounterFeeEarnerRateGroup!.cls,
                rateGroupId: correspondenceCounterFeeEarnerRateGroup!.id,
                profitCostsAmount: callsAmount,
              },
              stackWidgetReference: StackWidgetReference.correspondenceCounter,
              stackWidgetConfig: {
                partyId: correspondenceCounter.partyId,
                feeEarnerId: correspondenceCounter.feeEarnerId,
              },
            },
          ]
        : []),
    ];

    const groupedRows = rowsWithPositiveValues.map(
      (row, index): ExportRow =>
        index === rowsWithPositiveValues.length - 1
          ? row
          : { ...row, unspaced: true },
    );

    return groupedRows;
  }
}
