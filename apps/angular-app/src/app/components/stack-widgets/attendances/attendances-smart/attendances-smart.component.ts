import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as attendancesSelectors from '../../../../core/state/attendances/attendances.selectors';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-attendances-smart',
  templateUrl: './attendances-smart.component.html',
  styleUrls: ['./attendances-smart.component.scss'],
})
export class AttendancesSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  attendances$!: Observable<Attendance[] | undefined>;
  feeEarners$!: Observable<FeeEarner[] | undefined>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.attendances$ = this.store$.select(
      attendancesSelectors.entitySelectors.selectEntitiesForPropertyMatch([
        {
          propertyName: 'chronologyStepId',
          propertyValue: this.config.chronologyStepId,
        },

        {
          propertyName: 'partyId',
          propertyValue: this.config.partyId,
        },

        {
          propertyName: 'partSpecificAttendanceType',
          propertyValue: this.config.partSpecificAttendanceType,
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
        config: this.config,
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
}
