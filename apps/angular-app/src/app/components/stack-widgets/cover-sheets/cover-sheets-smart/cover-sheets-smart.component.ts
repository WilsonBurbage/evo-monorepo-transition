import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { CaseParty } from '../../../../core/models/case-party.model';
import { CoverSheetDetails } from '../../../../core/models/cover-sheet-details.model';
import { CoverSheetItem } from '../../../../core/models/cover-sheet-item.model';
import { CoverSheetType } from '../../../../core/models/cover-sheet-type.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as uiActions from '../../../../core/state/ui/ui.actions';

import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as casePartiesSelectors from '../../../../core/state/case-parties/case-parties.selectors';
import * as coverSheetDetailsSelectors from '../../../../core/state/cover-sheet-details/cover-sheet-details.selectors';
import * as coverSheetItemsSelectors from '../../../../core/state/cover-sheet-items/cover-sheet-items.selectors';
import * as coverSheetExportSelectors from '../../../../core/state/export/cover-sheet-export.selectors';

@Component({
  selector: 'app-cover-sheets-smart',
  templateUrl: './cover-sheets-smart.component.html',
  styleUrls: ['./cover-sheets-smart.component.scss'],
})
export class CoverSheetsSmartComponent extends StackWidgetSmartComponentClass {
  coverSheetDetails$!: Observable<CoverSheetDetails | undefined>;
  caseParties$!: Observable<CaseParty[] | undefined>;
  frontSheetItems$!: Observable<CoverSheetItem[] | undefined>;
  backSheetItems$!: Observable<CoverSheetItem[] | undefined>;
  readoutForCaseParties$!: Observable<string | undefined>;
  readoutForNarrative$!: Observable<string | undefined>;
  readoutForRatesApplied$!: Observable<string | undefined>;
  readoutForSolicitorDetails$!: Observable<string | undefined>;
  readoutForVatDetails$!: Observable<string | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.coverSheetDetails$ = this.store$.select(
      coverSheetDetailsSelectors.getCoverSheetDetails,
    );

    this.caseParties$ = this.store$.select(
      casePartiesSelectors.entitySelectors.selectAll,
    );

    this.frontSheetItems$ = this.store$.select(
      coverSheetItemsSelectors.getFrontSheetItems,
    );

    this.backSheetItems$ = this.store$.select(
      coverSheetItemsSelectors.getBackSheetItems,
    );

    this.readoutForCaseParties$ = this.store$.select(
      coverSheetExportSelectors.getReadoutForCaseParties,
    );

    this.readoutForNarrative$ = this.store$.select(
      coverSheetExportSelectors.getReadoutForNarrative,
    );

    this.readoutForRatesApplied$ = this.store$.select(
      coverSheetExportSelectors.getReadoutForRatesApplied,
    );

    this.readoutForSolicitorDetails$ = this.store$.select(
      coverSheetExportSelectors.getReadoutForSolicitorDetails,
    );

    this.readoutForVatDetails$ = this.store$.select(
      coverSheetExportSelectors.getReadoutForVatDetails,
    );
  }

  onCcoverSheetDetailsClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.coverSheetDetails,
      }),
    );
  }

  onNewCasePartyClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.caseParty,
      }),
    );
  }

  onEditCasePartyClicked(eventPayload: TableRowEventPayload<CaseParty>): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.caseParty,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteCasePartyClicked(caseParty: CaseParty): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: caseParty.id,
        entityChunkName: EntityChunkName.caseParties,
      }),
    );
  }

  onNewFrontSheetItemClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.coverSheetItem,
        config: { coverSheetType: CoverSheetType.frontSheet },
      }),
    );
  }

  onNewBackSheetItemClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.coverSheetItem,
        config: { coverSheetType: CoverSheetType.backSheet },
      }),
    );
  }

  onEditCoverSheetItemClicked(
    eventPayload: TableRowEventPayload<CoverSheetItem>,
  ): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.coverSheetItem,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteCoverSheetItemClicked(coverSheetItem: CoverSheetItem): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: coverSheetItem.id,
        entityChunkName: EntityChunkName.coverSheetItems,
      }),
    );
  }
}
