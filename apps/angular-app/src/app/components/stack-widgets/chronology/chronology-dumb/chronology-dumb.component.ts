import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { ChronologyColumnID } from '../../../../core/models/chronology-column-id.model';
import { ChronologyStep } from '../../../../core/models/chronology-step.model';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { SuccessFee } from '../../../../core/models/success-fee.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableDataFormatter } from '../../../../core/models/table-data-formatter.model';
import { AttendanceReadoutPipe } from '../../../../core/pipes/attendance-readout.pipe';
import { DisbursementReadoutPipe } from '../../../../core/pipes/disbursement-readout.pipe';
import { SuccessFeeReadoutPipe } from '../../../../core/pipes/success-fee-readout.pipe';

@Component({
  selector: 'app-chronology-dumb',
  templateUrl: './chronology-dumb.component.html',
  styleUrls: ['./chronology-dumb.component.scss'],
})
export class ChronologyDumbComponent extends StackWidgetDumbComponentClass {
  @Input() chronologySteps!: ChronologyStep[];
  @Input() attendances!: Attendance[];
  @Input() disbursements!: Disbursement[];
  @Input() successFees!: SuccessFee[];

  @Output() newChronologyStepClicked = new EventEmitter();
  @Output() editChronologyStepClicked = new EventEmitter<
    TableCellEventPayload<ChronologyStep>
  >();
  @Output() deleteChronologyStepClicked = new EventEmitter<ChronologyStep>();

  tableConfig: TableConfig<ChronologyStep> = {
    columns: [
      {
        id: ChronologyColumnID.chronologyStep,
        title: 'Date',
        valuePropertyPath: 'date',
        dataFormatter: TableDataFormatter.date,
      },
      {
        id: ChronologyColumnID.chronologyStep,
        title: 'Description',
        valuePropertyPath: 'description',
      },
      {
        id: ChronologyColumnID.attendances,
        title: 'Attendances',
        valueMethod: (chronologyStep): string[] =>
          this.attendances
            .filter(
              (attendance) => attendance.chronologyStepId === chronologyStep.id,
            )
            .map((attendance) =>
              new AttendanceReadoutPipe().transform(attendance),
            ),
      },
      {
        id: ChronologyColumnID.disbursements,
        title: 'Disbursements',
        valueMethod: (chronologyStep): string[] =>
          this.disbursements
            .filter(
              (disbursement) =>
                disbursement.chronologyStepId === chronologyStep.id,
            )
            .map((disbursement) =>
              new DisbursementReadoutPipe().transform(disbursement),
            ),
      },
      {
        id: ChronologyColumnID.successFees,
        title: 'Success fees',
        valueMethod: (chronologyStep): string[] =>
          this.successFees
            .filter(
              (successFee) => successFee.chronologyStepId === chronologyStep.id,
            )
            .map((successFee) =>
              new SuccessFeeReadoutPipe().transform(successFee),
            ),
      },
    ],
    deleteable: true,
  };

  onNewChronologyStepClicked(): void {
    this.newChronologyStepClicked.emit();
  }

  onEditChronologyStepClicked(
    eventPayload: TableCellEventPayload<ChronologyStep>,
  ): void {
    this.editChronologyStepClicked.emit(eventPayload);
  }

  onDeleteChronologyStepClicked(chronologyStep: ChronologyStep): void {
    this.deleteChronologyStepClicked.emit(chronologyStep);
  }
}
