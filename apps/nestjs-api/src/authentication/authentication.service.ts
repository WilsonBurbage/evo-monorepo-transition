import {
  Account,
  AuthenticateResponse,
  AuthenticationDetails,
  AuthenticationKeyData,
  AUTHENTICATION_KEY_HEADER,
  CryptoService,
} from '@evo-monorepo/shared';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AccountsService } from '../accounts/accounts.service';
import { PASSWORD_HASH_SALT } from '../core/constants/authentication.constants';
import { COLLECTION_NAME_AUTHENTICATION_DETAILS } from '../core/constants/database.constants';
import { AuthenticationHeaders } from '../core/models/headers.model';

@Injectable()
export class AuthenticationService {
  authenticationKeyCache: { [key: string]: string } = {};

  constructor(
    @InjectConnection() private connection: Connection,
    private accountsService: AccountsService
  ) {}

  async authenticate(
    username: string,
    password: string,
    machineId: string,
    machineUsername: string
  ): Promise<AuthenticateResponse> {
    const account = await this.accountsService.accountByProperty({ username });

    if (!account) {
      throw new UnauthorizedException();
    }

    const authenticationDetailsCollection =
      this.connection.db.collection<AuthenticationDetails>(
        COLLECTION_NAME_AUTHENTICATION_DETAILS
      );

    const authenticationDetails: AuthenticationDetails = (
      await authenticationDetailsCollection
        .find({
          accountId: account.id,
        })
        .toArray()
    )[0];

    const passwordHash = CryptoService.hash(password, PASSWORD_HASH_SALT);

    if (authenticationDetails.passwordHash !== passwordHash) {
      throw new UnauthorizedException();
    }

    const sessionStamp = String(Math.random());

    const authenticationKey = this.generateAuthenticationKey({
      username,
      machineId,
      machineUsername,
      sessionStamp,
    });

    this.authenticationKeyCache = {
      ...this.authenticationKeyCache,
      [account.id]: authenticationKey,
    };

    return {
      authenticationKey,
    };
  }

  generateAuthenticationKey(
    authenticationKeyData: AuthenticationKeyData
  ): string {
    const authenticationKeyDataString = JSON.stringify(authenticationKeyData);

    const authenticationKey = CryptoService.hash(authenticationKeyDataString);

    return authenticationKey;
  }

  async accountFromAuthenticationKey(
    headers: AuthenticationHeaders
  ): Promise<Account> {
    const authenticationKey = headers[AUTHENTICATION_KEY_HEADER];

    const accountId = Object.keys(this.authenticationKeyCache).find(
      (cachedAuthenticationKey) =>
        this.authenticationKeyCache[cachedAuthenticationKey] ===
        authenticationKey
    );

    return await this.accountsService.accountById(accountId);
  }
}
