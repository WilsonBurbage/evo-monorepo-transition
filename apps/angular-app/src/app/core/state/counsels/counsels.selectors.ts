import { Counsel } from '../../models/counsel.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './counsels.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<Counsel>(adapter, chunkName);
