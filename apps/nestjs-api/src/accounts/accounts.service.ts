import { Account, AccountDetailsResponse } from '@evo-monorepo/shared';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { COLLECTION_NAME_ACCOUNTS } from '../core/constants/database.constants';
import { OrganisationsService } from '../organisations/organisations.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectConnection() private connection: Connection,
    private organisationsService: OrganisationsService
  ) {}

  async accountById(accountId: string): Promise<Account> {
    return this.accountByProperty({ id: accountId });
  }

  async accountByProperty(keyValuePair: {
    [key: string]: string;
  }): Promise<Account> {
    const accountsCollection = this.connection.db.collection<Account>(
      COLLECTION_NAME_ACCOUNTS
    );

    const account: Account = (
      await accountsCollection.find(keyValuePair).toArray()
    )[0];

    return account;
  }

  async accountDetails(account: Account): Promise<AccountDetailsResponse> {
    const organisation = await this.organisationsService.organisationById(
      account.organisationId
    );

    const accountDetailsResponse: AccountDetailsResponse = {
      account,
      organisation,
    };
    return accountDetailsResponse;
  }
}
