import { Counsel } from '../models/counsel.model';

export class ExportCounselsService {
  static getCounselWorkingSuccessFeePercentage(counsel: Counsel): number {
    return counsel.hasSuccessFee ? counsel.successFeePercentage : 0;
  }
}
