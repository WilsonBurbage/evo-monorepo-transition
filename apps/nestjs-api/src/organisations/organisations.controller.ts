import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('organisations')
export class OrganisationsController {}
