import { BaseEntity } from '@evo-monorepo/shared';
import { PartSpecificDisbursementType } from './part-specific-disbursement-type.model';

export interface Disbursement extends BaseEntity {
  chronologyStepId?: string;
  partyId?: string;

  partId?: string;
  partSpecificDisbursementType?: PartSpecificDisbursementType;

  description: string;
  amount: number;
  vat: number;

  counselId: string;
  hasCounselSuccessFee: boolean;
  overrideCounselSuccessFeeVatPercentage: boolean;
  counselSuccessFeeVatPercentageOverride: number;

  travelAndWaiting: boolean;
  additionalLiability: boolean;
  cls: boolean;

  notes: string;
}
