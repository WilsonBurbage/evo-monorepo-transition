import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { BillSetup } from '../../../../core/models/bill-setup.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { Part } from '../../../../core/models/part.model';
import { RateGroup } from '../../../../core/models/rate-group.model';
import { Rate } from '../../../../core/models/rate.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as billSetupSelectors from '../../../../core/state/bill-setup/bill-setup.selectors';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as partsSelectors from '../../../../core/state/parts/parts.selectors';
import * as rateGroupsActions from '../../../../core/state/rate-groups/rate-groups.actions';
import * as rateGroupsSelectors from '../../../../core/state/rate-groups/rate-groups.selectors';
import * as ratesSelectors from '../../../../core/state/rates/rates.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-rates-smart',
  templateUrl: './rates-smart.component.html',
  styleUrls: ['./rates-smart.component.scss'],
})
export class RatesSmartComponent extends StackWidgetSmartComponentClass {
  rateGroups$: Observable<RateGroup[] | undefined>;
  feeEarners$: Observable<FeeEarner[] | undefined>;
  parts$: Observable<Part[] | undefined>;
  rates$: Observable<Rate[] | undefined>;
  billSetup$: Observable<BillSetup | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.rateGroups$ = this.store$.select(
      rateGroupsSelectors.entitySelectors.selectAll,
    );

    this.feeEarners$ = this.store$.select(
      feeEarnersSelectors.entitySelectors.selectAll,
    );

    this.parts$ = this.store$.select(partsSelectors.entitySelectors.selectAll);
    this.rates$ = this.store$.select(ratesSelectors.entitySelectors.selectAll);
    this.billSetup$ = this.store$.select(billSetupSelectors.getBillSetup);
  }

  onNewRateGroupClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.rateGroup,
      }),
    );
  }

  onEditRateGroupClicked(eventPayload: TableRowEventPayload<RateGroup>): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.rateGroup,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteRateGroupClicked(rateGroup: RateGroup): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: rateGroup.id,
        entityChunkName: EntityChunkName.rateGroups,
      }),
    );
  }

  onGenerateFeeEarnersForEmptyRateGroupsClicked(): void {
    this.store$.dispatch(
      rateGroupsActions.generateFeeEarnersForEmptyRateGroups(),
    );
  }

  onNewFeeEarnerClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.feeEarner,
      }),
    );
  }

  onEditFeeEarnerClicked(eventPayload: TableRowEventPayload<FeeEarner>): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.feeEarner,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteFeeEarnerClicked(feeEarner: FeeEarner): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: feeEarner.id,
        entityChunkName: EntityChunkName.feeEarners,
      }),
    );
  }

  onEditRateClicked(eventPayload: TableRowEventPayload<Rate>): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.rate,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }
}
