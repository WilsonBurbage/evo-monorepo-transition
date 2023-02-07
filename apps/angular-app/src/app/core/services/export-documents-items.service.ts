import { DocumentsItem } from '../models/documents-item.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { FeeEarner } from '../models/fee-earner.model';
import { Part } from '../models/part.model';
import { RateGroup } from '../models/rate-group.model';
import { Rate } from '../models/rate.model';
import { StackWidgetReference } from '../models/stack-widget-reference.model';
import { DatesService } from './dates.service';
import { ExportClsService } from './export-cls.service';
import { ExportRateGroupsService } from './export-rate-groups.service';

export class ExportDocumentsItemsService {
  static createDocumentsItemsRows(
    documentsItems: DocumentsItem[],
    part: Part,
    feeEarners: FeeEarner[],
    rateGroups: RateGroup[],
    rates: Rate[],
  ): ExportRow[] {
    const documentsItemsRows = documentsItems.map(
      (documentsItem): ExportRow =>
        ExportDocumentsItemsService.createDocumentsItemRow(
          documentsItem,
          part,
          feeEarners,
          rateGroups,
          rates,
        ),
    );

    const rateGroupSummaryRows =
      ExportRateGroupsService.createRateGroupSummaryRows(
        documentsItemsRows,
        rateGroups,
      );

    const clsInterPartesSeparatedRows =
      ExportClsService.applyClsInterpartiesBlockSeparation([
        ...documentsItemsRows,
        ...rateGroupSummaryRows,
      ]);

    return [...clsInterPartesSeparatedRows];
  }

  static createDocumentsItemRow(
    documentsItem: DocumentsItem,
    part: Part,
    feeEarners: FeeEarner[],
    rateGroups: RateGroup[],
    rates: Rate[],
  ): ExportRow {
    const documentsItemFeeEarner = feeEarners.find(
      (feeEarner) => feeEarner.id === documentsItem.feeEarnerId,
    );
    const documentsItemFeeEarnerRateGroup = rateGroups.find(
      (rateGroup) => rateGroup.id === documentsItemFeeEarner?.rateGroupId,
    );
    const documentsItemRate = rates.find(
      (rate) =>
        rate.rateGroupId === documentsItemFeeEarnerRateGroup?.id &&
        rate.partId === part.id,
    );

    const documentsItemAmount = DatesService.timeMultipliedByHourlyRate(
      documentsItem.time,
      documentsItemRate!.hourly,
    );

    return {
      cells: {
        [ExportColumnType.description]: {
          text: `${documentsItem.description} ${DatesService.formatTimeToWords(
            documentsItem.time,
          )} (${documentsItemFeeEarner?.reference})`,
        },
      },
      metaData: {
        cls: documentsItemFeeEarnerRateGroup!.cls,
        rateGroupId: documentsItemFeeEarnerRateGroup?.id,
        time: documentsItem.time,
        enhancementId: documentsItem.enhancementId,
        profitCostsAmount: documentsItemAmount,
      },
      stackWidgetReference: StackWidgetReference.documentsItem,
      stackWidgetConfig: { id: documentsItem.id },
      notes: documentsItem.notes,
    };
  }
}
