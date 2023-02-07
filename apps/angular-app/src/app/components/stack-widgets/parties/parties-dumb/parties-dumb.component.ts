import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Alignment } from '../../../../core/models/alignment.model';
import { Attendance } from '../../../../core/models/attendance.model';
import { CorrespondenceCounter } from '../../../../core/models/correspondence-counter.model';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { PartiesColumnID } from '../../../../core/models/parties-column-id.model';
import { Party } from '../../../../core/models/party.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import { AttendanceReadoutPipe } from '../../../../core/pipes/attendance-readout.pipe';
import { DisbursementReadoutPipe } from '../../../../core/pipes/disbursement-readout.pipe';

@Component({
  selector: 'app-parties-dumb',
  templateUrl: './parties-dumb.component.html',
  styleUrls: ['./parties-dumb.component.scss'],
})
export class PartiesDumbComponent extends StackWidgetDumbComponentClass {
  @Input() parties!: Party[];
  @Input() attendances!: Attendance[];
  @Input() correspondenceCounters!: CorrespondenceCounter[];
  @Input() disbursements!: Disbursement[];

  @Output() newPartyClicked = new EventEmitter();
  @Output() editPartyClicked = new EventEmitter<TableCellEventPayload<Party>>();
  @Output() deletePartyClicked = new EventEmitter<Party>();
  @Output() correspondenceCounterChanged =
    new EventEmitter<CorrespondenceCounter>();

  tableConfig: TableConfig<Party> = {
    columns: [
      {
        id: PartiesColumnID.party,
        title: 'Name',
        valuePropertyPath: 'name',
      },
      {
        id: PartiesColumnID.attendances,
        title: 'Attendances',
        valueMethod: (party): string[] =>
          this.attendances
            .filter((attendance) => attendance.partyId === party.id)
            .map((attendance) =>
              new AttendanceReadoutPipe().transform(attendance),
            ),
      },
      {
        id: PartiesColumnID.correspondences,
        title: 'Calls',
        alignment: Alignment.centre,
        fixedWidth: '100px',
        valueMethod: (party): number =>
          this.correspondenceCounters.find(
            (correspondenceCounter) =>
              correspondenceCounter.partyId === party.id &&
              correspondenceCounter.feeEarnerId === this.activeFeeEarnerId(),
          )!.calls,
      },
      {
        id: PartiesColumnID.correspondences,
        title: 'Letters in',
        alignment: Alignment.centre,
        fixedWidth: '100px',
        valueMethod: (party): number =>
          this.correspondenceCounters.find(
            (correspondenceCounter) =>
              correspondenceCounter.partyId === party.id &&
              correspondenceCounter.feeEarnerId === this.activeFeeEarnerId(),
          )!.lettersIn,
      },
      {
        id: PartiesColumnID.correspondences,
        title: 'Letters out',
        alignment: Alignment.centre,
        fixedWidth: '100px',
        valueMethod: (party): number =>
          this.correspondenceCounters.find(
            (correspondenceCounter) =>
              correspondenceCounter.partyId === party.id &&
              correspondenceCounter.feeEarnerId === this.activeFeeEarnerId(),
          )!.lettersOut,
      },
      {
        id: PartiesColumnID.disbursements,
        title: 'Disbursements',
        valueMethod: (party): string[] =>
          this.disbursements
            .filter((disbursement) => disbursement.partyId === party.id)
            .map((disbursement) =>
              new DisbursementReadoutPipe().transform(disbursement),
            ),
      },
    ],
    deleteable: true,
  };

  onNewPartyClicked(): void {
    this.newPartyClicked.emit();
  }

  onRowKeyPressed(eventPayload: TableRowEventPayload<Party>): void {
    const keyboardEvent = eventPayload.event as KeyboardEvent;
    const key = keyboardEvent.key.toLowerCase();
    const increment = keyboardEvent.shiftKey ? -1 : 1;

    const correspondenceCounter = this.correspondenceCounters.find(
      (correspondenceCounter) =>
        correspondenceCounter.feeEarnerId == this.activeFeeEarnerId() &&
        correspondenceCounter.partyId === eventPayload.tableItem.id,
    )!;

    const incrementedCorrespondenceCounter: CorrespondenceCounter = {
      ...correspondenceCounter,
      calls:
        key === 'c'
          ? correspondenceCounter.calls + increment
          : correspondenceCounter.calls,
      lettersIn:
        key === 'i'
          ? correspondenceCounter.lettersIn + increment
          : correspondenceCounter.lettersIn,
      lettersOut:
        key === 'o'
          ? correspondenceCounter.lettersOut + increment
          : correspondenceCounter.lettersOut,
    };

    const validatedCorrespondenceCounter: CorrespondenceCounter = {
      ...incrementedCorrespondenceCounter,
      calls:
        incrementedCorrespondenceCounter.calls > 0
          ? incrementedCorrespondenceCounter.calls
          : 0,
      lettersIn:
        incrementedCorrespondenceCounter.lettersIn > 0
          ? incrementedCorrespondenceCounter.lettersIn
          : 0,
      lettersOut:
        incrementedCorrespondenceCounter.lettersOut > 0
          ? incrementedCorrespondenceCounter.lettersOut
          : 0,
    };

    this.correspondenceCounterChanged.emit(validatedCorrespondenceCounter);
  }

  onEditPartyClicked(eventPayload: TableCellEventPayload<Party>): void {
    this.editPartyClicked.emit(eventPayload);
  }

  onDeletePartyClicked(party: Party): void {
    this.deletePartyClicked.emit(party);
  }
}
