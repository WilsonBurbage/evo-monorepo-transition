import { BaseEntity } from '@evo-monorepo/shared';

export interface Enhancement extends BaseEntity {
  partId: string;
  name: string;
  percentage: number;
}
