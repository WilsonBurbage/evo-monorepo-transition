import { BaseSolicitor } from '@evo-monorepo/shared';

export interface Solicitor extends BaseSolicitor {
  accountId?: string;
  organisationId?: string;
}
