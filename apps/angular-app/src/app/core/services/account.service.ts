import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetailsResponse } from '@evo-monorepo/shared';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    return this.httpClient.get<AccountDetailsResponse>(
      ApiService.compileUrl('/accounts/details'),
      this.authenticationService.authenticationKeyHeaders()
    );
  }
}
