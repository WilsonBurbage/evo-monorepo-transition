import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { CorrespondenceCounter } from '../../../../core/models/correspondence-counter.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as correspondenceCountersActions from '../../../../core/state/correspondence-counters/correspondence-counters.actions';
import * as correspondenceCountersSelectors from '../../../../core/state/correspondence-counters/correspondence-counters.selectors';

@Component({
  selector: 'app-correspondence-counter-smart',
  templateUrl: './correspondence-counter-smart.component.html',
  styleUrls: ['./correspondence-counter-smart.component.scss'],
})
export class CorrespondenceCounterSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  correspondenceCounter$!: Observable<CorrespondenceCounter | undefined>;

  ngOnInit(): void {
    this.correspondenceCounter$ =
      this.config?.partyId && this.config.feeEarnerId
        ? this.store$.select(
            correspondenceCountersSelectors.entitySelectors.selectEntityForPropertyMatch(
              [
                {
                  propertyName: 'partyId',
                  propertyValue: this.config.partyId,
                },
                {
                  propertyName: 'feeEarnerId',
                  propertyValue: this.config.feeEarnerId,
                },
              ],
              true,
            ),
          )
        : of(DefaultsService.createDefaultCorrespondenceCounter());
  }

  onSaveClicked(amendedCorrespondenceCounter: CorrespondenceCounter): void {
    this.store$.dispatch(
      correspondenceCountersActions.upsertCorrespondenceCounter({
        correspondenceCounter: amendedCorrespondenceCounter,
      }),
    );
    this.pop();
  }
}
