import { Attendance } from '../models/attendance.model';
import { CorrespondenceCounter } from '../models/correspondence-counter.model';
import { Counsel } from '../models/counsel.model';
import { Disbursement } from '../models/disbursement.model';
import { ExportRow } from '../models/export-row.model';
import { FeeEarner } from '../models/fee-earner.model';
import { Part } from '../models/part.model';
import { Party } from '../models/party.model';
import { RateGroup } from '../models/rate-group.model';
import { Rate } from '../models/rate.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { ExportAttendancesService } from './export-attendances.service';
import { ExportClsService } from './export-cls.service';
import { ExportCorrespondenceCountersService } from './export-correspondence-counters.service';
import { ExportDisbursementsService } from './export-disbursements.service';
import { ExportService } from './export.service';

export class ExportPartiesService {
  static createPartyRows(
    party: Party,
    attendances: Attendance[],
    part: Part,
    feeEarners: FeeEarner[],
    rateGroups: RateGroup[],
    rates: Rate[],
    correspondenceCounters: CorrespondenceCounter[],
    disbursements: Disbursement[],
    counsels: Counsel[],
  ): ExportRow[] {
    const partyTitleRow = ExportService.createTitleRow(party.name, true, 3, {
      stackWidgetReference: StackWidgetReference.party,
      stackWidgetConfig: { id: party.id },
    });

    const partyAttendances = attendances.filter(
      (attendance) => attendance.partyId === party.id,
    );

    const partyAttendanceRows = ExportAttendancesService.createAttendancesRows(
      partyAttendances,
      part,
      feeEarners,
      rateGroups,
      rates,
      true,
    );

    const partyCorrespondenceCounters = correspondenceCounters.filter(
      (correspondenceCounter) => correspondenceCounter.partyId === party.id,
    );

    const partyCorrespondenceCounterRows = partyCorrespondenceCounters
      .map((correspondenceCounter): ExportRow[] =>
        ExportCorrespondenceCountersService.createCorrespondenceCounterRows(
          correspondenceCounter,
          part,
          feeEarners,
          rateGroups,
          rates,
        ),
      )
      .flat();

    const partyDisbursements = disbursements.filter(
      (disbursement) => disbursement.partyId === party.id,
    );

    const partyDisbursementRows = partyDisbursements
      .map((disbursement): ExportRow[] =>
        ExportDisbursementsService.createDisbursementRows(
          disbursement,
          counsels,
          part,
        ),
      )
      .flat();

    const clsInterPartesSeparatedRows =
      ExportClsService.applyClsInterpartiesBlockSeparation([
        ...partyAttendanceRows,
        ...partyCorrespondenceCounterRows,
        ...partyDisbursementRows,
      ]);

    return [partyTitleRow, ...clsInterPartesSeparatedRows];
  }
}
