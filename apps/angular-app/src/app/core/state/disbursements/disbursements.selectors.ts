import { Disbursement } from '../../models/disbursement.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './disbursements.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<Disbursement>(adapter, chunkName);
