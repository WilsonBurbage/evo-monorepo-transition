import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { BillSetup } from '../../../../core/models/bill-setup.model';
import * as billSetupActions from '../../../../core/state/bill-setup/bill-setup.actions';
import * as billSetupSelectors from '../../../../core/state/bill-setup/bill-setup.selectors';

@Component({
  selector: 'app-bill-setup-smart',
  templateUrl: './bill-setup-smart.component.html',
  styleUrls: ['./bill-setup-smart.component.scss'],
})
export class BillSetupSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  billSetup$!: Observable<BillSetup | undefined>;

  ngOnInit(): void {
    this.billSetup$ = this.store$.select(billSetupSelectors.getBillSetup);
  }

  onSaveClicked(amendedBillSetup: BillSetup): void {
    this.store$.dispatch(
      billSetupActions.setBillSetup({ billSetup: amendedBillSetup }),
    );
    this.pop();
  }
}
