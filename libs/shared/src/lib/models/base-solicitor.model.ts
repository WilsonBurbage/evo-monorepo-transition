import { BaseEntity } from './base-entity.model';

export interface BaseSolicitor extends BaseEntity {
  name: string;
  address1: string;
  address2: string;
  town: string;
  county: string;
  postCode: string;
  telephone: string;
  fax: string;
  dx: string;
  vatNumber: string;
}
