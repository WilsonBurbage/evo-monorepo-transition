import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableDataFormatter } from '../../../../core/models/table-data-formatter.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';

@Component({
  selector: 'app-attendances-dumb',
  templateUrl: './attendances-dumb.component.html',
  styleUrls: ['./attendances-dumb.component.scss'],
})
export class AttendancesDumbComponent extends StackWidgetDumbComponentClass {
  @Input() attendances!: Attendance[];
  @Input() feeEarners!: FeeEarner[];

  @Output() newAttendanceClicked = new EventEmitter();
  @Output() editAttendanceClicked = new EventEmitter<
    TableRowEventPayload<Attendance>
  >();
  @Output() deleteAttendanceClicked = new EventEmitter<Attendance>();

  tableConfig: TableConfig<Attendance> = {
    columns: [
      {
        title: 'Fee Earner',
        valueMethod: (attendance): string =>
          this.feeEarners.find(
            (feeEarner) => feeEarner.id === attendance.feeEarnerId,
          )!.reference,
      },
      {
        title: 'Description',
        valuePropertyPath: 'description',
      },
      {
        title: 'Time',
        valuePropertyPath: 'time',
      },
      {
        title: 'Notes',
        valuePropertyPath: 'notes',
        dataFormatter: TableDataFormatter.boolean,
      },
    ],
    deleteable: true,
  };

  onNewAttendanceClicked(): void {
    this.newAttendanceClicked.emit();
  }

  onEditAttendanceClicked(
    eventPayload: TableRowEventPayload<Attendance>,
  ): void {
    this.editAttendanceClicked.emit(eventPayload);
  }

  onDeleteAttendanceClicked(attendance: Attendance): void {
    this.deleteAttendanceClicked.emit(attendance);
  }
}
