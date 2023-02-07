import { BaseEntity } from './base-entity.model';

export interface AuthenticationDetails extends BaseEntity {
  accountId: string;
  passwordHash: string;
}
