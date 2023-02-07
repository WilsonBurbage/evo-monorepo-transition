import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Attendance } from '../../models/attendance.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { DatesService } from '../../services/dates.service';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as attendancesActions from './attendances.actions';

export const chunkName = EntityChunkName.attendances;

export type State = EntityState<Attendance>;

export const adapter: EntityAdapter<Attendance> =
  createEntityAdapter<Attendance>({
    sortComparer: (a, b) =>
      DatesService.getMillisecondsBetweenDateStrings(a.date, b.date),
  });

export const initialState = adapter.getInitialState();

const attendancesReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(attendancesActions.setAttendances, (state, { attendances }) => {
    return adapter.setAll(attendances, state);
  }),

  on(attendancesActions.upsertAttendance, (state, { attendance }) => {
    return adapter.upsertOne(attendance, state);
  }),

  on(attendancesActions.removeAttendance, (state, { attendanceId }) => {
    return adapter.removeOne(attendanceId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return attendancesReducer(state, action);
}
