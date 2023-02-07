import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';
import * as authenticationSelectors from './../../../../core/state/authentication/authentication.selectors';

@Component({
  selector: 'app-main-frame-smart',
  templateUrl: './main-frame-smart.component.html',
  styleUrls: ['./main-frame-smart.component.scss'],
})
export class MainFrameSmartComponent extends BaseComponentClass {
  authenticated$: Observable<boolean>;
  checkingAuthenticationKey$: Observable<boolean>;

  constructor(injector: Injector) {
    super(injector);

    this.authenticated$ = this.store$.select(
      authenticationSelectors.getAuthenticated,
    );

    this.checkingAuthenticationKey$ = this.store$.select(
      authenticationSelectors.getAuthenticationKeyCheckStatuses
        .inProgressSelector,
    );
  }
}
