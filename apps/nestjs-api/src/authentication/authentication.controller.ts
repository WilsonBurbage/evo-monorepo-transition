import {
  AuthenticateResponse,
  CheckAuthenticationKeyResponse,
} from '@evo-monorepo/shared';
import { Controller, Get, Headers, Query, UseGuards } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthenticationHeaders } from '../core/models/headers.model';
import { AuthGuard } from '../guards/auth.guard';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get('authenticate')
  async authenticate(
    @Query()
    query: {
      username: string;
      password: string;
      machineId: string;
      machineUsername: string;
    }
  ): Promise<AuthenticateResponse> {
    return await this.authenticationService.authenticate(
      query.username,
      query.password,
      query.machineId,
      query.machineUsername
    );
  }

  @UseGuards(AuthGuard)
  @Get('check-authentication-key')
  async checkAuthenticationKey(
    @Headers() headers: AuthenticationHeaders
  ): Promise<CheckAuthenticationKeyResponse> {
    const account =
      await this.authenticationService.accountFromAuthenticationKey(headers);

    if (account) {
      return { result: true };
    }

    throw new UnauthorizedException();
  }
}
