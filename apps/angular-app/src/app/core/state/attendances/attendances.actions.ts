import { createAction, props } from '@ngrx/store';
import { Attendance } from '../../models/attendance.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Attendances';

export enum ActionNames {
  setAttendances = 'Set Attendances',
  upsertAttendance = 'Upsert Attendance',
  removeAttendance = 'Remove Attendance',
}

export const setAttendances = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setAttendances),
  props<{ attendances: Attendance[] }>(),
);

export const upsertAttendance = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertAttendance),
  props<{ attendance: Attendance }>(),
);

export const removeAttendance = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeAttendance),
  props<{ attendanceId: string }>(),
);
