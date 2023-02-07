import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { SuccessFee } from '../../../../core/models/success-fee.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as successFeesActions from '../../../../core/state/success-fees/success-fees.actions';
import * as successFeesSelectors from '../../../../core/state/success-fees/success-fees.selectors';

@Component({
  selector: 'app-success-fee-smart',
  templateUrl: './success-fee-smart.component.html',
  styleUrls: ['./success-fee-smart.component.scss'],
})
export class SuccessFeeSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  successFee$!: Observable<SuccessFee | undefined>;

  ngOnInit(): void {
    this.successFee$ = this.config?.id
      ? this.store$.select(
          successFeesSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(
          DefaultsService.createDefaultSuccessFee({
            chronologyStepId: this.config.chronologyStepId,
          }),
        );
  }

  onSaveClicked(amendedSuccessFee: SuccessFee): void {
    this.store$.dispatch(
      successFeesActions.upsertSuccessFee({ successFee: amendedSuccessFee }),
    );
    this.pop();
  }
}
