import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap, timer } from 'rxjs';
import { AUTHENTICATION_KEY_CHECK_INTERVAL } from '../../constants/authentication.constants';
import { MenuItemId } from '../../models/menu-item-id.model';
import {
  LOCAL_STORAGE_KEY_AUTHENTICATION_KEY,
  LOCAL_STORAGE_KEY_USERNAME,
} from './../../constants/local-storage.constants';
import { AuthenticationService } from './../../services/authentication.service';
import { LocalStorageService } from './../../services/local-storage.service';
import * as menuActions from './../menu/menu.actions';
import * as authenticationActions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  menuItemClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(menuActions.menuItemClicked),
      mergeMap(({ menuItemId }) => {
        switch (menuItemId) {
          case MenuItemId.logOut:
            return [authenticationActions.deauthenticate()];

          default:
            return [];
        }
      }),
    ),
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() =>
        LocalStorageService.getLocalStorage(
          LOCAL_STORAGE_KEY_AUTHENTICATION_KEY,
        )
          ? [authenticationActions.checkAuthenticationKey()]
          : [],
      ),
    ),
  );

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.authenticate),
      switchMap(({ authenticationCredentials: { username, password } }) =>
        this.authenticationService
          .authenticate(
            username,
            password,
            window.bridge.constants.machineDetails.machineId,
            window.bridge.constants.machineDetails.machineUsername,
          )
          .pipe(
            map(({ authenticationKey }) => {
              LocalStorageService.setLocalStorage(
                LOCAL_STORAGE_KEY_USERNAME,
                username,
              );
              LocalStorageService.setLocalStorage(
                LOCAL_STORAGE_KEY_AUTHENTICATION_KEY,
                authenticationKey,
              );
              return authenticationActions.authenticateSuccess();
            }),
            catchError((error: HttpErrorResponse) =>
              of(
                authenticationActions.authenticateFailure({
                  errorCode: error.status,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  authenticateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.authenticateSuccess),
      map(() => authenticationActions.checkAuthenticationKey()),
    ),
  );

  checkAuthenticationKey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.checkAuthenticationKey),
      switchMap(() => {
        return this.authenticationService.checkAuthenticationKey().pipe(
          map(() => authenticationActions.checkAuthenticationKeySuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              authenticationActions.checkAuthenticationKeyFailure({
                errorCode: error.status,
              }),
            ),
          ),
        );
      }),
    ),
  );

  checkAuthenticationKeySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.checkAuthenticationKeySuccess),
      switchMap(() =>
        timer(AUTHENTICATION_KEY_CHECK_INTERVAL).pipe(
          mergeMap(() =>
            LocalStorageService.getLocalStorage(
              LOCAL_STORAGE_KEY_AUTHENTICATION_KEY,
            )
              ? [authenticationActions.checkAuthenticationKey()]
              : [],
          ),
        ),
      ),
    ),
  );

  checkAuthenticationKeyFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.checkAuthenticationKeyFailure),
      map(() => authenticationActions.deauthenticate()),
    ),
  );

  deauthenticate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.deauthenticate),
        tap(() => {
          LocalStorageService.removeLocalStorage(
            LOCAL_STORAGE_KEY_AUTHENTICATION_KEY,
          );
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
  ) {}
}
