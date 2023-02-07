import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { DefaultsService } from '../../services/defaults.service';
import { EvoSettingsService } from '../../services/evo-settings.service';
import { GlobalState } from '../reducers';
import * as evoSettingsActions from './../evo-settings/evo-settings.actions';
import * as evoSettingsSelectors from './../evo-settings/evo-settings.selectors';
import * as textReplacementsActions from './../text-replacements/text-replacements.actions';
import { ACTIONS_THAT_REQUIRE_EVO_SETTINGS_SAVE } from './evo-settings.constants';

@Injectable()
export class EvoSettingsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(async () => {
        const fileData = await EvoSettingsService.openEvoSettings();

        if (fileData) {
          return evoSettingsActions.openEvoSettingsSuccess({ fileData });
        } else {
          return evoSettingsActions.openEvoSettingsFailure();
        }
      }),
    ),
  );

  openEvoSettingsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(evoSettingsActions.openEvoSettingsSuccess),
      mergeMap(({ fileData }) => [
        textReplacementsActions.setTextReplacements({
          textReplacements: fileData.data.textReplacements,
        }),

        evoSettingsActions.upgradeEvoSettings(),
      ]),
    ),
  );

  openEvoSettingsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(evoSettingsActions.openEvoSettingsFailure),
      map(() =>
        evoSettingsActions.openEvoSettingsSuccess({
          fileData: {
            filePath: '',
            data: DefaultsService.createDefaultEvoSettings(),
          },
        }),
      ),
    ),
  );

  saveEvoSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...ACTIONS_THAT_REQUIRE_EVO_SETTINGS_SAVE),
      withLatestFrom(
        this.store$.select(evoSettingsSelectors.getCompiledEvoSettings),
      ),
      switchMap(async ([, compiledEvoSettings]) => {
        const result = await EvoSettingsService.saveEvoSettings(
          compiledEvoSettings,
        );

        if (result) {
          return evoSettingsActions.saveEvoSettingsSuccess();
        } else {
          return evoSettingsActions.saveEvoSettingsFailure();
        }
      }),
    ),
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
