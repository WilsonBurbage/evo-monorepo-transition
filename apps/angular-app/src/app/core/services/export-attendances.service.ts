import { Attendance } from '../models/attendance.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { FeeEarner } from '../models/fee-earner.model';
import { Part } from '../models/part.model';
import { RateGroup } from '../models/rate-group.model';
import { Rate } from '../models/rate.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { CurrencyService } from './currency.service';
import { DatesService } from './dates.service';
import { ExportRateGroupsService } from './export-rate-groups.service';

export class ExportAttendancesService {
  static createAttendancesRows(
    attendances: Attendance[],
    part: Part,
    feeEarners: FeeEarner[],
    rateGroups: RateGroup[],
    rates: Rate[],
    createRateGroupSummaries: boolean,
  ): ExportRow[] {
    const attendancesRows = attendances.map(
      (attendance): ExportRow =>
        this.createAttendanceRow(
          attendance,
          part,
          feeEarners,
          rateGroups,
          rates,
          createRateGroupSummaries,
        ),
    );

    const rateGroupSummaryRows = createRateGroupSummaries
      ? ExportRateGroupsService.createRateGroupSummaryRows(
          attendancesRows,
          rateGroups,
        )
      : [];

    return [...attendancesRows, ...rateGroupSummaryRows];
  }

  static createAttendanceRow(
    attendance: Attendance,
    part: Part,
    feeEarners: FeeEarner[],
    rateGroups: RateGroup[],
    rates: Rate[],
    hasRateGroupSummary: boolean,
  ): ExportRow {
    const attendanceFeeEarner = feeEarners.find(
      (feeEarner) => feeEarner.id === attendance.feeEarnerId,
    );
    const attendanceFeeEarnerRateGroup = rateGroups.find(
      (rateGroup) => rateGroup.id === attendanceFeeEarner?.rateGroupId,
    );
    const attendanceRate = rates.find(
      (rate) =>
        rate.rateGroupId === attendanceFeeEarnerRateGroup?.id &&
        rate.partId === part.id,
    );

    const attendanceAmount = DatesService.timeMultipliedByHourlyRate(
      attendance.time,
      attendanceRate!.hourly,
    );

    return {
      cells: {
        [ExportColumnType.description]: {
          text: `${attendance.description} ${DatesService.formatTimeToWords(
            attendance.time,
          )} (${attendanceFeeEarnerRateGroup?.reference})`,
        },
        ...(hasRateGroupSummary
          ? {}
          : {
              [ExportColumnType.profitCosts]: {
                text: CurrencyService.numberToCurrency(attendanceAmount),
              },
            }),
      },
      metaData: {
        numberable: !hasRateGroupSummary,
        cls: attendanceFeeEarnerRateGroup!.cls,
        travelAndWaiting: attendance.travelAndWaiting,
        rateGroupId: attendanceFeeEarnerRateGroup?.id,
        time: attendance.time,
        enhancementId: attendance.enhancementId,
        profitCostsAmount: attendanceAmount,
      },
      stackWidgetReference: StackWidgetReference.attendance,
      stackWidgetConfig: { id: attendance.id },
      notes: attendance.notes,
    };
  }
}
