import * as accountReducer from './account/account.reducer';
import * as attendancesReducer from './attendances/attendances.reducer';
import * as authenticationReducer from './authentication/authentication.reducer';
import * as billSetupReducer from './bill-setup/bill-setup.reducer';
import * as casePartiesReducer from './case-parties/case-parties.reducer';
import * as chronologyStepsReducer from './chronology-steps/chronology-steps.reducer';
import * as correspondenceCountersReducer from './correspondence-counters/correspondence-counters.reducer';
import * as counselsReducer from './counsels/counsels.reducer';
import * as coverSheetDetailsReducer from './cover-sheet-details/cover-sheet-details.reducer';
import * as coverSheetItemsReducer from './cover-sheet-items/cover-sheet-items.reducer';
import * as disbursementsReducer from './disbursements/disbursements.reducer';
import * as documentsItemsReducer from './documents-items/documents-items.reducer';
import * as enhancementsReducer from './enhancements/enhancements.reducer';
import * as evoFileReducer from './evo-file/evo-file.reducer';
import * as evoSettingsReducer from './evo-settings/evo-settings.reducer';
import * as feeEarnersReducer from './fee-earners/fee-earners.reducer';
import * as narrativeReducer from './narrative/narrative.reducer';
import * as partiesReducer from './parties/parties.reducer';
import * as partsReducer from './parts/parts.reducer';
import * as rateGroupsReducer from './rate-groups/rate-groups.reducer';
import * as ratesReducer from './rates/rates.reducer';
import * as solicitorLookupReducer from './solicitor-lookup/solicitor-lookup.reducer';
import * as solicitorsReducer from './solicitors/solicitors.reducer';
import * as successFeesReducer from './success-fees/success-fees.reducer';
import * as textReplacementsReducer from './text-replacements/text-replacements.reducer';
import * as toastMessagesReducer from './toast-messages/toast-messages.reducer';
import * as uiReducer from './ui/ui.reducer';
import * as wordFileReducer from './word-file/word-file.reducer';

export interface GlobalState {
  // System
  [accountReducer.chunkName]: accountReducer.State;
  [authenticationReducer.chunkName]: authenticationReducer.State;
  [evoFileReducer.chunkName]: evoFileReducer.State;
  [evoSettingsReducer.chunkName]: evoSettingsReducer.State;
  [solicitorLookupReducer.chunkName]: solicitorLookupReducer.State;
  [toastMessagesReducer.chunkName]: toastMessagesReducer.State;
  [uiReducer.chunkName]: uiReducer.State;
  [wordFileReducer.chunkName]: wordFileReducer.State;

  // Settings
  [textReplacementsReducer.chunkName]: textReplacementsReducer.State;

  // Bill
  [attendancesReducer.chunkName]: attendancesReducer.State;
  [billSetupReducer.chunkName]: billSetupReducer.State;
  [casePartiesReducer.chunkName]: casePartiesReducer.State;
  [chronologyStepsReducer.chunkName]: chronologyStepsReducer.State;
  [correspondenceCountersReducer.chunkName]: correspondenceCountersReducer.State;
  [counselsReducer.chunkName]: counselsReducer.State;
  [coverSheetDetailsReducer.chunkName]: coverSheetDetailsReducer.State;
  [coverSheetItemsReducer.chunkName]: coverSheetItemsReducer.State;
  [disbursementsReducer.chunkName]: disbursementsReducer.State;
  [documentsItemsReducer.chunkName]: documentsItemsReducer.State;
  [enhancementsReducer.chunkName]: enhancementsReducer.State;
  [feeEarnersReducer.chunkName]: feeEarnersReducer.State;
  [narrativeReducer.chunkName]: narrativeReducer.State;
  [partiesReducer.chunkName]: partiesReducer.State;
  [partsReducer.chunkName]: partsReducer.State;
  [rateGroupsReducer.chunkName]: rateGroupsReducer.State;
  [ratesReducer.chunkName]: ratesReducer.State;
  [solicitorsReducer.chunkName]: solicitorsReducer.State;
  [successFeesReducer.chunkName]: successFeesReducer.State;
}

export const reducers = {
  // System
  [accountReducer.chunkName]: accountReducer.reducer,
  [authenticationReducer.chunkName]: authenticationReducer.reducer,
  [evoFileReducer.chunkName]: evoFileReducer.reducer,
  [evoSettingsReducer.chunkName]: evoSettingsReducer.reducer,
  [solicitorLookupReducer.chunkName]: solicitorLookupReducer.reducer,
  [toastMessagesReducer.chunkName]: toastMessagesReducer.reducer,
  [uiReducer.chunkName]: uiReducer.reducer,
  [wordFileReducer.chunkName]: wordFileReducer.reducer,

  // Settings
  [textReplacementsReducer.chunkName]: textReplacementsReducer.reducer,

  // Bill
  [attendancesReducer.chunkName]: attendancesReducer.reducer,
  [billSetupReducer.chunkName]: billSetupReducer.reducer,
  [casePartiesReducer.chunkName]: casePartiesReducer.reducer,
  [chronologyStepsReducer.chunkName]: chronologyStepsReducer.reducer,
  [correspondenceCountersReducer.chunkName]:
    correspondenceCountersReducer.reducer,
  [counselsReducer.chunkName]: counselsReducer.reducer,
  [coverSheetDetailsReducer.chunkName]: coverSheetDetailsReducer.reducer,
  [coverSheetItemsReducer.chunkName]: coverSheetItemsReducer.reducer,
  [disbursementsReducer.chunkName]: disbursementsReducer.reducer,
  [documentsItemsReducer.chunkName]: documentsItemsReducer.reducer,
  [enhancementsReducer.chunkName]: enhancementsReducer.reducer,
  [feeEarnersReducer.chunkName]: feeEarnersReducer.reducer,
  [narrativeReducer.chunkName]: narrativeReducer.reducer,
  [partiesReducer.chunkName]: partiesReducer.reducer,
  [partsReducer.chunkName]: partsReducer.reducer,
  [rateGroupsReducer.chunkName]: rateGroupsReducer.reducer,
  [ratesReducer.chunkName]: ratesReducer.reducer,
  [solicitorsReducer.chunkName]: solicitorsReducer.reducer,
  [successFeesReducer.chunkName]: successFeesReducer.reducer,
};
