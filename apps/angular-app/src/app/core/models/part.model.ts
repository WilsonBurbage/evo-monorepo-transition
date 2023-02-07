import { BaseEntity } from '@evo-monorepo/shared';

export interface Part extends BaseEntity {
  description: string;

  hasVat: boolean;
  vatPercentage: number;
  hasSuccessFee: boolean;
  successFeePercentage: number;
  hasCareAndConduct: boolean;
  careAndConductPercentage: number;
  applyCareAndConductToTravelAndWaiting: boolean;

  solicitorReference: string;
}
