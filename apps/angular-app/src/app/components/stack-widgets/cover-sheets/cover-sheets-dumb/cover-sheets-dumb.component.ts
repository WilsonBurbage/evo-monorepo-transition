import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { CaseParty } from '../../../../core/models/case-party.model';
import { CoverSheetDetails } from '../../../../core/models/cover-sheet-details.model';
import {
  CoverSheetItemType,
  COVER_SHEET_ITEM_TYPE_NAMES_MAP,
} from '../../../../core/models/cover-sheet-item-type.model';
import { CoverSheetItem } from '../../../../core/models/cover-sheet-item.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import { TextService } from '../../../../core/services/text.service';

@Component({
  selector: 'app-cover-sheets-dumb',
  templateUrl: './cover-sheets-dumb.component.html',
  styleUrls: ['./cover-sheets-dumb.component.scss'],
})
export class CoverSheetsDumbComponent extends StackWidgetDumbComponentClass {
  @Input() coverSheetDetails!: CoverSheetDetails;
  @Input() caseParties!: CaseParty[];
  @Input() frontSheetItems!: CoverSheetItem[];
  @Input() backSheetItems!: CoverSheetItem[];
  @Input() readoutForCaseParties!: string;
  @Input() readoutForNarrative!: string;
  @Input() readoutForRatesApplied!: string;
  @Input() readoutForSolicitorDetails!: string;
  @Input() readoutForVatDetails!: string;

  @Output() coverSheetDetailsClicked = new EventEmitter();
  @Output() newCasePartyClicked = new EventEmitter();
  @Output() editCasePartyClicked = new EventEmitter<
    TableRowEventPayload<CaseParty>
  >();
  @Output() deleteCasePartyClicked = new EventEmitter<CaseParty>();
  @Output() newFrontSheetItemClicked = new EventEmitter();
  @Output() newBackSheetItemClicked = new EventEmitter();
  @Output() editCoverSheetItemClicked = new EventEmitter<
    TableRowEventPayload<CoverSheetItem>
  >();
  @Output() deleteCoverSheetItemClicked = new EventEmitter<CoverSheetItem>();

  casePartiesTableConfig: TableConfig<CaseParty> = {
    columns: [
      {
        title: 'Name',
        valuePropertyPath: 'name',
      },
      {
        title: 'Category',
        valuePropertyPath: 'category',
      },
    ],
    deleteable: true,
  };

  coverSheetItemsTableConfig: TableConfig<CoverSheetItem> = {
    columns: [
      {
        title: 'Type',
        valueMethod: (coverSheetItem): string =>
          COVER_SHEET_ITEM_TYPE_NAMES_MAP[coverSheetItem.coverSheetItemType],
      },
      {
        title: 'Text',
        valueMethod: (coverSheetItem): string => {
          let text = '';

          switch (coverSheetItem.coverSheetItemType) {
            case CoverSheetItemType.court:
              text = this.coverSheetDetails.court;
              break;

            case CoverSheetItemType.claimNumber:
              text = this.coverSheetDetails.claimNumber;
              break;

            case CoverSheetItemType.caseParties:
              text = this.readoutForCaseParties;
              break;

            case CoverSheetItemType.narrative:
              text = this.readoutForNarrative;
              break;

            case CoverSheetItemType.ratesApplied:
              text = this.readoutForRatesApplied;
              break;

            case CoverSheetItemType.solicitorDetails:
              text = this.readoutForSolicitorDetails;
              break;

            case CoverSheetItemType.spacer:
              text = '';
              break;

            case CoverSheetItemType.text:
              text = coverSheetItem.text!;
              break;

            case CoverSheetItemType.vatDetails:
              text = this.readoutForVatDetails;
              break;
          }

          return TextService.trimToLength(text, 150, true);
        },
      },
    ],
    deleteable: true,
  };

  onEditCoverSheetDetailsClicked(): void {
    this.coverSheetDetailsClicked.emit();
  }

  onNewCasePartyClicked(): void {
    this.newCasePartyClicked.emit();
  }

  onEditCasePartyClicked(eventPayload: TableRowEventPayload<CaseParty>): void {
    this.editCasePartyClicked.emit(eventPayload);
  }

  onDeleteCasePartyClicked(caseParty: CaseParty): void {
    this.deleteCasePartyClicked.emit(caseParty);
  }

  onNewFrontSheetItemClicked(): void {
    this.newFrontSheetItemClicked.emit();
  }

  onNewBackSheetItemClicked(): void {
    this.newBackSheetItemClicked.emit();
  }

  onEditCoverSheetItemClicked(
    eventPayload: TableRowEventPayload<CoverSheetItem>,
  ): void {
    this.editCoverSheetItemClicked.emit(eventPayload);
  }

  onDeleteCoverSheetItemClicked(coverSheetItem: CoverSheetItem): void {
    this.deleteCoverSheetItemClicked.emit(coverSheetItem);
  }
}
