import { BaseEntity } from '@evo-monorepo/shared';

export interface JumpToLink extends BaseEntity {
  title: string;
  level: number;
}
