import { SuccessFee } from '../../models/success-fee.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './success-fees.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<SuccessFee>(adapter, chunkName);
