import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, mergeMap, of } from 'rxjs';
import { TOAST_REMOVE_AFTER_MILLISECONDS } from '../../constants/toast.constants';
import { DefaultsService } from '../../services/defaults.service';
import * as toastMessagesActions from './toast-messages.actions';

@Injectable()
export class ToastMessagesEffects {
  showToastMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toastMessagesActions.showToastMessage),
      map(({ text, attitude }) =>
        toastMessagesActions.upsertToastMessage({
          toastMessage: DefaultsService.createDefaultToastMessage({
            text,
            attitude,
          }),
        }),
      ),
    ),
  );

  upsertToastMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toastMessagesActions.upsertToastMessage),
      mergeMap((action) =>
        of(
          toastMessagesActions.removeToastMessage({
            toastMessageId: action.toastMessage.id,
          }),
        ).pipe(delay(TOAST_REMOVE_AFTER_MILLISECONDS)),
      ),
    ),
  );

  constructor(private actions$: Actions) {}
}
