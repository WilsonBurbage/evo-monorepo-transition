import { BaseEntity } from '@evo-monorepo/shared';

export interface SuccessFee extends BaseEntity {
  chronologyStepId: string;
  description: string;
  baseCosts: number;
}
