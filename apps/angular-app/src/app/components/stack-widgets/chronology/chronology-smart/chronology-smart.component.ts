import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { ChronologyColumnID } from '../../../../core/models/chronology-column-id.model';
import { ChronologyStep } from '../../../../core/models/chronology-step.model';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { SuccessFee } from '../../../../core/models/success-fee.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import * as attendancesSelectors from '../../../../core/state/attendances/attendances.selectors';
import * as chronologyStepsSelectors from '../../../../core/state/chronology-steps/chronology-steps.selectors';
import * as disbursementsSelectors from '../../../../core/state/disbursements/disbursements.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as successFeesSelectors from '../../../../core/state/success-fees/success-fees.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-chronology-smart',
  templateUrl: './chronology-smart.component.html',
  styleUrls: ['./chronology-smart.component.scss'],
})
export class ChronologySmartComponent extends StackWidgetSmartComponentClass {
  chronologySteps$: Observable<ChronologyStep[] | undefined>;
  attendances$: Observable<Attendance[] | undefined>;
  disbursements$: Observable<Disbursement[] | undefined>;
  successFees$: Observable<SuccessFee[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.chronologySteps$ = this.store$.select(
      chronologyStepsSelectors.getChronologyStepsForActivePart,
    );

    this.attendances$ = this.store$.select(
      attendancesSelectors.entitySelectors.selectAll,
    );

    this.disbursements$ = this.store$.select(
      disbursementsSelectors.entitySelectors.selectAll,
    );

    this.successFees$ = this.store$.select(
      successFeesSelectors.entitySelectors.selectAll,
    );
  }

  onNewChronologyStepClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.chronologyStep,
      }),
    );
  }

  onEditChronologyStepClicked(
    eventPayload: TableCellEventPayload<ChronologyStep>,
  ): void {
    switch (eventPayload.column.id) {
      case ChronologyColumnID.chronologyStep:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.chronologyStep,
            config: { id: eventPayload.tableItem.id },
          }),
        );
        break;

      case ChronologyColumnID.attendances:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.attendances,
            config: {
              chronologyStepId: eventPayload.tableItem.id,
            },
          }),
        );
        break;

      case ChronologyColumnID.disbursements:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.disbursements,
            config: {
              chronologyStepId: eventPayload.tableItem.id,
            },
          }),
        );
        break;

      case ChronologyColumnID.successFees:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.successFees,
            config: {
              chronologyStepId: eventPayload.tableItem.id,
            },
          }),
        );
        break;

      default:
        break;
    }
  }

  onDeleteChronologyStepClicked(chronologyStep: ChronologyStep): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: chronologyStep.id,
        entityChunkName: EntityChunkName.chronologySteps,
      }),
    );
  }
}
