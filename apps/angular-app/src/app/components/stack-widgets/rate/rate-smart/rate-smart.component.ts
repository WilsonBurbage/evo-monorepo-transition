import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Rate } from '../../../../core/models/rate.model';
import * as ratesActions from '../../../../core/state/rates/rates.actions';
import * as ratesSelectors from '../../../../core/state/rates/rates.selectors';

@Component({
  selector: 'app-rate-smart',
  templateUrl: './rate-smart.component.html',
  styleUrls: ['./rate-smart.component.scss'],
})
export class RateSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  rate$!: Observable<Rate | undefined>;

  ngOnInit(): void {
    this.rate$ = this.store$.select(
      ratesSelectors.entitySelectors.selectEntity({
        id: String(this.config.id),
      }),
    );
  }

  onSaveClicked(amendedRate: Rate): void {
    this.store$.dispatch(ratesActions.upsertRate({ rate: amendedRate }));
    this.pop();
  }
}
