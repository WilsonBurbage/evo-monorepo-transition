import { BaseEntity } from '@evo-monorepo/shared';

export interface RateGroup extends BaseEntity {
  reference: string;
  name: string;
  cls: boolean;
}
