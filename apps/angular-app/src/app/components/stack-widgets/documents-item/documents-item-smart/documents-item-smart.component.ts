import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { DocumentsItem } from '../../../../core/models/documents-item.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as documentsItemsActions from '../../../../core/state/documents-items/documents-items.actions';
import * as documentsItemsSelectors from '../../../../core/state/documents-items/documents-items.selectors';
import * as feeEarnersSelectors from '../../../../core/state/fee-earners/fee-earners.selectors';

@Component({
  selector: 'app-documents-item-smart',
  templateUrl: './documents-item-smart.component.html',
  styleUrls: ['./documents-item-smart.component.scss'],
})
export class DocumentsItemSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  documentsItem$!: Observable<DocumentsItem | undefined>;
  feeEarners$!: Observable<FeeEarner[] | undefined>;

  ngOnInit(): void {
    this.documentsItem$ = this.config?.id
      ? this.store$.select(
          documentsItemsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(
          DefaultsService.createDefaultDocumentsItem({
            partId: this.activePartId(),
            feeEarnerId: this.activeFeeEarnerId(),
          }),
        );

    this.feeEarners$ = this.store$.select(
      feeEarnersSelectors.entitySelectors.selectAll,
    );
  }

  onSaveClicked(amendedDocumentsItem: DocumentsItem): void {
    this.store$.dispatch(
      documentsItemsActions.upsertDocumentsItem({
        documentsItem: amendedDocumentsItem,
      }),
    );
    this.pop();
  }
}
