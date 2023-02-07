import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Attitude } from '../../models/attitude.model';
import { SolicitorLookupService } from '../../services/solicitor-lookup.service';
import * as toastMessagesActions from './../toast-messages/toast-messages.actions';
import * as solicitorLookupActions from './solicitor-lookup.actions';

@Injectable()
export class SolicitorLookupEffects {
  lookup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(solicitorLookupActions.lookup),
      switchMap(({ searchString }) =>
        this.solicitorLookupService.lookupSolicitor(searchString).pipe(
          map((solicitors) =>
            solicitorLookupActions.lookupSuccess({ solicitors }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              solicitorLookupActions.lookupFailure({
                errorCode: error.status,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  lookupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(solicitorLookupActions.lookupSuccess),
      map(({ solicitors }) =>
        solicitorLookupActions.setSolicitors({ solicitors }),
      ),
    ),
  );

  lookupFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(solicitorLookupActions.lookupFailure),
      map(() =>
        toastMessagesActions.showToastMessage({
          text: 'Solicitor lookup failed. Please check your connection and try again.',
          attitude: Attitude.negative,
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private solicitorLookupService: SolicitorLookupService,
  ) {}
}
