import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AccountService } from '../../services/account.service';
import * as accountActions from './account.actions';

@Injectable()
export class AccountEffects {
  getAccountDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountActions.getAccountDetails),
      switchMap(() =>
        this.accountService.getAccountDetails().pipe(
          map((accountDetailsResponse) =>
            accountActions.getAccountDetailsSuccess({ accountDetailsResponse }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              accountActions.getAccountDetailsFailure({
                errorCode: error.status,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
  ) {}
}
