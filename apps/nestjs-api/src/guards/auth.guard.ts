import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const headers = context.switchToHttp().getRequest().headers;

    const account =
      this.authenticationService.accountFromAuthenticationKey(headers);

    if (account) {
      return true;
    }

    throw new UnauthorizedException();
  }

  constructor(private authenticationService: AuthenticationService) {}
}
