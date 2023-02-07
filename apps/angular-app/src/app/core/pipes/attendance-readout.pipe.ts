import { Pipe, PipeTransform } from '@angular/core';
import { Attendance } from '../models/attendance.model';

@Pipe({
  name: 'attendanceReadout',
})
export class AttendanceReadoutPipe implements PipeTransform {
  transform(attendance: Attendance): string {
    return `${attendance.description}: ${attendance.time}`;
  }
}
