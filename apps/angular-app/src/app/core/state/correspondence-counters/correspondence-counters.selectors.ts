import { CorrespondenceCounter } from '../../models/correspondence-counter.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './correspondence-counters.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<CorrespondenceCounter>(
    adapter,
    chunkName,
  );
