import { BaseEntity } from '@evo-monorepo/shared';

export interface FeeEarner extends BaseEntity {
  reference: string;
  rateGroupId: string;
}
