import { BaseEntity } from './base-entity.model';

export interface Account extends BaseEntity {
  username: string;

  firstName: string;
  surname: string;

  organisationId: string;
}
