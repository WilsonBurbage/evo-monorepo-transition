import { Component, Injector } from '@angular/core';
import { AuthenticationCredentials } from '@evo-monorepo/shared';
import { Observable } from 'rxjs';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';
import * as authenticationActions from './../../../../core/state/authentication/authentication.actions';
import * as authenticationSelectors from './../../../../core/state/authentication/authentication.selectors';

@Component({
  selector: 'app-login-smart',
  templateUrl: './login-smart.component.html',
  styleUrls: ['./login-smart.component.scss'],
})
export class LoginSmartComponent extends BaseComponentClass {
  isAuthenticating$: Observable<boolean>;
  hasAuthenticatingError$: Observable<boolean>;
  errorCode$: Observable<number | undefined>;
  checkingAuthenticationKey$: Observable<boolean>;

  constructor(injector: Injector) {
    super(injector);

    this.isAuthenticating$ = this.store$.select(
      authenticationSelectors.getAuthenticationStatuses.inProgressSelector
    );

    this.hasAuthenticatingError$ = this.store$.select(
      authenticationSelectors.getAuthenticationStatuses.errorSelector
    );

    this.errorCode$ = this.store$.select(
      authenticationSelectors.getAuthenticationStatuses.errorCodeSelector
    );

    this.checkingAuthenticationKey$ = this.store$.select(
      authenticationSelectors.getAuthenticationKeyCheckStatuses
        .inProgressSelector
    );
  }

  onLoginClicked(authenticationCredentials: AuthenticationCredentials): void {
    this.store$.dispatch(
      authenticationActions.authenticate({
        authenticationCredentials,
      })
    );
  }
}
