import * as attendancesActions from '../attendances/attendances.actions';
import * as casePartiesActions from '../case-parties/case-parties.actions';
import * as chronologyStepsActions from '../chronology-steps/chronology-steps.actions';
import * as correspondenceCountersActions from '../correspondence-counters/correspondence-counters.actions';
import * as counselsActions from '../counsels/counsels.actions';
import * as coverSheetItemsActions from '../cover-sheet-items/cover-sheet-items.actions';
import * as disbursementsActions from '../disbursements/disbursements.actions';
import * as documentsItemsActions from '../documents-items/documents-items.actions';
import * as enhancementsActions from '../enhancements/enhancements.actions';
import * as feeEarnersActions from '../fee-earners/fee-earners.actions';
import * as partiesActions from '../parties/parties.actions';
import * as partsActions from '../parts/parts.actions';
import * as rateGroupsActions from '../rate-groups/rate-groups.actions';
import * as ratesActions from '../rates/rates.actions';
import * as solicitorsActions from '../solicitors/solicitors.actions';
import * as successFeesActions from '../success-fees/success-fees.actions';
import * as evoFileActions from './../evo-file/evo-file.actions';

export const ACTIONS_THAT_REQUIRE_TEMPORARY_SELECTOR_DISABLING = [
  // Bill because shitloads happens when we load a bill and the selectors won't be ready until it's all loaded
  evoFileActions.openEvoFileSuccess,

  // Parts because solicitors and rates have to be added
  partsActions.setParts,
  partsActions.upsertPart,

  // Parties and fee earners because correspondence counters have to be added
  partiesActions.setParties,
  partiesActions.upsertParty,
  feeEarnersActions.setFeeEarners,
  feeEarnersActions.upsertFeeEarner,
  feeEarnersActions.upsertFeeEarners,

  // Rate groups because rates have to be added
  rateGroupsActions.setRateGroups,
  rateGroupsActions.upsertRateGroup,

  // Any removal action to allow joined entities to also be removed
  attendancesActions.removeAttendance,
  casePartiesActions.removeCaseParty,
  chronologyStepsActions.removeChronologyStep,
  correspondenceCountersActions.removeCorrespondenceCounter,
  counselsActions.removeCounsel,
  coverSheetItemsActions.removeCoverSheetItem,
  disbursementsActions.removeDisbursement,
  documentsItemsActions.removeDocumentsItem,
  enhancementsActions.removeEnhancement,
  feeEarnersActions.removeFeeEarner,
  partiesActions.removeParty,
  partsActions.removePart,
  rateGroupsActions.removeRateGroup,
  ratesActions.removeRate,
  solicitorsActions.removeSolicitor,
  successFeesActions.removeSuccessFee,
];
