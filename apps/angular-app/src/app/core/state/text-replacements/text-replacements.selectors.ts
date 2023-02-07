import { TextReplacement } from '../../models/text-replacement.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './text-replacements.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<TextReplacement>(adapter, chunkName);
