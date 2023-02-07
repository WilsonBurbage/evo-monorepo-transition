import { BaseEntity } from '@evo-monorepo/shared';

export interface DocumentsItem extends BaseEntity {
  partId: string;
  feeEarnerId: string;

  date: string;
  description: string;
  time: string;

  estimated: boolean;
  partClaimed: boolean;
  notOtherwiseClaimed: boolean;

  enhancementId: string;

  notes: string;
}
