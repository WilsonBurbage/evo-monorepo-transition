import { AccountDetailsResponse } from '@evo-monorepo/shared';
import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthenticationHeaders } from '../core/models/headers.model';
import { AuthGuard } from '../guards/auth.guard';
import { AccountsService } from './accounts.service';

@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(
    private accountsService: AccountsService,
    private authenticationService: AuthenticationService
  ) {}

  @Get('details')
  async details(
    @Headers() headers: AuthenticationHeaders
  ): Promise<AccountDetailsResponse> {
    const account =
      await this.authenticationService.accountFromAuthenticationKey(headers);

    if (!account) {
      throw new ForbiddenException();
    }

    return this.accountsService.accountDetails(account);
  }
}
