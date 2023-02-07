import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, mergeMap, switchMap, take, withLatestFrom } from 'rxjs';
import { LOCAL_STORAGE_KEY_CURRENT_STATE } from '../../constants/local-storage.constants';
import { Attitude } from '../../models/attitude.model';
import { Diagnostics } from '../../models/diagnostics.model';
import { MenuItemId } from '../../models/menu-item-id.model';
import { DatesService } from '../../services/dates.service';
import { DiagnosticsService } from '../../services/diagnostics.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalState } from '../reducers';
import * as menuActions from './../menu/menu.actions';
import * as toastMessagesActions from './../toast-messages/toast-messages.actions';
import * as developerActions from './developer.actions';
import { DIAGNOSTICS_JSON } from './developer.constants';

@Injectable()
export class DeveloperEffects {
  menuItemClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(menuActions.menuItemClicked),
      withLatestFrom(this.store$),
      mergeMap(([{ menuItemId }, state]) => {
        switch (menuItemId) {
          case MenuItemId.saveDiagnostics:
            return [developerActions.saveDiagnostics()];

          case MenuItemId.saveStateAndReload: {
            const diagnostics: Diagnostics = {
              timestamp: DatesService.createDateStringFromDate(new Date()),
              state,
            };

            LocalStorageService.setLocalStorage(
              LOCAL_STORAGE_KEY_CURRENT_STATE,
              JSON.stringify(diagnostics),
            );

            window.bridge.commands.reload();

            return [];
          }

          default:
            return [];
        }
      }),
    ),
  );

  initLoadDiagnosticsFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      delay(500),
      mergeMap(() => {
        const diagnosticsJson = LocalStorageService.getLocalStorage(
          LOCAL_STORAGE_KEY_CURRENT_STATE,
        );

        LocalStorageService.removeLocalStorage(LOCAL_STORAGE_KEY_CURRENT_STATE);

        if (diagnosticsJson) {
          const diagnostics: Diagnostics = JSON.parse(diagnosticsJson);

          return [
            developerActions.setEntireState({ entireState: diagnostics.state }),
          ];
        }

        return [];
      }),
    ),
  );

  initLoadDiagnosticsFromDiagnosticsConstant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      delay(500),
      mergeMap(() => {
        if (DIAGNOSTICS_JSON) {
          const diagnostics = JSON.parse(DIAGNOSTICS_JSON);

          return [
            developerActions.setEntireState({ entireState: diagnostics.state }),
            toastMessagesActions.showToastMessage({
              text: 'State loaded from DIAGNOSTICS_JSON',
              attitude: Attitude.positive,
            }),
          ];
        }

        return [];
      }),
    ),
  );

  saveDiagnostics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(developerActions.saveDiagnostics),
      switchMap(async () => {
        let currentState = {} as GlobalState;

        this.store$.pipe(take(1)).subscribe((state) => {
          currentState = state;
        });

        const diagnostics: Diagnostics = {
          timestamp: DatesService.createDateStringFromDate(new Date()),
          state: currentState,
        };

        const result = await DiagnosticsService.saveDiagnostics(diagnostics);

        if (result) {
          return developerActions.saveDiagnosticsSuccess();
        } else {
          return developerActions.saveDiagnosticsFailure();
        }
      }),
    ),
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
