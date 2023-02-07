import { Organisation } from '@evo-monorepo/shared';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { COLLECTION_NAME_ORGANISATIONS } from '../core/constants/database.constants';

@Injectable()
export class OrganisationsService {
  constructor(@InjectConnection() private connection: Connection) {}

  async organisationById(organisationId: string): Promise<Organisation> {
    const organisationsCollection = this.connection.db.collection<Organisation>(
      COLLECTION_NAME_ORGANISATIONS
    );

    const organisation: Organisation = (
      await organisationsCollection.find({ id: organisationId }).toArray()
    )[0];

    return organisation;
  }
}
