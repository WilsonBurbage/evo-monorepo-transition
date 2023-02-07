import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, delay, map, of, switchMap } from 'rxjs';
import * as authenticationActions from './../authentication/authentication.actions';
import * as uiActions from './ui.actions';
import { ACTIONS_THAT_REQUIRE_TEMPORARY_SELECTOR_DISABLING } from './ui.constants';

@Injectable()
export class UiEffects {
  enableBillSelectors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...ACTIONS_THAT_REQUIRE_TEMPORARY_SELECTOR_DISABLING),
      switchMap(() =>
        of(
          uiActions.setBillSelectorsEnabled({ billSelectorsEnabled: true }),
        ).pipe(debounceTime(10), delay(0)),
      ),
    ),
  );

  deauthenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.deauthenticate),
      map(uiActions.clearStackWidgets),
    ),
  );

  constructor(private actions$: Actions) {}
}
