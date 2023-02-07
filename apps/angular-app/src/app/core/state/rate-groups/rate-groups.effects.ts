import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, withLatestFrom } from 'rxjs';
import { FeeEarner } from '../../models/fee-earner.model';
import { DefaultsService } from '../../services/defaults.service';
import { GlobalState } from '../reducers';
import * as feeEarnersActions from './../fee-earners/fee-earners.actions';
import * as feeEarnersSelectors from './../fee-earners/fee-earners.selectors';
import * as rateGroupsActions from './../rate-groups/rate-groups.actions';
import * as rateGroupsSelectors from './../rate-groups/rate-groups.selectors';
import * as uiSelectors from './../ui/ui.selectors';

@Injectable()
export class RateGroupsEffects {
  generateFeeEarnersForEmptyRateGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rateGroupsActions.generateFeeEarnersForEmptyRateGroups),
      withLatestFrom(
        this.store$.select(uiSelectors.getBillIsFullyLoaded),
        this.store$.select(rateGroupsSelectors.entitySelectors.selectAll),
        this.store$.select(feeEarnersSelectors.entitySelectors.selectAll),
      ),
      mergeMap(([, billIsFullyLoaded, rateGroups, feeEarners]) => {
        if (!billIsFullyLoaded) {
          return [];
        }

        const emptyRateGroups = rateGroups.filter(
          (rateGroup) =>
            !feeEarners.some(
              (feeEarner) => feeEarner.rateGroupId === rateGroup.id,
            ),
        );

        const newFeeEarners = emptyRateGroups.map(
          (rateGroup): FeeEarner =>
            DefaultsService.createDefaultFeeEarner({
              reference: rateGroup.reference,
              rateGroupId: rateGroup.id,
            }),
        );

        return newFeeEarners.length
          ? [
              feeEarnersActions.upsertFeeEarners({
                feeEarners: newFeeEarners,
              }),
            ]
          : [];
      }),
    ),
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
