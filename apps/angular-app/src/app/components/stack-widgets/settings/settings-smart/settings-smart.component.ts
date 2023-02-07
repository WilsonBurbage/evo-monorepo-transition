import { Component, Injector, OnInit } from '@angular/core';
import { Account, Organisation } from '@evo-monorepo/shared';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import * as accountActions from '../../../../core/state/account/account.actions';
import * as accountSelectors from '../../../../core/state/account/account.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-settings-smart',
  templateUrl: './settings-smart.component.html',
  styleUrls: ['./settings-smart.component.scss'],
})
export class SettingsSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  accountDetailsWaitingForResponse$!: Observable<boolean>;
  accountDetailsError$!: Observable<boolean>;
  account$!: Observable<Account | undefined>;
  organisation$!: Observable<Organisation | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.store$.dispatch(accountActions.getAccountDetails());
  }

  ngOnInit(): void {
    this.accountDetailsWaitingForResponse$ = this.store$.select(
      accountSelectors.getAccountDetailsStatuses.waitingForResponseSelector
    );

    this.accountDetailsError$ = this.store$.select(
      accountSelectors.getAccountDetailsStatuses.errorSelector
    );

    this.account$ = this.store$.select(accountSelectors.getAccount);

    this.organisation$ = this.store$.select(accountSelectors.getOrganisation);
  }

  onTextReplacementsClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.textReplacements,
      })
    );
  }
}
