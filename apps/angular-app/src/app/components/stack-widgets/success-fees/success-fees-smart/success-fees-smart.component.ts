import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { SuccessFee } from '../../../../core/models/success-fee.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as successFeesSelectors from '../../../../core/state/success-fees/success-fees.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-success-fees-smart',
  templateUrl: './success-fees-smart.component.html',
  styleUrls: ['./success-fees-smart.component.scss'],
})
export class SuccessFeesSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  successFees$!: Observable<SuccessFee[] | undefined>;
  feeEarners$!: Observable<FeeEarner[] | undefined>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.successFees$ = this.store$.select(
      successFeesSelectors.entitySelectors.selectEntitiesForPropertyMatch([
        {
          propertyName: 'chronologyStepId',
          propertyValue: this.config.chronologyStepId,
        },
      ]),
    );

    this.feeEarners$ = this.store$.select(
      feeEarnersSelectors.entitySelectors.selectAll,
    );
  }

  onNewSuccessFeeClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.successFee,
        config: this.config,
      }),
    );
  }

  onEditSuccessFeeClicked(
    eventPayload: TableRowEventPayload<SuccessFee>,
  ): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.successFee,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteSuccessFeeClicked(successFee: SuccessFee): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: successFee.id,
        entityChunkName: EntityChunkName.successFees,
      }),
    );
  }
}
