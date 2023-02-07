import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';

import { DocumentsItem } from '../../../../core/models/documents-item.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableDataFormatter } from '../../../../core/models/table-data-formatter.model';

@Component({
  selector: 'app-documents-dumb',
  templateUrl: './documents-dumb.component.html',
  styleUrls: ['./documents-dumb.component.scss'],
})
export class DocumentsDumbComponent extends StackWidgetDumbComponentClass {
  @Input() documentsItems!: DocumentsItem[];
  @Input() feeEarners!: FeeEarner[];

  @Output() newDocumentsItemClicked = new EventEmitter();
  @Output() editDocumentsItemClicked = new EventEmitter<
    TableCellEventPayload<DocumentsItem>
  >();
  @Output() deleteDocumentsItemClicked = new EventEmitter<DocumentsItem>();

  tableConfig: TableConfig<DocumentsItem> = {
    columns: [
      {
        title: 'Date',
        valuePropertyPath: 'date',
        dataFormatter: TableDataFormatter.date,
      },
      {
        title: 'Fee Earner',
        valueMethod: (attendance): string =>
          this.feeEarners.find(
            (feeEarner) => feeEarner.id === attendance.feeEarnerId,
          )!.reference,
      },
      {
        title: 'Description',
        valuePropertyPath: 'description',
      },
      {
        title: 'Time',
        valuePropertyPath: 'time',
      },
      {
        title: 'Estimated',
        valuePropertyPath: 'estimated',
        dataFormatter: TableDataFormatter.boolean,
      },
      {
        title: 'Not otherwise claimed',
        valuePropertyPath: 'notOtherwiseClaimed',
        dataFormatter: TableDataFormatter.boolean,
      },
      {
        title: 'Notes',
        valuePropertyPath: 'notes',
        dataFormatter: TableDataFormatter.boolean,
      },
    ],
    deleteable: true,
  };

  onNewDocumentsItemClicked(): void {
    this.newDocumentsItemClicked.emit();
  }

  onEditDocumentsItemClicked(
    eventPayload: TableCellEventPayload<DocumentsItem>,
  ): void {
    this.editDocumentsItemClicked.emit(eventPayload);
  }

  onDeleteDocumentsItemClicked(documentsItem: DocumentsItem): void {
    this.deleteDocumentsItemClicked.emit(documentsItem);
  }
}
