import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { PartSpecificAttendanceType } from '../../../../core/models/part-specific-attendance-type.model';
import { PartSpecificDisbursementType } from '../../../../core/models/part-specific-disbursement-type.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as attendancesSelectors from '../../../../core/state/attendances/attendances.selectors';
import * as disbursementsSelectors from '../../../../core/state/disbursements/disbursements.selectors';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-other-work-smart',
  templateUrl: './other-work-smart.component.html',
  styleUrls: ['./other-work-smart.component.scss'],
})
export class OtherWorkSmartComponent extends StackWidgetSmartComponentClass {
  attendances$!: Observable<Attendance[] | undefined>;
  disbursements$!: Observable<Disbursement[] | undefined>;
  feeEarners$!: Observable<FeeEarner[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.attendances$ = this.store$.select(
      attendancesSelectors.entitySelectors.selectEntitiesForPropertyMatch([
        {
          propertyName: 'partSpecificAttendanceType',
          propertyValue: PartSpecificAttendanceType.otherWork,
          filterByActivePart: true,
        },
      ]),
    );

    this.disbursements$ = this.store$.select(
      disbursementsSelectors.entitySelectors.selectEntitiesForPropertyMatch([
        {
          propertyName: 'partSpecificDisbursementType',
          propertyValue: PartSpecificAttendanceType.otherWork,
          filterByActivePart: true,
        },
      ]),
    );

    this.feeEarners$ = this.store$.select(
      feeEarnersSelectors.entitySelectors.selectAll,
    );
  }

  onNewAttendanceClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.attendance,
        config: {
          partId: this.activePartId(),
          partSpecificAttendanceType: PartSpecificAttendanceType.otherWork,
        },
      }),
    );
  }

  onEditAttendanceClicked(
    eventPayload: TableRowEventPayload<Attendance>,
  ): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.attendance,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteAttendanceClicked(attendance: Attendance): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: attendance.id,
        entityChunkName: EntityChunkName.attendances,
      }),
    );
  }

  onNewDisbursementClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.disbursement,
        config: {
          partId: this.activePartId(),
          partSpecificDisbursementType: PartSpecificDisbursementType.otherWork,
        },
      }),
    );
  }

  onEditDisbursementClicked(
    eventPayload: TableRowEventPayload<Disbursement>,
  ): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.disbursement,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteDisbursementClicked(disbursement: Disbursement): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: disbursement.id,
        entityChunkName: EntityChunkName.disbursements,
      }),
    );
  }
}
