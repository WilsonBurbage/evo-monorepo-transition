import { BaseEntity } from '@evo-monorepo/shared';

export interface ChronologyStep extends BaseEntity {
  partId: string;
  date: string;
  description: string;
}
