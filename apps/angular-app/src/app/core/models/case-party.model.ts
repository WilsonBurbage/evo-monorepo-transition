import { BaseEntity } from '@evo-monorepo/shared';

export interface CaseParty extends BaseEntity {
  name: string;
  category: string;
}
