import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, withLatestFrom } from 'rxjs';
import { Solicitor } from '../../models/solicitor.model';
import { DefaultsService } from '../../services/defaults.service';
import { GlobalState } from '../reducers';
import * as evoFileActions from './../evo-file/evo-file.actions';
import * as partsActions from './../parts/parts.actions';
import * as partsSelectors from './../parts/parts.selectors';
import * as solicitorsActions from './../solicitors/solicitors.actions';
import * as solicitorsSelectors from './../solicitors/solicitors.selectors';
import * as uiSelectors from './../ui/ui.selectors';

@Injectable()
export class SolicitorsEffects {
  generateSolicitorsForAllParts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        evoFileActions.upgradeEvoFile,
        partsActions.setParts,
        partsActions.upsertPart,
      ),
      withLatestFrom(
        this.store$.select(uiSelectors.getBillIsFullyLoaded),
        this.store$.select(partsSelectors.entitySelectors.selectAll),
        this.store$.select(solicitorsSelectors.entitySelectors.selectAll),
      ),
      mergeMap(([, billIsFullyLoaded, parts, solicitors]) => {
        if (!billIsFullyLoaded) {
          return [];
        }

        const newSolicitors: Solicitor[] = [];

        parts.forEach((part) => {
          const solicitor = solicitors.find(
            (solicitor) => solicitor.partId === part.id,
          );

          if (!solicitor) {
            newSolicitors.push(
              DefaultsService.createDefaultSolicitor({ partId: part.id }),
            );
          }
        });

        return newSolicitors.length
          ? [solicitorsActions.upsertSolicitors({ solicitors: newSolicitors })]
          : [];
      }),
    ),
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
