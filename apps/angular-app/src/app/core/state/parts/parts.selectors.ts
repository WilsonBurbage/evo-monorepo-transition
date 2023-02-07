import { Part } from '../../models/part.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './parts.reducer';

export const entitySelectors = SelectorsService.generateEntitySelectors<Part>(
  adapter,
  chunkName,
);
