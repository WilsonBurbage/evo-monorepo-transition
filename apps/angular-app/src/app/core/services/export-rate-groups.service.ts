import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { RateGroup } from '../models/rate-group.model';
import { CurrencyService } from './currency.service';
import { DatesService } from './dates.service';

export class ExportRateGroupsService {
  static createRateGroupSummaryRows(
    sourceRows: ExportRow[],
    rateGroups: RateGroup[],
  ): ExportRow[] {
    const rateGroupIds = Array.from(
      new Set(sourceRows.map((sourceRow) => sourceRow.metaData?.rateGroupId)),
    );

    return rateGroupIds
      .map((rateGroupId): ExportRow => {
        const rateGroup = rateGroups.find(
          (rateGroup) => rateGroup.id === rateGroupId,
        );

        const rateGroupRows = sourceRows.filter(
          (sourceRow) => sourceRow.metaData?.rateGroupId === rateGroupId,
        );

        const totalMinutes = rateGroupRows.reduce(
          (accumulator, rateGroupRow) =>
            accumulator +
            DatesService.parseTimeIntoMinutes(rateGroupRow.metaData!.time!),
          0,
        );

        const totalTime = DatesService.parseMinutesIntoTime(totalMinutes);

        const totalAmount = rateGroupRows.reduce(
          (accumulator, rateGroupRow) =>
            accumulator + rateGroupRow.metaData!.profitCostsAmount!,
          0,
        );

        return {
          cells: {
            [ExportColumnType.description]: {
              text: `Engaged ${DatesService.formatTimeToWords(totalTime)} (${
                rateGroup?.reference
              })`,
            },
            [ExportColumnType.profitCosts]: {
              text: CurrencyService.numberToCurrency(totalAmount),
            },
          },
          metaData: { numberable: true, cls: rateGroup!.cls },
        };
      })
      .flat();
  }
}
