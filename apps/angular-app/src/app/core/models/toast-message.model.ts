import { BaseEntity } from '@evo-monorepo/shared';
import { Attitude } from './attitude.model';

export interface ToastMessage extends BaseEntity {
  text: string;
  attitude: Attitude;
}
