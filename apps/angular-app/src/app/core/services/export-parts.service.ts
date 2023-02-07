import { Attendance } from '../models/attendance.model';
import { BillSetup } from '../models/bill-setup.model';
import { ChronologyStep } from '../models/chronology-step.model';
import { CorrespondenceCounter } from '../models/correspondence-counter.model';
import { Counsel } from '../models/counsel.model';
import { Disbursement } from '../models/disbursement.model';
import { DocumentsItem } from '../models/documents-item.model';
import { Enhancement } from '../models/enhancement.model';
import { ExportRow } from '../models/export-row.model';
import { FeeEarner } from '../models/fee-earner.model';
import { PartSpecificAttendanceType } from '../models/part-specific-attendance-type.model';
import { PartSpecificDisbursementType } from '../models/part-specific-disbursement-type.model';
import { Part } from '../models/part.model';
import { Party } from '../models/party.model';
import { RateGroup } from '../models/rate-group.model';
import { Rate } from '../models/rate.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { SuccessFee } from '../models/success-fee.model';
import { ExportAttendancesService } from './export-attendances.service';
import { ExportCareAndConductService } from './export-care-and-conduct.service';
import { ExportChronologyStepsService } from './export-chronology-steps.service';
import { ExportClsService } from './export-cls.service';
import { ExportDisbursementsService } from './export-disbursements.service';
import { ExportDocumentsItemsService } from './export-documents-items.service';
import { ExportEnhancementsService } from './export-enhancements.service';
import { ExportPartAndBillSummariesService } from './export-part-and-bill-summaries.service';
import { ExportPartiesService } from './export-parties.service';
import { ExportSolicitorsSuccessFeesService } from './export-solicitors-success-fees.service';
import { ExportService } from './export.service';

