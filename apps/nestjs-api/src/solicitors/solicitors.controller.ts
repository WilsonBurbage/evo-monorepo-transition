import { Controller, Get, Query } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { Solicitor } from '../core/models/solicitor.model';
import { SolicitorsService } from './solicitors.service';

@Controller('solicitors')
export class SolicitorsController {
  constructor(
    private authenticationService: AuthenticationService,
    private solicitorsService: SolicitorsService,
  ) {}

  @Get('lookup')
  lookup(
    @Query()
    query: {
      searchString: string;
    },
  ): Solicitor[] {
    return this.solicitorsService.lookup(query.searchString);
  }
}
