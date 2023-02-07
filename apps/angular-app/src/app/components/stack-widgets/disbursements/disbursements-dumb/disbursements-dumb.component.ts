import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableDataFormatter } from '../../../../core/models/table-data-formatter.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';

@Component({
  selector: 'app-disbursements-dumb',
  templateUrl: './disbursements-dumb.component.html',
  styleUrls: ['./disbursements-dumb.component.scss'],
})
export class DisbursementsDumbComponent extends StackWidgetDumbComponentClass {
  @Input() disbursements!: Disbursement[];
  @Input() feeEarners!: FeeEarner[];

  @Output() newDisbursementClicked = new EventEmitter();
  @Output() editDisbursementClicked = new EventEmitter<
    TableRowEventPayload<Disbursement>
  >();
  @Output() deleteDisbursementClicked = new EventEmitter<Disbursement>();

  tableConfig: TableConfig<Disbursement> = {
    columns: [
      {
        title: 'Description',
        valuePropertyPath: 'description',
      },
      {
        title: 'Amount',
        valuePropertyPath: 'amount',
        dataFormatter: TableDataFormatter.currency,
      },
      {
        title: 'VAT',
        valuePropertyPath: 'vat',
        dataFormatter: TableDataFormatter.currency,
      },
    ],
    deleteable: true,
  };

  onNewDisbursementClicked(): void {
    this.newDisbursementClicked.emit();
  }

  onEditDisbursementClicked(
    eventPayload: TableRowEventPayload<Disbursement>,
  ): void {
    this.editDisbursementClicked.emit(eventPayload);
  }

  onDeleteDisbursementClicked(disbursement: Disbursement): void {
    this.deleteDisbursementClicked.emit(disbursement);
  }
}
