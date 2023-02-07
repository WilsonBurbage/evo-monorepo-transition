import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { GlobalState } from '../reducers';
import * as appActions from './app.actions';

@Injectable()
export class AppEffects {
  init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => {
          window.electronQuitAppAttempted = (): void => {
            this.store$.dispatch(appActions.quitAppAttempted());
          };
        }),
      ),
    { dispatch: false },
  );

  quitAppAttempted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.quitAppAttempted),
      map(() => appActions.quitAppAuthorised()),
    ),
  );

  quitAppAuthorised$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(appActions.quitAppAuthorised),
        tap(async () => await window.bridge.commands.quitApp()),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
