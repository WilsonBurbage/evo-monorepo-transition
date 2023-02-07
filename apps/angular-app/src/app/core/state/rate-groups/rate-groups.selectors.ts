import { RateGroup } from '../../models/rate-group.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './rate-groups.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<RateGroup>(adapter, chunkName);
