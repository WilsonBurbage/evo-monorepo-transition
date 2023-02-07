import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, withLatestFrom } from 'rxjs';
import { Rate } from '../../models/rate.model';
import { DefaultsService } from '../../services/defaults.service';
import { GlobalState } from '../reducers';
import * as evoFileActions from './../evo-file/evo-file.actions';
import * as partsActions from './../parts/parts.actions';
import * as partsSelectors from './../parts/parts.selectors';
import * as rateGroupsActions from './../rate-groups/rate-groups.actions';
import * as rateGroupsSelectors from './../rate-groups/rate-groups.selectors';
import * as ratesActions from './../rates/rates.actions';
import * as ratesSelectors from './../rates/rates.selectors';
import * as uiSelectors from './../ui/ui.selectors';

@Injectable()
export class RatesEffects {
  generateRatesForAllRateGroupsAndParts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        evoFileActions.upgradeEvoFile,
        partsActions.setParts,
        partsActions.upsertPart,
        rateGroupsActions.setRateGroups,
        rateGroupsActions.upsertRateGroup,
      ),
      withLatestFrom(
        this.store$.select(uiSelectors.getBillIsFullyLoaded),
        this.store$.select(rateGroupsSelectors.entitySelectors.selectAll),
        this.store$.select(partsSelectors.entitySelectors.selectAll),
        this.store$.select(ratesSelectors.entitySelectors.selectAll),
      ),
      mergeMap(([, billIsFullyLoaded, rateGroups, parts, rates]) => {
        if (!billIsFullyLoaded) {
          return [];
        }

        const newRates: Rate[] = [];

        rateGroups.forEach((rateGroup) => {
          parts.forEach((part) => {
            const rate = rates.find(
              (rate) =>
                rate.rateGroupId === rateGroup.id && rate.partId === part.id,
            );

            if (!rate) {
              const previousPart = parts[parts.indexOf(part) - 1];

              const previousRate = rates.find(
                (rate) =>
                  rate.rateGroupId === rateGroup.id &&
                  rate.partId === previousPart.id,
              );

              newRates.push(
                DefaultsService.createDefaultRate({
                  rateGroupId: rateGroup.id,
                  partId: part.id,

                  hourly: previousRate?.hourly || 0,
                  calls: previousRate?.calls || 0,
                  lettersIn: previousRate?.lettersIn || 0,
                  lettersOut: previousRate?.lettersOut || 0,
                  advocacy: previousRate?.advocacy || 0,
                  counsel: previousRate?.counsel || 0,
                  travelAndWaiting: previousRate?.travelAndWaiting || 0,
                }),
              );
            }
          });
        });

        return newRates.length
          ? [ratesActions.upsertRates({ rates: newRates })]
          : [];
      }),
    ),
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
