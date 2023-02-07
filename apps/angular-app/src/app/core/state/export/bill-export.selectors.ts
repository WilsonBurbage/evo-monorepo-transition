import { createSelector } from '@ngrx/store';
import { BILL_TYPE_COLUMN_SETS_MAP } from '../../constants/export-columns.constants';
import { ExportColumn } from '../../models/export-column.model';
import { ExportRow } from '../../models/export-row.model';
import { ExportClsService } from '../../services/export-cls.service';
import { ExportPartAndBillSummariesService } from '../../services/export-part-and-bill-summaries.service';
import { ExportPartsService } from '../../services/export-parts.service';
import { ExportService } from '../../services/export.service';
import { LogService } from '../../services/log.service';
import * as attendancesSelectors from './../attendances/attendances.selectors';
import * as billSetupSelectors from './../bill-setup/bill-setup.selectors';
import * as chronologyStepsSelectors from './../chronology-steps/chronology-steps.selectors';
import * as correspondenceCountersSelectors from './../correspondence-counters/correspondence-counters.selectors';
import * as counselsSelectors from './../counsels/counsels.selectors';
import * as disbursementsSelectors from './../disbursements/disbursements.selectors';
import * as documentsItemsSelectors from './../documents-items/documents-items.selectors';
import * as enhancementsSelectors from './../enhancements/enhancements.selectors';
import * as feeEarnersSelectors from './../fee-earners/fee-earners.selectors';
import * as partiesSelectors from './../parties/parties.selectors';
import * as partsSelectors from './../parts/parts.selectors';
import * as rateGroupsSelectors from './../rate-groups/rate-groups.selectors';
import * as ratesSelectors from './../rates/rates.selectors';
import * as successFeesSelectors from './../success-fees/success-fees.selectors';
import * as uiSelectors from './../ui/ui.selectors';

export const getExportColumnsForBill = createSelector(
  uiSelectors.getBillSelectorsEnabled,
  billSetupSelectors.getBillSetup,

  (billSelectorsEnabled, billSetup): ExportColumn[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    return BILL_TYPE_COLUMN_SETS_MAP[billSetup!.billType];
  },
);

const getExportRowsForParts = createSelector(
  uiSelectors.getBillSelectorsEnabled,
  billSetupSelectors.getBillSetup,

  attendancesSelectors.entitySelectors.selectAll,
  chronologyStepsSelectors.entitySelectors.selectAll,
  correspondenceCountersSelectors.entitySelectors.selectAll,
  counselsSelectors.entitySelectors.selectAll,
  disbursementsSelectors.entitySelectors.selectAll,
  documentsItemsSelectors.entitySelectors.selectAll,
  enhancementsSelectors.entitySelectors.selectAll,
  feeEarnersSelectors.entitySelectors.selectAll,
  partiesSelectors.entitySelectors.selectAll,
  partsSelectors.entitySelectors.selectAll,
  rateGroupsSelectors.entitySelectors.selectAll,
  ratesSelectors.entitySelectors.selectAll,
  successFeesSelectors.entitySelectors.selectAll,
  (
    billSelectorsEnabled,
    billSetup,

    attendances,
    chronologySteps,
    correspondenceCounters,
    counsels,
    disbursements,
    documentsItems,
    enhancements,
    feeEarners,
    parties,
    parts,
    rateGroups,
    rates,
    successFees,
  ): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    LogService.startTimer('preview getExportRowsForParts');

    const partsRows = parts.map((part): ExportRow[] =>
      ExportPartsService.createPartRows(
        billSetup!,
        part,
        attendances,
        chronologySteps,
        correspondenceCounters,
        counsels,
        disbursements,
        documentsItems,
        enhancements,
        feeEarners,
        parties,
        parts,
        rateGroups,
        rates,
        successFees,
      ),
    );

    const flattenedPartsRows = [...partsRows.flat()];

    LogService.endTimer('preview getExportRowsForParts');

    return flattenedPartsRows;
  },
);

export const getExportRowsForBillSummary = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  getExportRowsForParts,
  counselsSelectors.entitySelectors.selectAll,
  (billSelectorsEnabled, partsRows, counsels): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    LogService.startTimer('preview getExportRowsForBillSummary');

    const billSummaryRows =
      ExportPartAndBillSummariesService.createBillSummaryRows(
        partsRows,
        counsels,
      );

    LogService.endTimer('preview getExportRowsForBillSummary');

    return billSummaryRows;
  },
);

export const getExportRowsForBill = createSelector(
  uiSelectors.getBillSelectorsEnabled,
  billSetupSelectors.getBillSetup,

  getExportRowsForParts,
  getExportRowsForBillSummary,
  (
    billSelectorsEnabled,
    billSetup,
    partsRows,
    billSummaryRows,
  ): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    LogService.startTimer('preview getExportRowsForBill');

    const allRows = [...partsRows, ...billSummaryRows];

    const clsSeparatedRows =
      ExportClsService.applyClsInterPartesColumnSeparation(
        billSetup!.billType,
        allRows,
      );

    const numberedRows = ExportService.applyRowNumbering(clsSeparatedRows);

    const notesAppliedRows = billSetup?.includeNotesInBill
      ? ExportService.createNotesRows(numberedRows)
      : numberedRows;

    LogService.endTimer('preview getExportRowsForBill');

    console.log('total rows', notesAppliedRows.length);

    console.log('------------------------------------');

    return notesAppliedRows;
  },
);
