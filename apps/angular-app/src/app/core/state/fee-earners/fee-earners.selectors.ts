import { FeeEarner } from '../../models/fee-earner.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './fee-earners.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<FeeEarner>(adapter, chunkName);
