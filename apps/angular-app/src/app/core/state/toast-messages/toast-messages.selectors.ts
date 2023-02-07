import { ToastMessage } from '../../models/toast-message.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './toast-messages.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<ToastMessage>(adapter, chunkName);
