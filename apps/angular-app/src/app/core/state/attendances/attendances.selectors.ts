import { Attendance } from '../../models/attendance.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './attendances.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<Attendance>(adapter, chunkName);
