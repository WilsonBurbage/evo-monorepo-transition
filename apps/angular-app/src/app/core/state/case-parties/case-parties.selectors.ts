import { CaseParty } from '../../models/case-party.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './case-parties.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<CaseParty>(adapter, chunkName);