export class ExportPartsService {
  static createPartRows(
    billSetup: BillSetup,
    part: Part,
    attendances: Attendance[],
    chronologySteps: ChronologyStep[],
    correspondenceCounters: CorrespondenceCounter[],
    counsels: Counsel[],
    disbursements: Disbursement[],
    documentsItems: DocumentsItem[],
    enhancements: Enhancement[],
    feeEarners: FeeEarner[],
    parties: Party[],
    parts: Part[],
    rateGroups: RateGroup[],
    rates: Rate[],
    successFees: SuccessFee[],
  ): ExportRow[] {
    const partTitleRow = ExportService.createTitleRow(
      this.getFullPartName(part, parts, billSetup),
      true,
      1,
      {
        stackWidgetReference: StackWidgetReference.part,
        stackWidgetConfig: { id: part.id },
      },
    );

    const chronologyStepsForPart = chronologySteps.filter(
      (chronologyStep) => chronologyStep.partId === part.id,
    );

    const chronologyTitleRows = [
      ...(chronologyStepsForPart.length
        ? [
            ExportService.createTitleRow('Chronology', true, 2, {
              stackWidgetReference: StackWidgetReference.chronology,
            }),
          ]
        : []),
    ];

    const chronologyStepsRows: ExportRow[] = chronologyStepsForPart
      .map((chronologyStep): ExportRow[] =>
        ExportChronologyStepsService.createChronologyStepRows(
          chronologyStep,
          attendances,
          part,
          feeEarners,
          rateGroups,
          rates,
          successFees,
          disbursements,
          counsels,
          enhancements,
        ),
      )
      .flat();

    const partiesForPart = parties.filter((party) => party.partId === part.id);

    const mainItemTitleRows = [
      ...(partiesForPart.length
        ? [
            ExportService.createTitleRow(
              `${
                part.hasCareAndConduct ? 'Part A: ' : ''
              }Attendances on and communications with:`,
              true,
              2,
              { stackWidgetReference: StackWidgetReference.parties },
            ),
          ]
        : []),
    ];

    const partiesRows: ExportRow[] = partiesForPart
      .map((party): ExportRow[] =>
        ExportPartiesService.createPartyRows(
          party,
          attendances,
          part,
          feeEarners,
          rateGroups,
          rates,
          correspondenceCounters,
          disbursements,
          counsels,
        ),
      )
      .flat();

    const documentsItemsForPart = documentsItems.filter(
      (documentsItem) => documentsItem.partId === part.id,
    );

    const documentsTitleRows = [
      ...(documentsItemsForPart.length
        ? [
            ExportService.createTitleRow('Work done on documents', true, 2, {
              stackWidgetReference: StackWidgetReference.documents,
            }),
          ]
        : []),
    ];

    const documentsItemsRows =
      ExportDocumentsItemsService.createDocumentsItemsRows(
        documentsItemsForPart,
        part,
        feeEarners,
        rateGroups,
        rates,
      );

    const mainItemSolicitorsSuccessFeeRows =
      ExportClsService.applyClsInterpartiesBlockSeparation(
        ExportSolicitorsSuccessFeesService.createSolicitorsSuccessFeesRows(
          [...partiesRows, ...documentsItemsRows],
          part,
        ),
      );

    const mainItemEnhancementRows =
      ExportEnhancementsService.createEnhancementsRows(
        [...partiesRows, ...documentsItemsRows],
        enhancements,
      );

    const mainItemCareAndConductRows =
      ExportCareAndConductService.createCareAndConductRows(
        [...partiesRows, ...documentsItemsRows],
        part,
        true,
      );

    const additionalItemsTitleRows = [
      ...([
        ...mainItemSolicitorsSuccessFeeRows,
        ...mainItemEnhancementRows,
        ...mainItemCareAndConductRows,
      ].length
        ? [ExportService.createTitleRow('Additional Items', true, 2)]
        : []),
    ];

    const otherDisbursementsForPart = disbursements.filter(
      (disbursement) =>
        disbursement.partId === part.id &&
        disbursement.partSpecificDisbursementType ===
          PartSpecificDisbursementType.otherDisbursements,
    );

    const otherDisbursementsTitleRows = [
      ...(otherDisbursementsForPart.length
        ? [
            ExportService.createTitleRow('Other Disbursements', true, 2, {
              stackWidgetReference: StackWidgetReference.otherDisbursements,
            }),
          ]
        : []),
    ];

    const otherDisbursementsRows =
      ExportClsService.applyClsInterpartiesBlockSeparation(
        otherDisbursementsForPart
          .map((disbursement): ExportRow[] =>
            ExportDisbursementsService.createDisbursementRows(
              disbursement,
              counsels,
              part,
            ),
          )
          .flat(),
      );

    const otherWorkAttendancesForPart = attendances.filter(
      (attendance) =>
        attendance.partId === part.id &&
        attendance.partSpecificAttendanceType ===
          PartSpecificAttendanceType.otherWork,
    );

    const otherWorkAttendancesRows =
      ExportAttendancesService.createAttendancesRows(
        otherWorkAttendancesForPart,
        part,
        feeEarners,
        rateGroups,
        rates,
        false,
      );

    const otherWorkAttendancesSolicitorsSuccessFeeRows =
      ExportSolicitorsSuccessFeesService.createSolicitorsSuccessFeesRows(
        otherWorkAttendancesRows,
        part,
      );

    const otherWorkAttendancesEnhancementRows =
      ExportEnhancementsService.createEnhancementsRows(
        otherWorkAttendancesRows,
        enhancements,
      );

    const otherWorkAttendancesCareAndConductRows =
      ExportCareAndConductService.createCareAndConductRows(
        otherWorkAttendancesRows,
        part,
        false,
      );

    const otherWorkDisbursementsForPart = disbursements.filter(
      (disbursement) =>
        disbursement.partId === part.id &&
        disbursement.partSpecificDisbursementType ===
          PartSpecificDisbursementType.otherWork,
    );

    const otherWorkDisbursementsRows = otherWorkDisbursementsForPart
      .map((disbursement): ExportRow[] =>
        ExportDisbursementsService.createDisbursementRows(
          disbursement,
          counsels,
          part,
        ),
      )
      .flat();

    const otherWorkRows = ExportClsService.applyClsInterpartiesBlockSeparation([
      ...otherWorkAttendancesRows,
      ...otherWorkAttendancesSolicitorsSuccessFeeRows,
      ...otherWorkAttendancesEnhancementRows,
      ...otherWorkAttendancesCareAndConductRows,
      ...otherWorkDisbursementsRows,
    ]);

    const otherWorkTitleRows = [
      ...(otherWorkRows.length
        ? [ExportService.createTitleRow('Other Work Done', true, 2)]
        : []),
    ];

    const allPartWorkRows = [
      partTitleRow,
      ...chronologyTitleRows,
      ...chronologyStepsRows,
      ...mainItemTitleRows,
      ...partiesRows,
      ...documentsTitleRows,
      ...documentsItemsRows,
      ...additionalItemsTitleRows,
      ...mainItemSolicitorsSuccessFeeRows,
      ...mainItemEnhancementRows,
      ...mainItemCareAndConductRows,
      ...otherDisbursementsTitleRows,
      ...otherDisbursementsRows,
      ...otherWorkTitleRows,
      ...otherWorkRows,
    ];

    const partSummaryRows =
      ExportPartAndBillSummariesService.createPartSummaryRows(
        allPartWorkRows,
        part,
        counsels,
      );

    const enhancementDescriptionMarkedRows =
      ExportEnhancementsService.applyEnhancementDescriptionMarkers(
        allPartWorkRows,
        enhancements,
      );

    return [...enhancementDescriptionMarkedRows, ...partSummaryRows];
  }

  static getFullPartName(
    part: Part,
    parts: Part[],
    billSetup: BillSetup,
  ): string {
    const suffix = billSetup.autoNumberParts
      ? `Part ${parts.indexOf(part) + 1} - `
      : '';

    return `${suffix}${part.description}`;
  }

  static getPartWorkingVatPercentage(part: Part): number {
    return part.hasVat ? part.vatPercentage : 0;
  }

  static getPartWorkingSuccessFeePercentage(part: Part): number {
    return part.hasSuccessFee ? part.successFeePercentage : 0;
  }

  static getPartWorkingCareAndConductPercentage(part: Part): number {
    return part.hasCareAndConduct ? part.careAndConductPercentage : 0;
  }
}
