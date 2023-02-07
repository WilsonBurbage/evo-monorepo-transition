import { BaseEntity } from '@evo-monorepo/shared';

export interface Rate extends BaseEntity {
  rateGroupId: string;
  partId: string;
  hourly: number;
  calls: number;
  lettersIn: number;
  lettersOut: number;
  advocacy: number;
  counsel: number;
  travelAndWaiting: number;
}
