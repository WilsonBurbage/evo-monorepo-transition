import { BaseEntity } from '@evo-monorepo/shared';

export interface Counsel extends BaseEntity {
  name: string;
  hasSuccessFee: boolean;
  successFeePercentage: number;
  attractsVat: boolean;
}
