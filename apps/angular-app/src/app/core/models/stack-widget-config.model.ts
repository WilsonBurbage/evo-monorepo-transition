import { BaseEntity } from '@evo-monorepo/shared';
import { TypedAction } from '@ngrx/store/src/models';
import { CoverSheetType } from './cover-sheet-type.model';
import { PartSpecificAttendanceType } from './part-specific-attendance-type.model';
import { PartSpecificDisbursementType } from './part-specific-disbursement-type.model';

export interface StackWidgetConfig extends Partial<BaseEntity> {
  feeEarnerId?: string;

  chronologyStepId?: string;

  partyId?: string;
  correspondenceCounterId?: string;

  partId?: string;
  partSpecificAttendanceType?: PartSpecificAttendanceType;
  partSpecificDisbursementType?: PartSpecificDisbursementType;

  coverSheetType?: CoverSheetType;

  confirmMessage?: string;
  confirmActions?: TypedAction<string>[];
}
