import { ConstraintSet } from '../models/constraint-set.model';
import { EntityChunkName } from '../models/entity-chunk-name.model';
import * as attendancesReducer from '../state/attendances/attendances.reducer';
import * as casePartiesReducer from '../state/case-parties/case-parties.reducer';
import * as chronologyStepsReducer from '../state/chronology-steps/chronology-steps.reducer';
import * as correspondenceCountersReducer from '../state/correspondence-counters/correspondence-counters.reducer';
import * as counselsReducer from '../state/counsels/counsels.reducer';
import * as coverSheetItemsReducer from '../state/cover-sheet-items/cover-sheet-items.reducer';
import * as disbursementsReducer from '../state/disbursements/disbursements.reducer';
import * as documentsItemsReducer from '../state/documents-items/documents-items.reducer';
import * as enhancementsReducer from '../state/enhancements/enhancements.reducer';
import * as feeEarnersReducer from '../state/fee-earners/fee-earners.reducer';
import * as partiesReducer from '../state/parties/parties.reducer';
import * as partsReducer from '../state/parts/parts.reducer';
import * as rateGroupsReducer from '../state/rate-groups/rate-groups.reducer';
import * as ratesReducer from '../state/rates/rates.reducer';
import * as solicitorsReducer from '../state/solicitors/solicitors.reducer';
import * as successFeesReducer from '../state/success-fees/success-fees.reducer';
import * as textReplacementsReducer from '../state/text-replacements/text-replacements.reducer';

import * as attendancesSelectors from '../state/attendances/attendances.selectors';
import * as casePartiesSelectors from '../state/case-parties/case-parties.selectors';
import * as chronologyStepsSelectors from '../state/chronology-steps/chronology-steps.selectors';
import * as correspondenceCountersSelectors from '../state/correspondence-counters/correspondence-counters.selectors';
import * as counselsSelectors from '../state/counsels/counsels.selectors';
import * as coverSheetItemsSelectors from '../state/cover-sheet-items/cover-sheet-items.selectors';
import * as disbursementsSelectors from '../state/disbursements/disbursements.selectors';
import * as documentsItemsSelectors from '../state/documents-items/documents-items.selectors';
import * as enhancementsSelectors from '../state/enhancements/enhancements.selectors';
import * as feeEarnersSelectors from '../state/fee-earners/fee-earners.selectors';
import * as partiesSelectors from '../state/parties/parties.selectors';
import * as partsSelectors from '../state/parts/parts.selectors';
import * as rateGroupsSelectors from '../state/rate-groups/rate-groups.selectors';
import * as ratesSelectors from '../state/rates/rates.selectors';
import * as solicitorsSelectors from '../state/solicitors/solicitors.selectors';
import * as successFeesSelectors from '../state/success-fees/success-fees.selectors';
import * as textReplacementsSelectors from '../state/text-replacements/text-replacements.selectors';

import * as attendancesActions from '../state/attendances/attendances.actions';
import * as casePartiesActions from '../state/case-parties/case-parties.actions';
import * as chronologyStepsActions from '../state/chronology-steps/chronology-steps.actions';
import * as correspondenceCountersActions from '../state/correspondence-counters/correspondence-counters.actions';
import * as counselsActions from '../state/counsels/counsels.actions';
import * as coverSheetItemsActions from '../state/cover-sheet-items/cover-sheet-items.actions';
import * as disbursementsActions from '../state/disbursements/disbursements.actions';
import * as documentsItemsActions from '../state/documents-items/documents-items.actions';
import * as enhancementsActions from '../state/enhancements/enhancements.actions';
import * as feeEarnersActions from '../state/fee-earners/fee-earners.actions';
import * as partiesActions from '../state/parties/parties.actions';
import * as partsActions from '../state/parts/parts.actions';
import * as rateGroupsActions from '../state/rate-groups/rate-groups.actions';
import * as ratesActions from '../state/rates/rates.actions';
import * as solicitorsActions from '../state/solicitors/solicitors.actions';
import * as successFeesActions from '../state/success-fees/success-fees.actions';
import * as textReplacementsActions from '../state/text-replacements/text-replacements.actions';

