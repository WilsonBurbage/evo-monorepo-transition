import { BaseEntity } from '@evo-monorepo/shared';

export interface CorrespondenceCounter extends BaseEntity {
  feeEarnerId: string;
  partyId: string;
  calls: number;
  lettersIn: number;
  lettersOut: number;
}
