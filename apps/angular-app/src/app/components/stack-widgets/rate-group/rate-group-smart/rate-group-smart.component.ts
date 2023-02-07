import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { RateGroup } from '../../../../core/models/rate-group.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as rateGroupsActions from '../../../../core/state/rate-groups/rate-groups.actions';
import * as rateGroupsSelectors from '../../../../core/state/rate-groups/rate-groups.selectors';

@Component({
  selector: 'app-rate-group-smart',
  templateUrl: './rate-group-smart.component.html',
  styleUrls: ['./rate-group-smart.component.scss'],
})
export class RateGroupSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  rateGroup$!: Observable<RateGroup | undefined>;

  ngOnInit(): void {
    this.rateGroup$ = this.config?.id
      ? this.store$.select(
          rateGroupsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(DefaultsService.createDefaultRateGroup());
  }

  onSaveClicked(amendedRateGroup: RateGroup): void {
    this.store$.dispatch(
      rateGroupsActions.upsertRateGroup({ rateGroup: amendedRateGroup }),
    );
    this.pop();
  }
}
