import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { RateGroup } from '../../../../core/models/rate-group.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as feeEarnersActions from '../../../../core/state/fee-earners/fee-earners.actions';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';
import * as rateGroupsSelectors from '../../../../core/state/rate-groups/rate-groups.selectors';

@Component({
  selector: 'app-fee-earner-smart',
  templateUrl: './fee-earner-smart.component.html',
  styleUrls: ['./fee-earner-smart.component.scss'],
})
export class FeeEarnerSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  feeEarner$!: Observable<FeeEarner | undefined>;
  rateGroups$!: Observable<RateGroup[] | undefined>;

  ngOnInit(): void {
    this.feeEarner$ = this.config?.id
      ? this.store$.select(
          feeEarnersSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(DefaultsService.createDefaultFeeEarner());

    this.rateGroups$ = this.store$.select(
      rateGroupsSelectors.entitySelectors.selectAll,
    );
  }

  onSaveClicked(amendedFeeEarner: FeeEarner): void {
    this.store$.dispatch(
      feeEarnersActions.upsertFeeEarner({ feeEarner: amendedFeeEarner }),
    );
    this.pop();
  }
}
