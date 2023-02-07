import { CryptoService } from '@evo-monorepo/shared';
import { createSelector } from '@ngrx/store';
import { BillSetup } from '../../models/bill-setup.model';
import { CoverSheetDetails } from '../../models/cover-sheet-details.model';
import { EvoFile } from '../../models/evo-file.model';
import { Narrative } from '../../models/narrative.model';
import * as attendancesSelectors from './../attendances/attendances.selectors';
import * as billSetupSelectors from './../bill-setup/bill-setup.selectors';
import * as casePartiesSelectors from './../case-parties/case-parties.selectors';
import * as chronologyStepsSelectors from './../chronology-steps/chronology-steps.selectors';
import * as correspondenceCountersSelectors from './../correspondence-counters/correspondence-counters.selectors';
import * as counselsSelectors from './../counsels/counsels.selectors';
import * as coverSheetDetailsSelectors from './../cover-sheet-details/cover-sheet-details.selectors';
import * as coverSheetItemsSelectors from './../cover-sheet-items/cover-sheet-items.selectors';
import * as disbursementsSelectors from './../disbursements/disbursements.selectors';
import * as documentsItemsSelectors from './../documents-items/documents-items.selectors';
import * as enhancementsSelectors from './../enhancements/enhancements.selectors';
import * as feeEarnersSelectors from './../fee-earners/fee-earners.selectors';
import * as narrativeSelectors from './../narrative/narrative.selectors';
import * as partiesSelectors from './../parties/parties.selectors';
import * as partsSelectors from './../parts/parts.selectors';
import * as rateGroupsSelectors from './../rate-groups/rate-groups.selectors';
import * as ratesSelectors from './../rates/rates.selectors';
import { GlobalState } from './../reducers';
import * as solicitorsSelectors from './../solicitors/solicitors.selectors';
import * as successFeesSelectors from './../success-fees/success-fees.selectors';
import * as evoFileReducer from './evo-file.reducer';

/**
 * Reducer state selector
 */
export const getState = (state: GlobalState): evoFileReducer.State =>
  state[evoFileReducer.chunkName];

export const getOpening = createSelector(
  getState,
  (state) => state.openingAsyncState
);

export const getFilePath = createSelector(getState, (state) => state.filePath);

export const getHash = createSelector(getState, (state) => state.hash);

export const getCompiledEvoFile = createSelector(
  attendancesSelectors.entitySelectors.selectAll,
  billSetupSelectors.getBillSetup,
  casePartiesSelectors.entitySelectors.selectAll,
  chronologyStepsSelectors.entitySelectors.selectAll,
  correspondenceCountersSelectors.entitySelectors.selectAll,
  counselsSelectors.entitySelectors.selectAll,
  coverSheetDetailsSelectors.getCoverSheetDetails,
  coverSheetItemsSelectors.entitySelectors.selectAll,
  disbursementsSelectors.entitySelectors.selectAll,
  documentsItemsSelectors.entitySelectors.selectAll,
  enhancementsSelectors.entitySelectors.selectAll,
  feeEarnersSelectors.entitySelectors.selectAll,
  narrativeSelectors.getNarrative,
  partiesSelectors.entitySelectors.selectAll,
  partsSelectors.entitySelectors.selectAll,
  rateGroupsSelectors.entitySelectors.selectAll,
  ratesSelectors.entitySelectors.selectAll,
  solicitorsSelectors.entitySelectors.selectAll,
  successFeesSelectors.entitySelectors.selectAll,

  (
    attendances,
    billSetup = {} as BillSetup,
    caseParties,
    chronologySteps,
    correspondenceCounters,
    counsels,
    coverSheetDetails = {} as CoverSheetDetails,
    coverSheetItems,
    disbursements,
    documentsItems,
    enhancements,
    feeEarners,
    narrative = {} as Narrative,
    parties,
    parts,
    rateGroups,
    rates,
    solicitors,
    successFees
  ): EvoFile => ({
    attendances,
    billSetup,
    caseParties,
    chronologySteps,
    correspondenceCounters,
    counsels,
    coverSheetDetails,
    coverSheetItems,
    disbursements,
    documentsItems,
    enhancements,
    feeEarners,
    narrative,
    parties,
    parts,
    rateGroups,
    rates,
    solicitors,
    successFees,
    version: window.bridge.constants.frameworkDetails.evo.version,
  })
);

export const getEvoFileHasChangedSinceSave = createSelector(
  getCompiledEvoFile,
  getHash,
  (compiledEvoFile, hash) =>
    CryptoService.hash(JSON.stringify(compiledEvoFile)) !== hash
);
