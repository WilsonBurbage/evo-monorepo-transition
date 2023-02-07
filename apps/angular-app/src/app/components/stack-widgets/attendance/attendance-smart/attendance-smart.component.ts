import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { Enhancement } from '../../../../core/models/enhancement.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as attendancesActions from '../../../../core/state/attendances/attendances.actions';
import * as attendancesSelectors from '../../../../core/state/attendances/attendances.selectors';
import * as enhancementsSelectors from '../../../../core/state/enhancements/enhancements.selectors';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';

@Component({
  selector: 'app-attendance-smart',
  templateUrl: './attendance-smart.component.html',
  styleUrls: ['./attendance-smart.component.scss'],
})
export class AttendanceSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  attendance$!: Observable<Attendance | undefined>;
  feeEarners$!: Observable<FeeEarner[] | undefined>;
  enhancements$!: Observable<Enhancement[] | undefined>;

  ngOnInit(): void {
    this.attendance$ = this.config?.id
      ? this.store$.select(
          attendancesSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(
          DefaultsService.createDefaultAttendance({
            feeEarnerId: this.activeFeeEarnerId(),
            chronologyStepId: this.config.chronologyStepId,
            partyId: this.config.partyId,
            partId: this.activePartId(),
            partSpecificAttendanceType: this.config.partSpecificAttendanceType,
          }),
        );

    this.feeEarners$ = this.store$.select(
      feeEarnersSelectors.entitySelectors.selectAll,
    );

    this.enhancements$ = this.store$.select(
      enhancementsSelectors.entitySelectors.selectAll,
    );
  }

  onSaveClicked(amendedAttendance: Attendance): void {
    this.store$.dispatch(
      attendancesActions.upsertAttendance({ attendance: amendedAttendance }),
    );
    this.pop();
  }
}
