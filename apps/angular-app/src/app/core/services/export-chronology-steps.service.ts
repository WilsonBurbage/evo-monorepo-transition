import { Attendance } from '../models/attendance.model';
import { ChronologyStep } from '../models/chronology-step.model';
import { Counsel } from '../models/counsel.model';
import { Disbursement } from '../models/disbursement.model';
import { Enhancement } from '../models/enhancement.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { FeeEarner } from '../models/fee-earner.model';
import { Part } from '../models/part.model';
import { RateGroup } from '../models/rate-group.model';
import { Rate } from '../models/rate.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { SuccessFee } from '../models/success-fee.model';
import { DatesService } from './dates.service';
import { ExportAttendancesService } from './export-attendances.service';
import { ExportCareAndConductService } from './export-care-and-conduct.service';
import { ExportClsService } from './export-cls.service';
import { ExportDisbursementsService } from './export-disbursements.service';
import { ExportEnhancementsService } from './export-enhancements.service';
import { ExportSolicitorsSuccessFeesService } from './export-solicitors-success-fees.service';
import { ExportSuccessFeesService } from './export-success-fees.service';
import { ExportService } from './export.service';

export class ExportChronologyStepsService {
  static createChronologyStepRows(
    chronologyStep: ChronologyStep,
    attendances: Attendance[],
    part: Part,
    feeEarners: FeeEarner[],
    rateGroups: RateGroup[],
    rates: Rate[],
    successFees: SuccessFee[],
    disbursements: Disbursement[],
    counsels: Counsel[],
    enhancements: Enhancement[],
  ): ExportRow[] {
    const chronologyStepTitleRow = ExportService.createTitleRow(
      DatesService.formatDateFromDateString(chronologyStep.date),
      false,
      0,
      {
        stackWidgetReference: StackWidgetReference.chronologyStep,
        stackWidgetConfig: { id: chronologyStep.id },
      },
    );

    const chronologyStepDescriptionRow: ExportRow = {
      cells: {
        [ExportColumnType.description]: {
          text: chronologyStep.description,
        },
      },
      metaData: {},
      stackWidgetReference: StackWidgetReference.chronologyStep,
      stackWidgetConfig: { id: chronologyStep.id },
    };

    const chronologyStepAttendances = attendances.filter(
      (attendance) => attendance.chronologyStepId === chronologyStep.id,
    );

    const chronologyStepAttendanceRows =
      ExportAttendancesService.createAttendancesRows(
        chronologyStepAttendances,
        part,
        feeEarners,
        rateGroups,
        rates,
        false,
      );

    const chronologyStepSuccessFees = successFees.filter(
      (successFee) => successFee.chronologyStepId === chronologyStep.id,
    );

    const chronologyStepSuccessFeeRows =
      ExportSuccessFeesService.createSuccessFeesRows(
        chronologyStepSuccessFees,
        part,
      );

    const solicitorsSuccessFeeRows =
      ExportSolicitorsSuccessFeesService.createSolicitorsSuccessFeesRows(
        chronologyStepAttendanceRows,
        part,
      );

    const enhancementRows = ExportEnhancementsService.createEnhancementsRows(
      chronologyStepAttendanceRows,
      enhancements,
    );

    const careAndConductRows =
      ExportCareAndConductService.createCareAndConductRows(
        chronologyStepAttendanceRows,
        part,
        false,
      );

    const chronologyStepDisbursements = disbursements.filter(
      (disbursement) => disbursement.chronologyStepId === chronologyStep.id,
    );

    const chronologyStepDisbursementRows = chronologyStepDisbursements
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
        ...chronologyStepAttendanceRows,
        ...chronologyStepSuccessFeeRows,
        ...solicitorsSuccessFeeRows,
        ...enhancementRows,
        ...careAndConductRows,
        ...chronologyStepDisbursementRows,
      ]);

    return [
      chronologyStepTitleRow,
      chronologyStepDescriptionRow,
      ...clsInterPartesSeparatedRows,
    ];
  }
}
