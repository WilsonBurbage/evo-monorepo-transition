import { Solicitor } from '../../models/solicitor.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './solicitors.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<Solicitor>(adapter, chunkName);