export const CONSTRAINTS: {
  [key in EntityChunkName]: ConstraintSet | undefined;
} = {
  [EntityChunkName.account]: undefined,
  [EntityChunkName.attendances]: {
    adapter: attendancesReducer.adapter,
    selectors: attendancesSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      attendancesActions.removeAttendance({ attendanceId: entityId }),
  },
  [EntityChunkName.authentication]: undefined,
  [EntityChunkName.billSetup]: undefined,
  [EntityChunkName.caseParties]: {
    adapter: casePartiesReducer.adapter,
    selectors: casePartiesSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      casePartiesActions.removeCaseParty({ casePartyId: entityId }),
  },
  [EntityChunkName.chronologySteps]: {
    adapter: chronologyStepsReducer.adapter,
    selectors: chronologyStepsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      chronologyStepsActions.removeChronologyStep({
        chronologyStepId: entityId,
      }),
    foreignIdPropertyName: 'chronologyStepId',
    constraintEntityChunkNames: [
      EntityChunkName.attendances,
      EntityChunkName.disbursements,
      EntityChunkName.successFees,
    ],
  },
  [EntityChunkName.correspondenceCounters]: {
    adapter: correspondenceCountersReducer.adapter,
    selectors: correspondenceCountersSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      correspondenceCountersActions.removeCorrespondenceCounter({
        correspondenceCounterId: entityId,
      }),
  },
  [EntityChunkName.counsels]: {
    adapter: counselsReducer.adapter,
    selectors: counselsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      counselsActions.removeCounsel({ counselId: entityId }),
    foreignIdPropertyName: 'counselId',
    constraintEntityChunkNames: [EntityChunkName.disbursements],
  },
  [EntityChunkName.coverSheetDetails]: undefined,
  [EntityChunkName.coverSheetItems]: {
    adapter: coverSheetItemsReducer.adapter,
    selectors: coverSheetItemsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      coverSheetItemsActions.removeCoverSheetItem({
        coverSheetItemId: entityId,
      }),
  },
  [EntityChunkName.disbursements]: {
    adapter: disbursementsReducer.adapter,
    selectors: disbursementsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      disbursementsActions.removeDisbursement({ disbursementId: entityId }),
  },
  [EntityChunkName.documentsItems]: {
    adapter: documentsItemsReducer.adapter,
    selectors: documentsItemsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      documentsItemsActions.removeDocumentsItem({ documentsItemId: entityId }),
  },
  [EntityChunkName.enhancements]: {
    adapter: enhancementsReducer.adapter,
    selectors: enhancementsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      enhancementsActions.removeEnhancement({ enhancementId: entityId }),
    foreignIdPropertyName: 'enhancementId',
    constraintEntityChunkNames: [
      EntityChunkName.attendances,
      EntityChunkName.documentsItems,
    ],
  },
  [EntityChunkName.evoFile]: undefined,
  [EntityChunkName.evoSettings]: undefined,
  [EntityChunkName.feeEarners]: {
    adapter: feeEarnersReducer.adapter,
    selectors: feeEarnersSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      feeEarnersActions.removeFeeEarner({ feeEarnerId: entityId }),
    foreignIdPropertyName: 'feeEarnerId',
    constraintEntityChunkNames: [
      EntityChunkName.attendances,
      EntityChunkName.correspondenceCounters,
      EntityChunkName.documentsItems,
    ],
  },
  [EntityChunkName.narrative]: undefined,
  [EntityChunkName.parties]: {
    adapter: partiesReducer.adapter,
    selectors: partiesSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      partiesActions.removeParty({ partyId: entityId }),
    foreignIdPropertyName: 'partyId',
    constraintEntityChunkNames: [
      EntityChunkName.attendances,
      EntityChunkName.correspondenceCounters,
      EntityChunkName.disbursements,
    ],
  },
  [EntityChunkName.parts]: {
    adapter: partsReducer.adapter,
    selectors: partsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      partsActions.removePart({ partId: entityId }),
    foreignIdPropertyName: 'partId',
    constraintEntityChunkNames: [
      EntityChunkName.attendances,
      EntityChunkName.chronologySteps,
      EntityChunkName.disbursements,
      EntityChunkName.documentsItems,
      EntityChunkName.enhancements,
      EntityChunkName.parties,
      EntityChunkName.rates,
      EntityChunkName.solicitors,
    ],
  },
  [EntityChunkName.rateGroups]: {
    adapter: rateGroupsReducer.adapter,
    selectors: rateGroupsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      rateGroupsActions.removeRateGroup({ rateGroupId: entityId }),
    foreignIdPropertyName: 'rateGroupId',
    constraintEntityChunkNames: [
      EntityChunkName.feeEarners,
      EntityChunkName.rates,
    ],
  },
  [EntityChunkName.rates]: {
    adapter: ratesReducer.adapter,
    selectors: ratesSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      ratesActions.removeRate({ rateId: entityId }),
  },
  [EntityChunkName.recoveryFile]: undefined,
  [EntityChunkName.solicitorLookup]: undefined,
  [EntityChunkName.solicitors]: {
    adapter: solicitorsReducer.adapter,
    selectors: solicitorsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      solicitorsActions.removeSolicitor({ solicitorId: entityId }),
  },
  [EntityChunkName.successFees]: {
    adapter: successFeesReducer.adapter,
    selectors: successFeesSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      successFeesActions.removeSuccessFee({ successFeeId: entityId }),
  },
  [EntityChunkName.textReplacements]: {
    adapter: textReplacementsReducer.adapter,
    selectors: textReplacementsSelectors.entitySelectors,
    removeActionMethod: (entityId) =>
      textReplacementsActions.removeTextReplacement({
        textReplacementId: entityId,
      }),
  },
  [EntityChunkName.toastMessages]: undefined,
  [EntityChunkName.ui]: undefined,
  [EntityChunkName.wordFile]: undefined,
};
