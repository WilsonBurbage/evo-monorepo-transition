import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthenticateResponse,
  AUTHENTICATION_KEY_HEADER,
  CheckAuthenticationKeyResponse,
} from '@evo-monorepo/shared';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE_KEY_AUTHENTICATION_KEY } from '../constants/local-storage.constants';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticate(
    username: string,
    password: string,
    machineId: string,
    machineUsername: string
  ): Observable<AuthenticateResponse> {
    return this.httpClient.get<AuthenticateResponse>(
      ApiService.compileUrl('/authentication/authenticate'),
      {
        params: {
          username,
          password,
          machineId,
          machineUsername,
        },
      }
    );
  }

  checkAuthenticationKey(): Observable<CheckAuthenticationKeyResponse> {
    return this.httpClient.get<CheckAuthenticationKeyResponse>(
      ApiService.compileUrl('/authentication/check-authentication-key'),
      this.authenticationKeyHeaders()
    );
  }

  authenticationKeyHeaders(): { [key: string]: { [key: string]: string } } {
    return {
      headers: {
        [AUTHENTICATION_KEY_HEADER]: LocalStorageService.getLocalStorage(
          LOCAL_STORAGE_KEY_AUTHENTICATION_KEY
        ),
      },
    };
  }
}
