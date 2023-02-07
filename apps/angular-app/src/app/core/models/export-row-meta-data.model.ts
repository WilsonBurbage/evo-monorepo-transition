import { ExportRowMetaDataSummaryType } from './export-row-meta-data-summary-type.model';

export interface ExportRowMetaData {
  numberable: boolean;
  cls: boolean;
  travelAndWaiting: boolean;
  rateGroupId: string;
  time: string;
  enhancementId: string;
  disbursementsVatAmount: number;
  disbursementsAmount: number;
  counselId: string;
  counselsFeeVatAmount: number;
  counselsFeeAmount: number;
  counselsSuccessFeeVatAmount: number;
  counselsSuccessFeeAmount: number;
  solicitorsSuccessFeeAmount: number;
  profitCostsAmount: number;
  summaryType: ExportRowMetaDataSummaryType;
  summaryAmount: number;
}
