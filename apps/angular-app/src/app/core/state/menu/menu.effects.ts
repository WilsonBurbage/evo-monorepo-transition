import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { MenuItemId } from '../../models/menu-item-id.model';
import { MenuService } from '../../services/menu.service';
import { GlobalState } from '../reducers';
import * as authenticationActions from './../authentication/authentication.actions';
import * as menuActions from './menu.actions';

@Injectable()
export class MenuEffects {
  init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => {
          window.menuItemClicked = (menuItemId: MenuItemId): void => {
            this.store$.dispatch(menuActions.menuItemClicked({ menuItemId }));
          };
        }),
      ),
    { dispatch: false },
  );

  authenticateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          authenticationActions.authenticateSuccess,
          authenticationActions.checkAuthenticationKeySuccess,
        ),
        map(() => MenuService.setAuthenticatedMenu()),
      ),
    { dispatch: false },
  );

  deauthenticate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.deauthenticate),
        map(() => MenuService.setDeauthenticatedMenu()),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
