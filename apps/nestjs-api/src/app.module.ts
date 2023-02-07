import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { OrganisationsController } from './organisations/organisations.controller';
import { OrganisationsService } from './organisations/organisations.service';
import { SolicitorsController } from './solicitors/solicitors.controller';
import { SolicitorsService } from './solicitors/solicitors.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/evo-database')],
  controllers: [
    AccountsController,
    AuthenticationController,
    OrganisationsController,
    SolicitorsController,
  ],
  providers: [
    AccountsService,
    AuthenticationService,
    OrganisationsService,
    SolicitorsService,
  ],
})
export class AppModule {}
