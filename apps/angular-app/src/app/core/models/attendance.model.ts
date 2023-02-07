import { BaseEntity } from '@evo-monorepo/shared';
import { PartSpecificAttendanceType } from './part-specific-attendance-type.model';

export interface Attendance extends BaseEntity {
  chronologyStepId?: string;
  partyId?: string;
  partId?: string;
  partSpecificAttendanceType?: PartSpecificAttendanceType;

  feeEarnerId: string;

  date: string;
  description: string;
  time: string;

  advocacy: boolean;
  counsel: boolean;
  estimated: boolean;
  other: boolean;
  partClaimed: boolean;
  timedLetterOut: boolean;
  timedTelephoneAttendance: boolean;
  travelAndWaiting: boolean;
  billFee: boolean;

  enhancementId: string;

  notes: string;
}
