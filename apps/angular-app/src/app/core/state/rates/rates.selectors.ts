import { Rate } from '../../models/rate.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './rates.reducer';

export const entitySelectors = SelectorsService.generateEntitySelectors<Rate>(
  adapter,
  chunkName,
);
