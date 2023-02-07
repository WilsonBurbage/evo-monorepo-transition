import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { DocumentsItem } from '../../../../core/models/documents-item.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import * as documentsItemsSelectors from '../../../../core/state/documents-items/documents-items.selectors';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-documents-smart',
  templateUrl: './documents-smart.component.html',
  styleUrls: ['./documents-smart.component.scss'],
})
export class DocumentsSmartComponent extends StackWidgetSmartComponentClass {
  documentsItems$: Observable<DocumentsItem[] | undefined>;
  feeEarners$!: Observable<FeeEarner[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.documentsItems$ = this.store$.select(
      documentsItemsSelectors.getDocumentsItemsForActivePart,
    );

    this.feeEarners$ = this.store$.select(
      feeEarnersSelectors.entitySelectors.selectAll,
    );
  }

  onNewDocumentsItemClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.documentsItem,
      }),
    );
  }

  onEditDocumentsItemClicked(
    eventPayload: TableCellEventPayload<DocumentsItem>,
  ): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.documentsItem,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteDocumentsItemClicked(documentsItem: DocumentsItem): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: documentsItem.id,
        entityChunkName: EntityChunkName.documentsItems,
      }),
    );
  }
}
