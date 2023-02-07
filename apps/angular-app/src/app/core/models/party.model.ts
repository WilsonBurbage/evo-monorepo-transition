import { BaseEntity } from '@evo-monorepo/shared';

export interface Party extends BaseEntity {
  partId: string;
  name: string;
}
