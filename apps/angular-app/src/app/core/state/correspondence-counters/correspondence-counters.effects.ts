import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, withLatestFrom } from 'rxjs';
import { CorrespondenceCounter } from '../../models/correspondence-counter.model';
import { DefaultsService } from '../../services/defaults.service';
import { GlobalState } from '../reducers';
import * as correspondenceCountersActions from './../correspondence-counters/correspondence-counters.actions';
import * as correspondenceCountersSelectors from './../correspondence-counters/correspondence-counters.selectors';
import * as evoFileActions from './../evo-file/evo-file.actions';
import * as feeEarnersActions from './../fee-earners/fee-earners.actions';
import * as feeEarnersSelectors from './../fee-earners/fee-earners.selectors';
import * as partiesActions from './../parties/parties.actions';
import * as partiesSelectors from './../parties/parties.selectors';
import * as uiSelectors from './../ui/ui.selectors';

@Injectable()
export class CorrespondenceCountersEffects {
  generateCorrespondenceCountersForAllPartiesAndFeeEarners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        evoFileActions.upgradeEvoFile,
        partiesActions.setParties,
        partiesActions.upsertParty,
        feeEarnersActions.setFeeEarners,
        feeEarnersActions.upsertFeeEarner,
        feeEarnersActions.upsertFeeEarners,
      ),
      withLatestFrom(
        this.store$.select(uiSelectors.getBillIsFullyLoaded),
        this.store$.select(feeEarnersSelectors.entitySelectors.selectAll),
        this.store$.select(partiesSelectors.entitySelectors.selectAll),
        this.store$.select(
          correspondenceCountersSelectors.entitySelectors.selectAll,
        ),
      ),
      mergeMap(
        ([
          ,
          billIsFullyLoaded,
          feeEarners,
          parties,
          correspondenceCounters,
        ]) => {
          if (!billIsFullyLoaded) {
            return [];
          }

          const newCorrespondenceCounters: CorrespondenceCounter[] = [];

          feeEarners.forEach((feeEarner) => {
            parties.forEach((party) => {
              const correspondenceCounter = correspondenceCounters.find(
                (correspondenceCounter) =>
                  correspondenceCounter.feeEarnerId === feeEarner.id &&
                  correspondenceCounter.partyId === party.id,
              );

              if (!correspondenceCounter) {
                newCorrespondenceCounters.push(
                  DefaultsService.createDefaultCorrespondenceCounter({
                    feeEarnerId: feeEarner.id,
                    partyId: party.id,
                  }),
                );
              }
            });
          });

          return newCorrespondenceCounters.length
            ? [
                correspondenceCountersActions.upsertCorrespondenceCounters({
                  correspondenceCounters: newCorrespondenceCounters,
                }),
              ]
            : [];
        },
      ),
    ),
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
