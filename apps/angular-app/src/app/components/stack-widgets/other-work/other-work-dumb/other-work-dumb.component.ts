import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableDataFormatter } from '../../../../core/models/table-data-formatter.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';

@Component({
  selector: 'app-other-work-dumb',
  templateUrl: './other-work-dumb.component.html',
  styleUrls: ['./other-work-dumb.component.scss'],
})
export class OtherWorkDumbComponent extends StackWidgetDumbComponentClass {
  @Input() attendances!: Attendance[];
  @Input() disbursements!: Disbursement[];
  @Input() feeEarners!: FeeEarner[];

  @Output() newAttendanceClicked = new EventEmitter();
  @Output() editAttendanceClicked = new EventEmitter<
    TableRowEventPayload<Attendance>
  >();
  @Output() deleteAttendanceClicked = new EventEmitter<Attendance>();
  @Output() newDisbursementClicked = new EventEmitter();
  @Output() editDisbursementClicked = new EventEmitter<
    TableRowEventPayload<Disbursement>
  >();
  @Output() deleteDisbursementClicked = new EventEmitter<Disbursement>();

  attendancesTableConfig: TableConfig<Attendance> = {
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

  disbursementsTableConfig: TableConfig<Disbursement> = {
    columns: [
      {
        title: 'Description',
        valuePropertyPath: 'description',
      },
      {
        title: 'Amount',
        valuePropertyPath: 'amount',
        dataFormatter: TableDataFormatter.currency,
      },
      {
        title: 'VAT',
        valuePropertyPath: 'vat',
        dataFormatter: TableDataFormatter.currency,
      },
    ],
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

  onNewDisbursementClicked(): void {
    this.newDisbursementClicked.emit();
  }

  onEditDisbursementClicked(
    eventPayload: TableRowEventPayload<Disbursement>,
  ): void {
    this.editDisbursementClicked.emit(eventPayload);
  }

  onDeleteDisbursementClicked(disbursement: Disbursement): void {
    this.deleteDisbursementClicked.emit(disbursement);
  }
}
