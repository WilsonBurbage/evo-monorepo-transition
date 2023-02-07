import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { CONSTRAINTS } from '../../constants/constraints.constants';
import {
  DEFAULT_DELETION_CONFIRMATION_MESSAGE,
  DEFAULT_DELETION_CONFIRMATION_MESSAGE_WITH_JOINS_WARNING,
} from '../../constants/messaging.constants';
import { StackWidgetReference } from '../../models/stack-widget-reference.model';
import { ConstraintsService } from '../../services/constraints-service';
import { GlobalState } from '../reducers';
import * as uiActions from './../ui/ui.actions';
import * as removingActions from './removing.actions';

@Injectable()
export class RemovingEffects {
  askToConfirmEntityRemoval$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removingActions.askToConfirmEntityRemoval),
        tap(({ entityId, entityChunkName }) => {
          const entityHasJoins = ConstraintsService.entityHasJoins(
            entityId,
            entityChunkName,
            this.store$,
          );

          const joinedEntityRemoveActions =
            ConstraintsService.getAllRemoveActionsForEntity(
              entityId,
              entityChunkName,
              this.store$,
            );

          const thisEntityRemoveAction =
            CONSTRAINTS[entityChunkName]!.removeActionMethod(entityId);

          this.store$.dispatch(
            uiActions.pushStackWidget({
              stackWidgetReference: StackWidgetReference.confirm,
              config: {
                confirmMessage: entityHasJoins
                  ? DEFAULT_DELETION_CONFIRMATION_MESSAGE_WITH_JOINS_WARNING
                  : DEFAULT_DELETION_CONFIRMATION_MESSAGE,
                confirmActions: [
                  ...joinedEntityRemoveActions,
                  thisEntityRemoveAction,
                ],
              },
            }),
          );
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private store$: Store<GlobalState>) {}
}
