import { AccountEffects } from './account/account.effects';
import { AppEffects } from './app/app.effects';
import { AuthenticationEffects } from './authentication/authentication.effects';
import { CorrespondenceCountersEffects } from './correspondence-counters/correspondence-counters.effects';
import { DeveloperEffects } from './developer/developer.effects';
import { EvoFileEffects } from './evo-file/evo-file.effects';
import { EvoSettingsEffects } from './evo-settings/evo-settings.effects';
import { RemovingEffects } from './global/removing.effects';
import { MenuEffects } from './menu/menu.effects';
import { RateGroupsEffects } from './rate-groups/rate-groups.effects';
import { RatesEffects } from './rates/rates.effects';
import { SolicitorLookupEffects } from './solicitor-lookup/solicitor-lookup.effects';
import { SolicitorsEffects } from './solicitors/solicitors.effects';
import { ToastMessagesEffects } from './toast-messages/toast-messages.effects';
import { UiEffects } from './ui/ui.effects';
import { WordFileEffects } from './word-file/word-file.effects';

export const effects = [
  AccountEffects,
  AppEffects,
  AuthenticationEffects,
  CorrespondenceCountersEffects,
  DeveloperEffects,
  EvoFileEffects,
  EvoSettingsEffects,
  MenuEffects,
  RateGroupsEffects,
  RatesEffects,
  RemovingEffects,
  SolicitorLookupEffects,
  SolicitorsEffects,
  ToastMessagesEffects,
  UiEffects,
  WordFileEffects,
];
