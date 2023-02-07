import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as disbursementsSelectors from '../../../../core/state/disbursements/disbursements.selectors';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-disbursements-smart',
  templateUrl: './disbursements-smart.component.html',
  styleUrls: ['./disbursements-smart.component.scss'],
})
export class DisbursementsSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  disbursements$!: Observable<Disbursement[] | undefined>;
  feeEarners$!: Observable<FeeEarner[] | undefined>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.disbursements$ = this.store$.select(
      disbursementsSelectors.entitySelectors.selectEntitiesForPropertyMatch([
        {
          propertyName: 'chronologyStepId',
          propertyValue: this.config.chronologyStepId,
        },

        { propertyName: 'partyId', propertyValue: this.config.partyId },

        {
          propertyName: 'partSpecificDisbursementType',
          propertyValue: this.config.partSpecificDisbursementType,
          filterByActivePart: true,
        },
      ]),
    );

    this.feeEarners$ = this.store$.select(
      feeEarnersSelectors.entitySelectors.selectAll,
    );
  }

  onNewDisbursementClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.disbursement,
        config: this.config,
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
